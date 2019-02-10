import axios  from 'axios';

const apiUrl = "https://swapi.co/api/";
const http = axios.create({
    baseURL: apiUrl,
});

export default {
    films: async(params) => http.get(params ? `films/?${params}` : 'films'),
    characters: async(params) => http.get(params ? `people/?${params}` : 'params'),
    starships: async(params) => http.get(params ? `starships/?${params}` : 'params'),
    planets: async(params) => http.get(params ? `planets/?${params}` : 'params'),
    species: async(params) => http.get(params ? `species/?${params}` : 'params'),
    vehicles: async(params) => http.get(params ? `vehicles/?${params}` : 'params'),
};
