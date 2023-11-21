import axios from "axios";
import { BASE_URL } from "../config";

// export class DataAPI {
//     static async getUsers(id) {
//         try {
//             const response = await axios.get(`http://localhost:3000/user/${id}`);
//             return response.data;
//         } catch (error) {
//             console.log(error, " Erreur de réception des données depuis l'api ");
//         }
//     }
//     static async getDataInfos(id, stats = null) {
//         try {
//             const response = await axios.get(`${BASE_URL}${id}${stats}`);
//             return response.data;
//         } catch (error) {
//             console.log(error, " Erreur de réception des données depuis l'api ");
//         }
//     }
// }

// export const fetchAPI = (userID) => {
//     return Promise.resolve(DataAPI.getUsers(userID))
// }


import { userMock, performanceMock, sessionMock, activityMock } from '../MockData/MockData.js';

export const fetchMockUserData = (userId) => {
    // Simule un appel réseau avec une promesse
    return Promise.resolve({
        userInfo: userMock[userId],
        activity: activityMock[userId],
        sessions: sessionMock[userId],
        performance: performanceMock[userId]
    });
};