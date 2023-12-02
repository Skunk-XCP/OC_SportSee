import axios from "axios";
import { BASE_URL } from "../config";
import { userMock, performanceMock, sessionMock, activityMock } from '../MockData/MockData.js';

export class DataAPI {
    // Récupère les informations d'un utilisateur
    static async getUsers(id, useMock = false) {
        try {
            if (useMock) {
                // Si useMock est vrai, retourne les données mockées pour cet utilisateur
                const mockData = userMock[id];
                // Renvoie les données mockées dans le même format que l'API
                return { data: mockData };
            }

            // Sinon, effectue un appel API pour obtenir les données de l'utilisateur
            const response = await fetchUsersAPI(id);
            return response.data;
        } catch (error) {
            console.log(error, "Erreur de réception des données depuis l'api");
        }
    }

    // Récupère différentes données en fonction de la stat spécifiée
    static async getDataInfos(id, stats = null, useMock = false) {
        try {
            if (useMock) {
                let mockData;
                switch (stats) {
                    // Sélectionne les données mockées appropriées en fonction de la stat demandée
                    case '/average-sessions':
                        mockData = sessionMock[id];
                        break;
                    case '/performance':
                        mockData = performanceMock[id];
                        break;
                    case '/activity':
                        mockData = activityMock[id];
                        break;
                    default:
                        // Si aucune stat correspondante, retourne null
                        mockData = null;
                }

                // Renvoie les données mockées dans le même format que l'API
                return { data: mockData };
            }

            // Effectue un appel API pour obtenir les données spécifiées
            const response = await fetchDataInfosAPI(id, stats);
            return response.data;
        } catch (error) {
            console.log(error, "Erreur de réception des données depuis l'api");
        }
    }
}

// Effectue un appel API et obtenir les infos d'un utilisateur
const fetchUsersAPI = (id) => {
    return axios.get(`${BASE_URL}${id}`);
}

// Effectue un appel API et obtient différentes données en fonction de la stat spécifiée
const fetchDataInfosAPI = (id, stats) => {
    return axios.get(`${BASE_URL}${id}${stats}`);
}