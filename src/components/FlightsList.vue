<template>
      <div class="">
        <h4>Рейсы</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(flight, index) in flights"
            :key="index"
            @click="setActiveFlight(flight, index)"
          >
            {{ flight.startCity + flight.endCity }}
          </li>
        </ul>
  
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllFlights">
          Remove All
        </button>
      </div>
      <div class="col-md-6">
        <div v-if="currentFlight">
          <h4>Flight</h4>
          <div>
            <label><strong>Place:</strong></label> {{ currentFlight.startCity + currentFlight.endCity }}
          </div>
          <div>
            <label><strong>Date:</strong></label> {{ currentFlight.startDate + currentFlight.endDate }}
          </div>  
          <router-link :to="'/flights/' + currentFlight.id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Flight...</p>
        </div>
      </div>
  </template>
  
  <script>
  import FlightsDataService from "../services/FlightsDataService";
  
  export default {
    name: "flights-list",
    data() {
      return {
        flights: [],
        currentFlight: null,
        currentIndex: -1,
      };
    },
    methods: {
      retrieveFlights() {
        FlightsDataService.getAll()
          .then(response => {
            this.flights = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveFlights();
        this.currentFlight = null;
        this.currentIndex = -1;
      },
  
      setActiveFlight(flight, index) {
        this.currentFlight = flight;
        this.currentIndex = flight ? index : -1;
      },
  
      removeAllFlights() {
        FlightsDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchTitle() {
        FlightsDataService.findByTitle(this.title)
          .then(response => {
            this.flights = response.data;
            this.setActiveFlight(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveFlights();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>
  