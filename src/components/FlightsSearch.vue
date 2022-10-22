<script>
import FlightsDataService from '../services/FlightsDataService';
import FlightsList from './FlightsList.vue';

export default {
    data() {
        return {
            bothWays: false,
            flights: [],
            flight: {
                startDate: "",
                startCity: "",
                endDate: "",
                endCity: "",
                planeCode: "",
                places: ""
            },
        };
    },
    methods: {
        searchFlights() {
            var data = {
                date: new Date(this.flight.startDate).toISOString(),
                startCity: this.flight.startCity,
                endCity: this.flight.endCity
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
                        console.log(response.data);
                        this.flights = this.flights.concat(response.data);
                        console.log(this.flights);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        // Добавление LiveSearch
        // search(e) {
        // let search = e.target.value.trim();
        // FlightsDataService.search(search);
        //}
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
        <input type="text" class="form-control" id="startCity" required v-model="flight.startCity" name="startCity"
            @keyup="search" />
    </div>
    <div class="form-group">
        <label for="endCity">Место прибытия</label>
        <input type="text" class="form-control" id="endCity" required v-model="flight.endCity" name="endCity" />
    </div>
    <div class="form-group">
        <label for="adiltPlaces">Взрослых</label>
        <input type="text" class="form-control" id="adiltPlaces" required name="adiltPlaces" />
    </div>
    <div class="form-group">
        <label for="childPlaces">Детей</label>
        <input type="number" class="form-control" id="childPlaces" required name="childPlaces" />
    </div>
    <button type="submit" class="btn btn-primary" name="search" value="Search" @click="searchFlights">Найти</button>
    <FlightsList :flights="this.flights"></FlightsList>
</template>