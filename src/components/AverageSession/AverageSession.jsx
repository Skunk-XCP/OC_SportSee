import PropTypes from 'prop-types';
import s from "./style.module.css";
import { LineChart, Line, Tooltip, XAxis, ReferenceDot, ResponsiveContainer } from "recharts";
import { useState } from 'react';

export function AverageSession({ sessionData }) {

    const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

    const formattedSessionData = sessionData && sessionData.map((item) => ({
        ...item,
        day: dayLabels[item.day - 1],
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={s.customTooltip}>
                    <p className={s.labelTooltip}>{` ${payload[0].value} min`}</p>
                </div>
            );
        }
        return null;
    };

    const CustomXAxisTick = ({ x, y, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={5}
                    y={0}
                    dy={20}
                    textAnchor="end"
                    fill="white"
                    className={s.customXAxis}
                    style={{ letterSpacing: "2px" }}
                >
                    {payload.value}
                </text>
            </g>
        );
    };

    const [hoveredData, setHoveredData] = useState(null);

    const handleMouseMove = (event) => {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        const containerHeight = event.currentTarget.clientHeight;

        setHoveredData({ x, y, overlayHeight: containerHeight - y })
    }

    return (
        <>
            <div className={s.container} onMouseMove={handleMouseMove}>
                <div className={s.overlay}
                    style={{
                        background: hoveredData ? "rgba(0, 0, 0, 0.5)" : "transparent",
                        width: hoveredData ? `calc(100% - ${hoveredData.x}px)` : "100%",
                        left: hoveredData ? `${hoveredData.x}px` : 0
                    }}
                />
                <h3 className={s.title}>Durée moyenne des sessions</h3>
                <ResponsiveContainer width="100%" height="50%">
                    <LineChart data={formattedSessionData} style={{ marginTop: "30px" }}>
                        {/* Définition du dégradé pour la ligne du graphique */}
                        <defs>
                            <linearGradient
                                id="lineGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    style={{ stopColor: "white", stopOpacity: 0.2 }}
                                />
                                <stop
                                    offset="100%"
                                    style={{ stopColor: "white", stopOpacity: 1 }}
                                />
                            </linearGradient>
                        </defs>
                        {/* Ligne du graphique avec ses propriétés et options */}
                        <Line
                            type="natural"
                            dataKey="sessionLength"
                            stroke="url(#lineGradient)"
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={false}
                        />
                        {/* Point de référence sur la ligne du graphique */}
                        <ReferenceDot />
                        {/* Axe X du graphique avec les jours de la semaine comme étiquettes */}
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            padding={{ left: 10, right: 10 }}
                            tick={<CustomXAxisTick />}
                        />
                        {/* Tooltip personnalisé pour afficher les informations au survol */}
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}