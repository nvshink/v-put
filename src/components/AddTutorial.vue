<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" required v-model="tutorial.startCity" name="startCity" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input class="form-control" id="description" required v-model="tutorial.endCity" name="endCity" />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import FlightsDataService from "../services/FlightsDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {    
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
    saveTutorial() {
      var data = {
        startDate: this.tutorial.startDate,
        startCity: this.tutorial.startCity,
        endDate: this.tutorial.endDate,
        endCity: this.tutorial.endCity,
        planeCode: this.tutorial.planeCode,
        places: this.tutorial.places
      };

      FlightsDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
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
