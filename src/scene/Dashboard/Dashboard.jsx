import { Nutrition } from "../../components/Nutrition/Nutrition";
import { SportNav } from "../../components/SportNav/SportNav";
import { TopMenu } from "../../components/TopMenu/TopMenu";
import s from "./style.module.css";

export function Dashboard() {
    return (
        <>
            <TopMenu />
            <div className={s.app_container}>
                <SportNav />
                <section className={s.dashboard_container}>
                    <h1 className={s.user_name}>User Name</h1>
                    <p className={s.support_line}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                    <div className={s.user_stats}>
                        <div className={s.user_graphs}>
                            <div className={s.user_weight}>weight</div>
                            <div className={s.user_trendBox}>
                                <div className={s.user_objectives}>Objectifs</div>
                                <div className={s.user_radar}>Radar</div>
                                <div className={s.user_kpi}>KPI</div>
                            </div>
                        </div>

                        <Nutrition />

                    </div>
                </section>
            </div>
        </>
    )
}