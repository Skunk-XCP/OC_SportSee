import { useState, useEffect } from "react";
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
    const [userData, setUserData] = useState([]);
    const [userScore, setUserScore] = useState([]);
    const [session, setSession] = useState([]);
    const [performance, setPerformance] = useState(null);
    const [activity, setActivity] = useState(null);
    const [userCalories, setUserCalories] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const userInfoData = await DataAPI.getUsers(user);
                setUserData(userInfoData.data.userInfos);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
            }
        }
        fetchData();
        async function getUserScore() {
            try {
                const userInfoScore = await DataAPI.getUsers(user);
                const score = userInfoScore.data.score ? userInfoScore.data.score : userInfoScore.data.todayScore;
                setUserScore(score);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
            }
        }
        getUserScore()
        async function getUserInfos() {
            try {
                const userInfos = await DataAPI.getUsers(user);
                setUserCalories(userInfos.data.keyData)
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
            }
        }
        getUserInfos()
        async function fetchSession() {
            try {
                const userInfoSession = await DataAPI.getDataInfos(user, USER_AVERAGE);
                setSession(userInfoSession.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
            }
        }
        fetchSession();
        async function fetchPerformance() {
            try {
                const userInfoPerformance = await DataAPI.getDataInfos(user, USER_PERFORMANCE);
                setPerformance(userInfoPerformance.data);

            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
            }
        }
        fetchPerformance();
        async function fetchActivity() {
            try {
                const userInfoActivity = await DataAPI.getDataInfos(user, USER_ACTIVITY);
                setActivity(userInfoActivity.data.sessions);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
            }

        }
        fetchActivity();
    }, [user]);

    return (
        <>
            <Header />
            <div className={s.app_container}>
                <SportNav />
                <section className={s.dashboard_container}>
                    <h1 className={s.user_name_bloc}>
                        Bonjour <span className={s.user_name}>{userData.firstName}</span>
                    </h1>
                    <p className={s.support_line}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                    <div className={s.user_stats}>
                        <div className={s.user_graphs}>
                            <DailyActivity activityData={activity} />
                            <div className={s.user_trendBox}>
                                <AverageSession sessionData={session} />
                                <RadarStats performanceData={performance} />
                                <KPI userScore={userScore} />
                            </div>
                        </div>
                        <div className={s.nutritionScore}>
                            <Nutrition userNutrition={userCalories} />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}