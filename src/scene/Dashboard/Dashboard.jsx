import { useState, useEffect } from "react";
import { DataAPI } from "../../api/APIService";
import { Nutrition } from "../../components/Nutrition/Nutrition";
import { SportNav } from "../../components/SportNav/SportNav";
import { Header } from "../../components/Header/Header";
import s from "./style.module.css";
import { DailyActivity } from "../../components/DailyActivity/DailyActivity";
import { KPI } from "../../components/KPI/KPI";
import { RadarStats } from "../../components/Radar/RadarStats";

export function Dashboard({ user }) {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function getName() {
            try {
                const userFirstName = await DataAPI.getUsers(user);
                // console.log("Toutes les données disponibles: ", userFirstName);
                setUserName(userFirstName.data.userInfos.firstName);
            } catch (error) {
                console.error(error);
            }
        }

        getName();
    }, [user]);


    return (
        <>
            <Header />
            <div className={s.app_container}>
                <SportNav />
                <section className={s.dashboard_container}>
                    <h1 className={s.user_name_bloc}>
                        Bonjour
                        <span className={s.user_name}>{userName}</span>
                    </h1>
                    <p className={s.support_line}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

                    <div className={s.user_stats}>
                        <div className={s.user_graphs}>
                            <DailyActivity user={user} />
                            <div className={s.user_trendBox}>
                                <RadarStats user={user} />
                                < KPI user={user} />
                            </div>
                        </div>

                        <div className={s.nutritionScore}>

                            <Nutrition user={user} />
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}

// ajouter Lint
// typer les props
// cas d'erreur -> basculer sur mock