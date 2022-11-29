<template>
  <div class="container" v-if="isAdmin == null">
    <Loading v-if="isError == false"></Loading>
    <ErrorLogo v-else></ErrorLogo>
  </div>
  <div class="submit-form" v-else-if="isAdmin">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="startDate">Дата и время вылета</label>
        <input type="datetime-local" class="form-control" id="startDate" required v-model="flight.startDate"
          name="startDate" />
      </div>
      <div class="form-group">
        <label for="endDate">Дата и время прилёта</label>
        <input type="datetime-local" class="form-control" id="endDate" required v-model="flight.endDate"
          name="endDate" />
      </div>
      <div class="form-group">
        <label for="startCity">Город вылета</label>
        <input type="text" class="form-control" id="startCity" required v-model="flight.startCity" name="startCity" />
      </div>
      <div class="form-group">
        <label for="endCity">Город прилёта</label>
        <input type="text" class="form-control" id="endCity" required v-model="flight.endCity" name="endCity" />
      </div>
      <div class="form-group">
        <label for="airline">Авиакомпания</label>
        <input type="text" class="form-control" id="airline" required v-model="flight.airline" name="airline" />
      </div>
      <div class="form-group">
        <label for="planeCode">Код самолёта</label>
        <input type="text" class="form-control" id="planeCode" required v-model="flight.planeCode" name="planeCode" />
      </div>
      <div class="form-group">
        <label for="places">Количество мест</label>
        <input type="number" class="form-control" id="places" required v-model="flight.places" name="places" />
      </div>
      <div class="form-group">
        <label for="price">Цена</label>
        <input type="number" class="form-control" id="price" required v-model="flight.price" name="price" />
      </div>

      <button @click="saveFlight" class="btn btn-success">Добавить</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newFlight">Add</button>
    </div>
  </div>
  <div v-else>
    <span>У вас нет прав прав доступа ;(</span>
  </div>
</template>
  
<script>
import FlightsDataService from "../services/FlightsDataService";
import UserService from '../services/user.service';
import Loading from './Loading.vue'
import ErrorLogo from './ErrorLogo.vue';


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
        places: "",
        airline: "",
        price: ""
      },
      submitted: false,
      isAdmin: null,
      isError: false
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      response => {
        this.isAdmin = response.data;
      }
    );
  },
  methods: {
    saveFlight() {
      var data = {
        startDate: new Date(this.flight.startDate).toISOString(),
        startCity: this.flight.startCity,
        endDate: new Date(this.flight.endDate).toISOString(),
        endCity: this.flight.endCity,
        planeCode: this.flight.planeCode,
        places: new Array(this.flight.places).fill(true),
        airline: this.flight.airline,
        price: this.flight.price,
      };
      FlightsDataService.create(data).then(
        console.log("Добавлено")
      );
    },

    newFlight() {
      this.submitted = false;
      this.flight = {};
    }
  },
  components: {
    Loading,
    ErrorLogo
  }
};
</script>