import { DataAPI } from "../../api/APIService";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import s from "./style.module.css";

export function KPI({ user }) {
    const [userKPI, setUserKPI] = useState([]);

    useEffect(() => {
        async function getKPI() {
            try {
                const KPIData = await DataAPI.getUsers(user);
                const userScore = KPIData.data.score ? KPIData.data.score : KPIData.data.todayScore;
                setUserKPI(userScore);
            } catch (error) {
                console.error(error);
            }
        }

        getKPI()
    }, [user])

    // Préparation des données pour le graphique
    const dataScore = [{ value: userKPI }];
    // Angle de départ du graphique
    const startAngle = 90;
    // Angle de fin calculé en fonction du score
    const endAngle = startAngle + userKPI * 360;

    const customLabel = () => {
        // Utilisation de userKPI ou 0 si non défini
        const score = userKPI ? userKPI : 0;
        return (
            <>
                <p className={s.customLabel}>
                    <span className={s.customScore}>{`${score * 100}%`}</span>
                    <span>de votre</span>
                    <span>objectif</span>
                </p>
            </>
        )
    }

    const sizeResponsive = "100%";
    const sizePieChart = 358;

    return (
        <>
            <div className={s.container}>
                <h3 className={s.title}>Score</h3>
                {customLabel()}
                <ResponsiveContainer width={sizeResponsive} height={sizeResponsive}>
                    <PieChart width={sizePieChart} height={sizePieChart}>
                        <Pie
                            data={dataScore}
                            cx="50%"
                            cy="50%"
                            outerRadius={65}
                            innerRadius={55}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            dataKey="value"
                            labelLine={false}
                            cornerRadius={50}
                        >
                            <Cell fill="#E60000" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}