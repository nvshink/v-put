<template>
    <div class="container">
      <header class="jumbotron">
        <h3>{{content}}</h3>
      </header>
      <Flights></Flights>
    </div>
  </template>
  
  <script>
  import UserService from '../services/user.service';
  import Flights from '../components/Flights.vue';
  
  export default {
    name: 'Home',
    data() {
      return {
        content: ''
      };
    },
    components: { Flights },
    mounted() {
      UserService.getPublicContent().then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  };
  </script>