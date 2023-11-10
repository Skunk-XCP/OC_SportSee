import s from "./style.module.css";
import { DataAPI } from "../../api/APIService.js";
import { useEffect, useState } from "react";
import { USER_PERFORMANCE } from "../../config.js";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const translation = {
    "cardio": "cardio",
    "energy": "energie",
    "endurance": "endurance",
    "strength": "force",
    "speed": "vitesse",
    "intensity": "intensité"
}

export function RadarStats({ user }) {
    const [radarData, setRadatData] = useState([]);

    useEffect(() => {
        async function getRadarData() {
            try {
                const userRadarData = await DataAPI.getDataInfos(user, USER_PERFORMANCE)
                setRadatData(userRadarData.data)
            } catch (error) {
                console.error(error);
            }
        }

        getRadarData()
    }, [user]);

    const kindValue = [{
        "1": "cardio",
        "2": "energy",
        "3": "endurance",
        "4": "strength",
        "5": "speed",
        "6": "intensity"
    }]

    const translateKind = (number) => {
        // Traduit le numéro en texte (ex: "1" devient "cardio")
        const kindText = kindValue[0][number];
        return translation[kindText];
    };
    return (
        <>
            <div className={s.container}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="55%"
                        data={radarData.data}
                    >
                        <PolarGrid radialLines={false} />
                        <PolarAngleAxis
                            dataKey="kind"
                            tick={{ fontSize: "0.8em" }}
                            tickFormatter={translateKind}
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

