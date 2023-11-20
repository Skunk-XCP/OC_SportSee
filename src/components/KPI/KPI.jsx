import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import s from "./style.module.css";
import PropTypes from 'prop-types';


export function KPI({ userScore }) {

    // Préparation des données pour le graphique
    const dataScore = [{ name: 'Score', value: userScore }];
    // Angle de départ du graphique
    const startAngle = 90;
    // Angle de fin calculé en fonction du score
    const endAngle = startAngle + userScore * 360;

    const customLabel = () => {
        // Utilisation de userKPI ou 0 si non défini
        const score = userScore * 100;
        return (
            <>
                <p className={s.customLabel}>
                    <span className={s.customScore}>{`${score.toFixed(0)}%`}</span>
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

// Définition des PropTypes
KPI.propTypes = {
    userScore: PropTypes.number.isRequired
};
