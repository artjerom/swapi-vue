<template>
    <div class="Page">
        <b-container>
            <div class="h2">Cinema</div>
            <b-alert :show="isLoading">Loading ....</b-alert>
            <hr />
            <b-row>
                <b-col cols="4">
                    <h3>Filters:</h3>
                    <div class="Page__filters">
                        <div
                            class="Page__filters__field"
                        >
                            <label for="filterCharacters">Characters:</label>
                            <div class="Page__filters__field__value">
                                <span
                                    v-for="people in filters.characters.selected"
                                    v-bind:key="people.name"
                                >
                                    {{ people.name }}{{ (filters.characters.selected.length && filters.characters.selected[filters.characters.selected.length - 1].name !== people.name) > 0 ? ', ' : '' }}
                                </span>
                            </div>
                            <b-form-select
                                id="filterCharacters"
                                v-model="filters.characters.selected"
                                class="mb-3"
                                multiple
                            >
                                <option
                                    v-for="people in characters.data"
                                    :value="people"
                                    v-bind:key="people.url"
                                >{{ people.name }}</option>
                            </b-form-select>
                            <b-button
                                variant="primary"
                                :disabled="characters.data.length >= characters.count"
                                type="button"
                                @click="loadMore('characters')"
                            >Load more</b-button>
                        </div>
                        <div
                            class="Page__filters__field"
                        >
                            <label for="filterStarships">Starships:</label>
                            <div class="Page__filters__field__value">
                                <span
                                    v-for="starship in filters.starships.selected"
                                    v-bind:key="starship.name"
                                >
                                    {{ starship.name }}{{ (filters.starships.selected.length && filters.starships.selected[filters.starships.selected.length - 1].name !== starship.name) > 0 ? ', ' : '' }}
                                </span>
                            </div>
                            <b-form-select
                                id="filterStarships"
                                v-model="filters.starships.selected"
                                multiple
                                class="mb-3"
                            >
                                <option
                                    v-for="starship in starships.data"
                                    :value="starship"
                                    v-bind:key="starship.url"
                                >{{ starship.name }}</option>
                            </b-form-select>
                            <b-button
                                variant="primary"
                                :disabled="starships.data.length >= starships.count"
                                type="button"
                                @click="loadMore('starships')"
                            >Load more</b-button>
                        </div>
                        <div
                            class="Page__filters__field"
                        >
                            <label for="filterPlanets">Planets:</label>
                            <div class="Page__filters__field__value">
                                <span
                                    v-for="planet in filters.planets.selected"
                                    v-bind:key="planet.name"
                                >
                                    {{ planet.name }}{{ (filters.planets.selected.length && filters.planets.selected[filters.planets.selected.length - 1].name !== planet.name) > 0 ? ', ' : '' }}
                                </span>
                            </div>
                            <b-form-select
                                id="filterPlanets"
                                v-model="filters.planets.selected"
                                multiple
                                class="mb-3"
                            >
                                <option
                                    v-for="planet in planets.data"
                                    :value="planet"
                                    v-bind:key="planet.url"
                                >{{ planet.name }}</option>
                            </b-form-select>
                            <b-button
                                variant="primary"
                                :disabled="planets.data.length >= planets.count"
                                type="button"
                                @click="loadMore('planets')"
                            >Load more</b-button>
                        </div>
                        <div
                            class="Page__filters__field"
                        >
                            <label for="filterSpecies">Species:</label>
                            <div class="Page__filters__field__value">
                                <span
                                    v-for="spec in filters.species.selected"
                                    v-bind:key="spec.name"
                                >
                                    {{ spec.name }}{{ (filters.species.selected.length && filters.species.selected[filters.species.selected.length - 1].name !== spec.name) > 0 ? ', ' : '' }}
                                </span>
                            </div>
                            <b-form-select
                                id="filterSpecies"
                                v-model="filters.species.selected"
                                multiple
                                class="mb-3"
                            >
                                <option
                                    v-for="spec in species.data"
                                    :value="spec"
                                    v-bind:key="spec.url"
                                >{{ spec.name }}</option>
                            </b-form-select>
                            <b-button
                                variant="primary"
                                :disabled="species.data.length >= species.count"
                                type="button"
                                @click="loadMore('species')"
                            >Load more</b-button>
                        </div>
                        <div
                            class="Page__filters__field"
                        >
                            <label for="filterSpecies">Vehicles:</label>
                            <div class="Page__filters__field__value">
                                <span
                                    v-for="vehcle in filters.vehicles.selected"
                                    v-bind:key="vehcle.name"
                                >
                                    {{ vehcle.name }}{{ (filters.vehicles.selected.length && filters.vehicles.selected[filters.vehicles.selected.length - 1].name !== vehcle.name) > 0 ? ', ' : '' }}
                                </span>
                            </div>
                            <b-form-select
                                id="filterVehicles"
                                v-model="filters.vehicles.selected"
                                multiple
                                class="mb-3"
                            >
                                <option
                                    v-for="vehcle in vehicles.data"
                                    :value="vehcle"
                                    v-bind:key="vehcle.url"
                                >{{ vehcle.name }}</option>
                            </b-form-select>
                            <b-button
                                variant="primary"
                                :disabled="vehicles.data.length >= vehicles.count"
                                type="button"
                                @click="loadMore('vehicles')"
                            >Load more</b-button>
                        </div>
                        <b-button
                            variant="success"
                            @click="handleFilter"
                        >Confirm filter</b-button>
                    </div>
                </b-col>
                <b-col cols="6">
                    <b-form-input
                        v-model="searchValue"
                        type="text"
                        placeholder="Search"
                    >{{ searchValue }}</b-form-input>
                    <div class="Page__results" v-if="data">
                        <hr />
                        <div class="Page__results__sort">
                            <div class="Page__results__sort__item">
                                <span>Date:</span>
                                <button
                                    @click="sortFilms('date')"
                                    :class="['sort_icon', { [`sort_icon__${sort.direction}`]: sort.direction }]"
                                >&#10145;</button>
                            </div>
                        </div>
                        <app-film
                            v-for="film in sortedFilms"
                            v-bind:key="film.episode_id"
                            :film="film"
                        ></app-film>
                </div>
                </b-col>
                <b-col cols="2">
                     <b-button
                        variant="success"
                        @click="handleSearch"
                     >search</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
