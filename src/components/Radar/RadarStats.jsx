import s from "./style.module.css";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import PropTypes from 'prop-types';


const translation = {
    "cardio": "cardio",
    "energy": "energie",
    "endurance": "endurance",
    "strength": "force",
    "speed": "vitesse",
    "intensity": "intensité"
}

// Dico pour associer numéros avec types d'activités
const kindValue = {
    "1": "cardio",
    "2": "energy",
    "3": "endurance",
    "4": "strength",
    "5": "speed",
    "6": "intensity"
}

const translateKind = (kindNumber) => {
    return translation[kindValue[kindNumber]];
};

// Composant RadarStats qui prend en entrée les données de performance
export function RadarStats({ performanceData }) {

    const dataForRadarChart = performanceData && performanceData.data.map(item => {
        return {
            value: item.value,
            // Fonction translateKind pour obtenir la traduction correcte
            kind: translateKind(item.kind.toString())
        };
    });

    return (
        <>
            <div className={s.container}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="55%"
                        data={dataForRadarChart}
                    >
                        <PolarGrid radialLines={false} />
                        <PolarAngleAxis
                            dataKey="kind"
                            tick={{ fontSize: "0.8em" }}
                            stroke="#fff"
                            axisLine={false}
                            tickLine={false}
                        />
                        <PolarRadiusAxis domain={[0, 'auto']} axisLine={false} tick={false} />
                        <Radar
                            name=""
                            dataKey="value"
                            stroke="#FF0000"
                            fill="#FF0000"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

// Définition des PropTypes
RadarStats.propTypes = {
    performanceData: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                // Le type de performance doit être un nombre
                kind: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};