import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { SportNav } from "../../components/SportNav/SportNav";
import { Header } from "../../components/Header/Header";
import s from "./style.module.css";
import { DataAPI } from '../../api/APIService';
import { DailyActivity } from "../../components/DailyActivity/DailyActivity";
import { KPI } from "../../components/KPI/KPI";
import { Nutrition } from "../../components/Nutrition/Nutrition";
import { RadarStats } from "../../components/Radar/RadarStats";
import { AverageSession } from "../../components/AverageSession/AverageSession";
import { USER_AVERAGE, USER_PERFORMANCE, USER_ACTIVITY } from "../../config";

export function Dashboard({ user }) {
    let { id } = useParams();
    // Initialise les états pour les données de l'utilisateur et les erreurs
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Charge les données de l'utilisateur dès le montage du composant
        async function fetchData() {
            try {
                // Appelle l'API pour récupérer les données de l'utilisateur et les statistiques associées
                const userInfoData = await DataAPI.getUsers(id);
                const userActivityData = await DataAPI.getDataInfos(id, USER_ACTIVITY);
                const userSessionsData = await DataAPI.getDataInfos(id, USER_AVERAGE);
                const userPerformanceData = await DataAPI.getDataInfos(id, USER_PERFORMANCE);

                // Vérifie que toutes les données nécessaires sont récupérées avant de mettre à jour l'état
                if (userInfoData.data && userActivityData.data && userSessionsData.data && userPerformanceData.data) {
                    setUserData({
                        ...userInfoData.data,
                        activity: userActivityData.data.sessions,
                        sessions: userSessionsData.data.sessions,
                        performance: userPerformanceData.data,
                    });
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
            }
        }
        fetchData();
    }, [id]);

    if (!userData) return <div>Aucune donnée utilisateur disponible.</div>;
    if (error) return <div>Erreur lors du chargement des données.</div>;

    // Prépare les données pour les composants enfants
    const userScoreData = userData.score || userData.todayScore || 0;
    const userNutritionData = userData.keyData || {};

    const activityData = userData.activity ? userData.activity.map(session => ({
        day: session.day,
        kilogram: session.kilogram,
        calories: session.calories,
    })) : [];

    const sessionData = userData.sessions ? {
        sessions: userData.sessions.map(session => ({
            day: session.day,
            sessionLength: session.sessionLength,
        }))
    } : { sessions: [] };

    const performanceDataForRadar = userData.performance ? {
        data: userData.performance.data.map(perf => ({
            value: perf.value,
            kind: perf.kind,
        })),
    } : { data: [] };

    return (
        <>
            <Header />
            <main className={s.app_container}>
                <SportNav />
                <section className={s.dashboard_container}>
                    <h1 className={s.user_name_bloc}>
                        Bonjour <span className={s.user_name}>{userData ? userData.userInfos.firstName : ""}</span>
                    </h1>
                    <p className={s.support_line}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                    <div className={s.user_stats}>
                        <div className={s.user_graphs}>
                            <DailyActivity activityData={activityData} />
                            <div className={s.user_trendBox}>
                                <AverageSession sessionData={sessionData} />
                                <RadarStats performanceData={performanceDataForRadar} />
                                <KPI userScore={userScoreData} />
                            </div>
                        </div>
                        <div className={s.nutritionScore}>
                            <Nutrition userNutrition={userNutritionData} />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}