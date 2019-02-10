import Vuex from 'vuex';
import Vue from 'vue';
import api from './../api';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        isReady: false,
        currentState: null,
        initialState: null,
        characters: {
            data: [],
            count: 0,
        },
        starships: {
            data: [],
            count: 0,
        },
        planets: {
            data: [],
            count: 0,
        },
        species: {
            data: [],
            count: 0,
        },
        vehicles: {
            data: [],
            count: 0,
        },
    },
    getters: {
        films: state => state.isReady ? state.currentState.results : null,
    },
    actions: {
        boot: async({ commit, dispatch }) => new Promise((resolve, reject) => {
            api.films().then((resp) => {
                commit('setData', resp.data);
                commit('setInitialData', resp.data);
                dispatch('loadCharacters');
                dispatch('loadStarships');
                dispatch('loadPlanets');
                dispatch('loadSpecies');
                dispatch('loadVehicles');
                resolve(true);
            }).catch((err) => {
                console.log('error for films request', err);
                reject(err);
            });
        }),
        loadCharacters: async({ state, commit }) => new Promise((resolve, reject) => {
            if (!state.isReady) reject('not ready');
            let page = state.characters.data.length < 1 ? 1 :state.characters.data.length / 10 + 1;
            api.characters(`page=${page}`).then((resp) => {
                commit('addCharacters', resp.data);
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        }),
        loadStarships: async({ state, commit }) => new Promise((resolve, reject) => {
            if (!state.isReady) reject('not ready');
            const page = state.starships.data.length < 1 ? 1 :state.starships.data.length / 10 + 1;
            api.starships(`page=${page}`).then((resp) => {
                commit('addStarships', resp.data);
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        }),
        loadPlanets: async({ state, commit }) => new Promise((resolve, reject) => {
            if (!state.isReady) reject('not ready');
            const page = state.planets.data.length < 1 ? 1 :state.planets.data.length / 10 + 1;
            api.planets(`page=${page}`).then((resp) => {
                commit('addPlanets', resp.data);
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        }),
        loadSpecies: async({ state, commit }) => new Promise((resolve, reject) => {
            if (!state.isReady) reject('not ready');
            const page = state.species.data.length < 1 ? 1 :state.species.data.length / 10 + 1;
            api.species(`page=${page}`).then((resp) => {
                commit('addSpecies', resp.data);
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        }),
        loadVehicles: async({ state, commit }) => new Promise((resolve, reject) => {
            if (!state.isReady) reject('not ready');
            const page = state.vehicles.data.length < 1 ? 1 :state.vehicles.data.length / 10 + 1;
            api.vehicles(`page=${page}`).then((resp) => {
                commit('addVehicles', resp.data);
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        }),
    },
    mutations: {
        addVehicles(state, data) {
            state.vehicles.data = [ ...state.vehicles.data, ...data.results ];
            state.vehicles.count = data.count;
        },
        addSpecies(state, data) {
            state.species.data = [ ...state.species.data, ...data.results ];
            state.species.count = data.count;
        },
        addCharacters(state, data) {
            state.characters.data = [ ...state.characters.data, ...data.results ];
            state.characters.count = data.count;
        },
        addPlanets(state, data) {
            state.planets.data = [ ...state.planets.data, ...data.results ];
            state.planets.count = data.count;
        },
        addStarships(state, data) {
            state.starships.data = [ ...state.starships.data, ...data.results ];
            state.starships.count = data.count;
        },
        setInitialData(state, data) {
            state.initialState = { ...data };
            state.isReady = true;
        },
        setData(state, data) {
            state.currentState = { ...data };
        },
        searchFilms(state, value) {
            state.currentState = { ...state.initialState };
            const newResults = state.currentState.results.filter((o) => {
                return o.title.toLowerCase().indexOf(value.toLowerCase()) >= 0;
            });
            state.currentState.results = [ ...newResults ];
        },
        setFilms(state, data) {
            state.currentState.results = [ ...data ];
        },
    },
});

export default store;