import AppFilm from '~/components/film';

export default {
    name: "Page-home",
    data() {
        return {
            isLoading: false,
            searchValue: '',
            filters: {
                characters: {
                    selected: [],
                },
                starships: {
                    selected: [],
                },
                planets: {
                    selected: [],
                },
                species: {
                    selected: [],
                },
                vehicles: {
                    selected: [],
                },
            },
            sort: {
                name: '',
                direction: '',
            },
        }
    },
    async mounted() {
        await this.loadState();
    },
    computed: {
        ...mapState({
            data: 'currentState',
            characters: 'characters',
            starships: 'starships',
            planets: 'planets',
            species: 'species',
            vehicles: 'vehicles',
        }),
        ...mapGetters({
            films: 'films',
        }),
        sortedFilms() {
            if (!this.films.length) return [];
            if (!this.sort.name) return this.films;
            if (this.sort.name === 'date') {
                return this.films.sort((a, b) => {
                    if (this.sort.direction === 'up') {
                        return a.release_date > b.release_date ? 1 : -1;
                    } else {
                        return a.release_date < b.release_date ? 1 : -1;
                    }
                });
            }
        },
    },
    methods: {
        ...mapActions({
            boot: 'boot',
            loadCharacters: 'loadCharacters',
            loadStarships: 'loadStarships',
            loadPlanets: 'loadPlanets',
            loadSpecies: 'loadSpecies',
            loadVehicles: 'loadVehicles',
        }),
        ...mapMutations({
            searchFilms: 'searchFilms',
            setFilms: 'setFilms',
        }),
        handleSearch() {
            this.searchFilms(this.searchValue);
        },
        handleFilter() {
            const result = [];
            this.sortedFilms.forEach((film) => {
                this.filters.characters.selected.forEach((people) => {
                    if (film.characters.indexOf(people.url) >= 0) result.push(film);
                });
                this.filters.starships.selected.forEach((starship) => {
                    if (film.starships.indexOf(starship.url) >= 0) result.push(film);
                });
                this.filters.planets.selected.forEach((planet) => {
                    if (film.planets.indexOf(planet.url) >= 0) result.push(film);
                });
                this.filters.species.selected.forEach((sp) => {
                    if (film.species.indexOf(sp.url) >= 0) result.push(film);
                });
                this.filters.vehicles.selected.forEach((vehcle) => {
                    if (film.vehicles.indexOf(vehcle.url) >= 0) result.push(film);
                });
            });
            this.setFilms(result);
        },
        sortFilms(field) {
            if (this.sort.name !== field) {
                this.sort = { name: field, direction: 'up' }
            } else if (this.sort.name === field) {
                if (this.sort.direction === 'up') {
                    this.sort.direction = 'down';
                } else {
                    this.sort.direction = 'up';
                }
            }
        },
        loadMore(name) {
            if (name === 'characters') {
                this.loadCharacters();
            } else if (name === 'starships') {
                this.loadStarships();
            } else if (name === 'planets') {
                this.loadPlanets();
            } else if (name === 'species') {
                this.loadSpecies();
            } else if (name === 'vehicles') {
                this.loadVehicles();
            }
        },
        async loadState() {
            this.isLoading = true;
            await this.boot().then((r) => {
                this.isLoading = false;
            }).catch((err) => {
                this.loadState = false;
                console.log(err);
            });
        },
    },
    components: {
        AppFilm,
    },
}
</script>

<style lang="scss" scoped>
.select_load_more_option {
    padding: 5px;
    background: #eee;
}
.sort_icon {
    border: none;
    outline: none;
    background: none;
    &__down {
        transform: rotate(90deg);
    }
    &__up {
        transform: rotate(-90deg);
    }
}
.Page {
    &__results {
        display: flex;
        align-items: center;
        padding: 5px;
        box-shadow: 0 0 -4px 5px rgba(30, 30, 30, .2);
        border-radius: 5px;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
    }
    &__filters {
        &__field {
            margin: 10px 0;
        }
    }
}
</style>
