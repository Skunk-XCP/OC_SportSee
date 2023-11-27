import s from "./style.module.css";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';


export function DailyActivity({ activityData }) {

    // Composant personnalisé pour l'infobulle du graphique
    const CustomToolTip = ({ active, payload }) => {

        // S'affiche seulement si une barre est survolée (active) et que les données (payload) sont présentes
        if (active && payload && payload.length) {
            return (
                <div className={s.customTooltip}>
                    <p className={s.labelTooltip}>{`${payload[0].value}Kg`}</p>
                    <p className={s.labelTooltip}>{`${payload[1].value}KCal`}</p>
                </div>
            );
        }

        // Retour à null si aucune infobulle à afficher
        return null;
    };

    // Étiquettes pour la légende
    const legend = ["Poids (Kg)", "Calories brûlées (KCal)"];
    const customLegend = () => {
        return (
            <>
                <div className={s.kg_container}>
                    <span className={s.dot_kg}></span>
                    <p className={s.kg_legend}>{legend[0]}</p>
                </div>
                <div className={s.kcal_container}>
                    <span className={s.dot_kcal}></span>
                    <p className={s.kcal_legend}>{legend[1]}</p>
                </div>
            </>
        );
    };

    // Rendu JSX pour afficher le composant
    return (
        <>
            <div className={s.chart_container}>
                <h3 className={s.chart_title}>Activité quotidienne</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} barGap={10}>
                        <CartesianGrid strokeDasharray="1" vertical={false} />

                        <XAxis
                            dataKey="day"
                            stroke="#9B9EAC"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={15}
                            tickFormatter={(value) => new Date(value).getDate()}
                        />

                        <YAxis
                            stroke="#9B9EAC"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={15}
                            style={{ fontSize: "12px" }}
                        />

                        <Legend
                            verticalAlign="top"
                            align="right"
                            content={customLegend}
                            wrapperStyle={{
                                position: "absolute",
                                top: "-40px",
                                right: "30px"
                            }}
                        />

                        <Tooltip content={<CustomToolTip />} />

                        <Bar
                            dataKey="kilogram"
                            fill="#282D30"
                            barSize={10}
                            radius={[10, 10, 0, 0]}
                        />
                        <Bar
                            dataKey="calories"
                            fill="#E60000"
                            barSize={10}
                            radius={[10, 10, 0, 0]}
                        />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

// Définition des PropTypes
DailyActivity.propTypes = {
    activityData: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            kilogram: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
        })
    ).isRequired,
};