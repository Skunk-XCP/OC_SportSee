import axios from "axios";
import { BASE_URL } from "../config";
import { userMock, performanceMock, sessionMock, activityMock } from '../MockData/MockData.js';

export class DataAPI {
    static async getUsers(id) {
        try {
            const response = await fetchUsersAPI(id);
            return response.data;
        } catch (error) {
            console.log(error, " Erreur de réception des données depuis l'api ");
        }
    }
    static async getDataInfos(id, stats = null) {
        try {
            const response = await fetchDataInfosAPI(id, stats);
            return response.data;
        } catch (error) {
            console.log(error, " Erreur de réception des données depuis l'api ");
        }
    }
}

export const fetchUsersAPI = (id) => {
    return axios.get(`${BASE_URL}${id}`);
}

export const fetchDataInfosAPI = (id, stats) => {
    return axios.get(`${BASE_URL}${id}${stats}`);
}









export const fetchMockUserData = (userId) => {
    // Simule un appel réseau avec une promesse
    return Promise.resolve({
        userInfo: userMock[userId],
        activity: activityMock[userId],
        sessions: sessionMock[userId],
        performance: performanceMock[userId]
    });
};