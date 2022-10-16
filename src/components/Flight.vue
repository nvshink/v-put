<template>
    <div v-if="currentFlight" class="edit-form">
      <h4>Flight</h4>
      <form>
        <div class="form-group">
          <label for="startDate">startDate</label>
          <input type="text" class="form-control" id="startDate"
            v-model="currentFlight.startDate"
          />
        </div>
        <div class="form-group">
          <label for="endDate">endDate</label>
          <input type="text" class="form-control" id="endDate"
            v-model="currentFlight.endDate"
          />
        </div>
        <div class="form-group">
          <label for="startCity">startCity</label>
          <input type="text" class="form-control" id="startCity"
            v-model="currentFlight.startCity"
          />
        </div>
        <div class="form-group">
          <label for="endCity">endCity</label>
          <input type="text" class="form-control" id="endCity"
            v-model="currentFlight.endCity"
          />
        </div>
      </form>
      <div class="form-group">
        <label for="planeCode">Код самолёта</label>
        <input type="text" class="form-control" id="planeCode"
          v-model="currentFlight.planeCode"
        />
      </div>
      <div class="form-group">
        <label for="places">Количество мест</label>
        <input type="text" class="form-control" id="places"
          v-model="currentFlight.places"
        />
      </div>
    
      <button class="badge badge-danger mr-2"
        @click="deleteFlight"
      >
        Delete
      </button>
  
      <button type="submit" class="badge badge-success"
        @click="updateFlight"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  
    <div v-else>
      <br />
      <p>Please click on a Flight...</p>
    </div>
  </template>
  
  <script>
  import FlightsDataService from "../services/FlightsDataService";
  
  export default {
    name: "flight",
    data() {
      return {
        currentFlight: null,
        message: ''
      };
    },
    methods: {
      getFlight(id) {
        FlightsDataService.get(id)
          .then(response => {
            this.currentFlight = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updatePublished() {
        var data = {
            id: this.currentFlight.id,
          startDate: this.currentFlight.startDate,
          startCity: this.currentFlight.startCity,
          endDate: this.currentFlight.endDate,
          endCity: this.currentFlight.endCity,
          planeCode: this.currentFlight.planeCode,
          places: this.currentFlight.places
        };
  
        FlightsDataService.update(this.currentFlight.id, data)
          .then(response => {
            console.log(response.data);
            this.message = 'The status was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updateFlight() {
        FlightsDataService.update(this.currentFlight.id, this.currentFlight)
          .then(response => {
            console.log(response.data);
            this.message = 'The flight was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      deleteFlight() {
        FlightsDataService.delete(this.currentFlight.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "flights" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getFlight(this.$route.params.id);
    }
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  