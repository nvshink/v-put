<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" required v-model="flight.startCity" name="startCity" />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <input class="form-control" id="description" required v-model="flight.endCity" name="endCity" />
        </div>
  
        <button @click="saveFlight" class="btn btn-success">Submit</button>
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newFlight">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import FlightsDataService from "../services/FlightsDataService";
  
  export default {
    name: "add-flight",
    data() {
      return {
        flight: {    
          startDate: "2020-05-11T20:14:14.796Z",
          startCity: "",
          endDate: "2020-05-11T20:14:14.796Z",
          endCity: "",
          planeCode: "s",
          places: "s"
        },
        submitted: false
      };
    },
    methods: {
      saveFlight() {
        var data = {
          startDate: this.flight.startDate,
          startCity: this.flight.startCity,
          endDate: this.flight.endDate,
          endCity: this.flight.endCity,
          planeCode: this.flight.planeCode,
          places: this.flight.places
        };
  
        FlightsDataService.create(data)
          .then(response => {
            this.flight.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      newFlight() {
        this.submitted = false;
        this.flight = {};
      }
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  