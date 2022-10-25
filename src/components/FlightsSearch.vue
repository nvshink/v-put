<script>
import FlightsDataService from '../services/FlightsDataService';
import FlightsList from './FlightsList.vue';

export default {
    data() {
        return {
            bothWays: false,
            liveSearchResult: [],
            liveSearchNoSearch: true,
            liveSearchAttr: "",
            flights: [],
            flight: {
                startDate: "",
                startCity: "",
                endDate: "",
                endCity: "",
                planeCode: "",
                placesAdult: "",
                placesChild: "",
            },

        };
    },
    methods: {
        searchFlights() {
            var data = {
                date: new Date(this.flight.startDate).toISOString(),
                startCity: this.flight.startCity,
                endCity: this.flight.endCity,
            };
            FlightsDataService.findFlights(data)
                .then(response => {
                    console.log(response.data);
                    this.flights = response.data;
                    console.log(this.flights);
                })
                .catch(e => {
                    console.log(e);
                });
            if (this.bothWays) {
                data.date = new Date(this.flight.endDate).toISOString();
                data.endCity = [data.startCity, data.startCity = data.endCity][0];
                FlightsDataService.findFlights(data)
                    .then(response => {
                        this.flights = this.flights.concat(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        liveSearch(attr) {
            var data = "";
            if (attr == "startCity") {
                data = this.flight.startCity;
            } else if (attr == "endCity") {
                data = this.flight.endCity;
            }
            this.liveSearchAttr = attr
            FlightsDataService.unicValuesColumn(attr)
                .then(response => {
                    if (response.data.length == 0) {
                        this.liveSearchNoSearch = true;
                        this.liveSearchResult = [];
                        return;
                    }
                    this.liveSearchNoSearch = false;
                    var resArray = [];
                    resArray = response.data;
                    this.liveSearchResult = resArray.filter(s => s.includes(data));
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    components: { FlightsList }
}
</script>
<template>
    <div class="form-group">
        <label for="startDate">Дата вылета</label>
        <input type="date" class="form-control" id="startDate" required v-model="flight.startDate" name="startDate" />
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="bothWays">
        <label class="form-check-label" for="flexCheckDefault">
            В обе стороны
        </label>
    </div>
    <div class="form-group">
        <label for="endDate">Дата возврашения</label>
        <input type="date" class="form-control" id="endDate" required v-model="flight.endDate" name="endDate"
            :disabled="!bothWays" />
    </div>
    <div class="form-group">
        <label for="startCity">Место отправления</label>
        <input type="text" class="form-control" list="datalistOptionsSC" id="startCity" required
            v-model="flight.startCity" name="startCity" @change="this.liveSearchResult = []"
            @keyup="liveSearch('startCity')"/>
        <datalist id="datalistOptionsSC">
            <option v-for="(result, index) in this.liveSearchResult" :key="index">{{ result }}</option>
        </datalist>
        <template v-if="this.liveSearchAttr == 'startCity' && this.liveSearchNoSearch">
            <div class="search-item">
                <p>Отсюда нет рейсов</p>
            </div>
        </template>
    </div>
    <div class="form-group">
        <label for="endCity">Место прибытия</label>
        <input type="text" class="form-control" list="datalistOptionsEC" id="endCity" required v-model="flight.endCity" name="endCity"
            @change="this.liveSearchResult = []" @keyup="liveSearch('endCity')" />
        <datalist id="datalistOptionsEC">
            <option v-for="(result, index) in this.liveSearchResult" :key="index">{{ result }}</option>
        </datalist>
        <template v-if="this.liveSearchAttr == 'endCity' && this.liveSearchNoSearch">
            <div class="search-item">
                <p>Туда нет рейсов</p>
            </div>
        </template>
    </div>
    <div class="form-group">
        <label for="adiltPlaces">Взрослых</label>
        <input type="number" class="form-control" id="adiltPlaces" required name="adiltPlaces" v-model="flight.placesAdult" />
    </div>
    <div class="form-group">
        <label for="childPlaces">Детей</label>
        <input type="number" class="form-control" id="childPlaces" required name="childPlaces" v-model="flight.placesChild"/>
    </div>
    <button type="submit" class="btn btn-primary" name="search" value="Search" @click="searchFlights">Найти</button>
    <FlightsList :flights="this.flights" :placesAdult="this.flight.placesAdult" :placesChild="this.flight.placesChild"></FlightsList>
</template>