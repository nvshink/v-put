<template>
  <div class="container" v-if="isAdmin == null">
    <Loading v-if="isError == false"></Loading>
    <ErrorLogo v-else></ErrorLogo>
  </div>
  <div class="container" v-else-if="isAdmin">
    <div>
      <h1>Управление рейсами</h1>
      <Flights></Flights>
      <router-link to="/add" class="btn btn-success">Добавить рейс</router-link>
    </div>
  </div>
  <div v-else>
    <span>У вас нет прав прав доступа ;(</span>
  </div>
</template>
  
<script>
import UserService from '../services/user.service';
import Loading from './Loading.vue';
import Flights from './Flights.vue';
import ErrorLogo from './ErrorLogo.vue';

export default {
  name: 'Admin',
  data() {
    return {
      isAdmin: null,
      isError: false
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      response => {
        this.isAdmin = response.data;
      },
      error => {
        this.isError = true;
        }
    );
   
  },
  components: {
    Loading,
    Flights,
    ErrorLogo
  }

};
</script>