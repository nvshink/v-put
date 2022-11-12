<template>
  <div class="container">
    <div class="d-flex flex-wrap">
      <div class="m-1" v-for="(place, index) in flight.places" :key="index">
        <button class="btn btn-block"
          :class="selectedPlaces.includes(index + 1) ? 'place-selected' : (place ? 'place-free' : 'place-taken')"
          :disabled="!place" @click="clickOnPlace(index)">{{ index
              + 1
          }}</button>
      </div>
    </div>
    <Form class="" v-for="(place, index) in selectedPlaces" :key="index" :validation-schema="schemas">
      <Field class="form-control" name="place" readonly v-model="passangersData.places[index]"></Field>
      <div class="form-group">
        <Field name="name" type="text" placeholder="ФИО" class="form-control" v-model="passangersData.name[index]" />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group">
        <Field name="adultOrChild" type="n" class="form-select" list="datalistOptionsAdultOrChild" required
          placeholder="Взрослый/ребёнок" v-model="passangersData.adultOrChild[index]" />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group">
        <Field name="series" type="number" placeholder="Серия" class="form-control"
          v-model="passangersData.series[index]" />
        <ErrorMessage name="series" class="error-feedback" />
      </div>
      <div class="form-group">
        <Field name="number" type="number" placeholder="Номер" class="form-control"
          v-model="passangersData.number[index]" />
        <ErrorMessage name="number" class="error-feedback" />
      </div>
    </Form>
    <datalist id="datalistOptionsAdultOrChild">
      <option selected>Взрослый</option>
      <option>Ребёнок</option>
    </datalist>
    <span>Цена {{ takePrice() }}</span>
    <div class="form-group">
      <button class="btn btn-primary btn-block" @click="buyTickets">
        <span>Купить</span>
      </button>
    </div>
  </div>
</template>
  
<script>
import TicketService from "../services/ticket.service";
import FlightsDataService from '../services/FlightsDataService';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "flight",
  data() {
    const schemas = yup.object().shape({
      place: yup.string().required("place is required!"),
      name: yup.string().required("name is required!"),
      series: yup.string().required("series is required!"),
      number: yup.string().required("number is required!"),
    });
    return {
      schemas,
      selectedPlaces: [],
      passangersData: {
        places: [],
        name: [],
        adultOrChild: [],
        series: [],
        number: [],
      },

    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: ['flight'],
  methods: {
    clickOnPlace(index) {
      if (this.selectedPlaces.includes(index + 1)) {
        this.selectedPlaces = this.selectedPlaces.filter(function (f) { return f !== index + 1 });
        var i = this.passangersData.places.findIndex(item => item == index + 1);
        this.passangersData.places.splice(i, 1);
        this.passangersData.name.splice(i, 1);
        this.passangersData.adultOrChild.splice(i, 1);
        this.passangersData.series.splice(i, 1);
        this.passangersData.number.splice(i, 1);
      }
      else {
        this.passangersData.places[this.selectedPlaces.length] = index + 1;
        this.selectedPlaces.push(index + 1);

      }
    },
    buyTickets() {
      console.log('купить');
      for (var i = 0; i < this.passangersData.places.length; i++) {
        console.log('купить' + i);
        var data = {
          place: this.passangersData.places[i],
          name: this.passangersData.name[i],
          adultOrChild: this.passangersData.adultOrChild[i],
          series: this.passangersData.series[i],
          number: this.passangersData.number[i],
          userId: this.$store.state.auth.user.id,
          flightId: this.flight._id
        }
        console.log(data);
        this.createTicket(data);
        this.updateFlights(data);
      }
    },
    createTicket(data) {
      console.log('обновить пользователя');
      TicketService.create(data)
        .then(response => {

          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateFlights(data) {
      console.log('обновить пользователя');
      FlightsDataService.update(data.flightId, { "place": data.place }).
        then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    takePrice() {
      if (this.passangersData.adultOrChild.length == 0) {
        return 0
      } else {
        var p = 0;
        for (var i = 0; i < this.passangersData.adultOrChild.length; i++) {
          var n;
          n = (this.passangersData.adultOrChild[i] == "Взрослый") ? this.flight.price : (this.flight.price * 0.75);
          p = p + n;
        }
        return p
      }
    }
  }
}
</script>
  
<style scoped lang="scss">
.place-free {
  color: green;
}

.place-taken {
  color: red;
}

.place-selected {
  color: chocolate
}

.container {
  background-color: white;
}
</style>
  