<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="startDate">Врёмя отлёта</label>
          <input type="datetime-local" class="form-control" id="startDate" required v-model="flight.startDate" name="startDate" />
        </div>
        <div class="form-group">
          <label for="endDate">Врёмя прилёта</label>
          <input type="datetime-local" class="form-control" id="endDate" required v-model="flight.endDate" name="endDate" />
        </div>
        <div class="form-group">
          <label for="startCity">Город отлёта</label>
          <input type="text" class="form-control" id="startCity" required v-model="flight.startCity" name="startCity" />
        </div>
        <div class="form-group">
          <label for="endCity">Город прилёта</label>
          <input type="text" class="form-control" id="endCity" required v-model="flight.endCity" name="endCity" />
        </div>
        <div class="form-group">
          <label for="planeCode">Код самолёта</label>
          <input type="text" class="form-control" id="planeCode" required v-model="flight.planeCode" name="planeCode" />
        </div>
        <div class="form-group">
          <label for="places">Количество мест</label>
          <input type="number" class="form-control" id="places" required v-model="flight.places" name="places" />
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
          startDate: "",
          startCity: "",
          endDate: "",
          endCity: "",
          planeCode: "",
          places: ""
        },
        submitted: false
      };
    },
    methods: {
      saveFlight() {
        var data = {
          startDate: new Date (this.flight.startDate).toISOString,
          startCity: this.flight.startCity,
          endDate: new Date (this.flight.endDate).toISOString,
          endCity: this.flight.endCity,
          planeCode: this.flight.planeCode,
          places: new Array (this.flight.places).fill(true)
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
  