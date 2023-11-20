import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //
import { SportNav } from "../../components/SportNav/SportNav";
import { Header } from "../../components/Header/Header";
import s from "./style.module.css";
import { fetchMockUserData } from "../../api/APIService";
import { DailyActivity } from "../../components/DailyActivity/DailyActivity";
import { KPI } from "../../components/KPI/KPI";
import { Nutrition } from "../../components/Nutrition/Nutrition";
import { RadarStats } from "../../components/Radar/RadarStats";

export function Dashboard({ userId }) {
    const [userData, setUserData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // Détermine l'ID à utiliser - celui de l'URL ou l'ID par défaut passé en prop
        const effectiveId = id || userId;

        fetchMockUserData(effectiveId).then(data => {
            setUserData(data);
        }).catch(error => {
            console.error("Error fetching user data:", error);
            setUserData(null);
        });
    }, [id, userId]);

    const getUserScore = (userData) => {
        // userData est défini ? Si oui, retourne le score, sinon retourne 0
        return userData && userData.userInfo
            ? userData.userInfo.todayScore || userData.userInfo.score || 0
            : 0;
    };

    const userScore = getUserScore(userData);

    // Vérifie d'abord si userData est chargé
    if (!userData || userScore === null) return <div>Chargement des données utilisateur...</div>;
    const userInfos = userData.userInfo.userInfos;

    return (
        <>
            <Header />
            <div className={s.app_container}>
                <SportNav />
                <section className={s.dashboard_container}>
                    <h1 className={s.user_name_bloc}>
                        Bonjour
                        <span className={s.user_name}>{userInfos.firstName}</span>
                    </h1>
                    <p className={s.support_line}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

                    <div className={s.user_stats}>
                        <div className={s.user_graphs}>
                            <DailyActivity activityData={userData.activity.sessions} />
                            <div className={s.user_trendBox}>
                                {/* < AverageSession  /> */}
                                < RadarStats performanceData={userData.performance} />
                                < KPI userScore={userScore} />
                            </div>
                        </div>

                        <div className={s.nutritionScore}>
                            <Nutrition userNutrition={userData.userInfo.keyData} />
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}

// ajouter Lint
// cas d'erreur -> basculer sur mock
// fichier env pour permettre de switcher entre mock et api
// ajouter une class de modelisation pour formater les objets