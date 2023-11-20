// import { DataAPI } from "../../api/APIService";
// import PropTypes from 'prop-types';
// import s from "./style.module.css";
// import { useEffect, useState } from "react";
// import { USER_AVERAGE } from "../../config.js";
// import { LineChart, Line, Tooltip, XAxis, ReferenceDot, ResponsiveContainer } from "recharts";


// export function AverageSession({ user }) {
//     const [averageSession, setAverageSession] = useState([]);

//     const day = ["L", "M", "M", "J", "V", "S", "D"];

//     useEffect(() => {
//         async function getAverage() {
//             try {
//                 const averageData = await DataAPI.getUsers(user, USER_AVERAGE);
//                 setAverageSession(averageData.data.sessions);
//             } catch (error) {
//                 console.log(error);
//             }
//         }

//         getAverage()
//     }, [user]);

//     if (averageSession) {
//         averageSession.map((item, index) => {
//             item.day = day[index];
//         });
//     }

//     const CustomTooltip = ({ active, payload }) => {
//         if (active && payload && payload.length) {
//             return (
//                 <div className={s.customTooltip}>
//                     <p className={s.labelTooltip}>{` ${payload[0].value} min`}</p>
//                 </div>
//             );
//         }
//         return null;
//     };
// }