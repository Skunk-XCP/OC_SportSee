import s from "./style.module.css";
import { DataAPI } from "../../api/APIService";
import { USER_ACTIVITY } from "../../config.js"
import { useEffect, useState } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DailyActivity({ user }) {

    // État pour stocker les données d'activité
    const [activity, setActivity] = useState([]);

    // Effet pour récupérer les données d'activité quand le composant est monté ou quand l'utilisateur change
    useEffect(() => {

        // Fonction pour récupérer les données d'activité
        async function getActivity() {
            try {
                // Récupération de l'activité de l'utilisateur depuis l'API
                const userActivity = await DataAPI.getDataInfos(user, USER_ACTIVITY);

                // Mise à jour de l'état avec les données d'activité récupérées
                setActivity(userActivity.data.sessions);
            } catch (error) {
                console.error(error);
            }
        }

        // Invocation de la fonction de récupération des données
        getActivity();

        // Exécution de l'effet quand l'identifiant de l'utilisateur change
    }, [user]);

    // Composant personnalisé pour l'infobulle du graphique en barres
    const CustomToolTip = ({ active, payload }) => {

        // Affichage de l'infobulle si elle est active et que le payload est disponible
        if (active && payload.length) {
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
                    <BarChart data={activity} barGap={10}>
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
