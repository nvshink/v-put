<template>
  <div class="container">
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    <div class="d-flex flex-wrap justify-content-center">
      <div class="m-1" v-for="(place, index) in flight.places" :key="index">
        <button class="btn"
          :class="selectedPlaces.includes(index + 1) ? 'place-selected' : (place ? 'place-free' : 'place-taken')"
          :disabled="!place" @click="clickOnPlace(index)">{{ index
              + 1
          }}</button>
      </div>
    </div>
    <Form class="mb-3" v-for="(place, index) in selectedPlaces" :key="index" :validation-schema="schemas">
      <Field class="form-control selected-place-field" name="place" readonly v-model="passangersData.places[index]">
      </Field>
      <div class="form-group mt-2">
        <Field name="name" type="text" placeholder="Ф.И.О." class="form-control" v-model="passangersData.name[index]" />
        <ErrorMessage name="name" class="error-feedback" />
      </div>

      <div class="input-number d-flex flex-row justify-content-between mt-2">

        <div class="form-group">
          <Field name="adultOrChild" class="form-select adult-or-child me-auto" list="datalistOptionsAdultOrChild"
            required placeholder="Возраст" v-model="passangersData.adultOrChild[index]" />
          <ErrorMessage name="adultOrChild" class="error-feedback" />
        </div>
        <div class="d-flex">
          <div class="form-group">
            <Field name="series" type="number" placeholder="Серия" class="form-control series"
              v-model="passangersData.series[index]" />
          </div>
          <div class="form-group">
            <Field name="number" type="number" placeholder="Номер" class="form-control number"
              v-model="passangersData.number[index]" />
          </div>
        </div>
      </div>
      <div class="d-flex flex-column">
        <ErrorMessage name="series" class="error-feedback" />
        <ErrorMessage name="number" class="error-feedback" />
      </div>
    </Form>
    <datalist id="datalistOptionsAdultOrChild">
      <option selected>Взрослый</option>
      <option>Ребёнок</option>
    </datalist>
    <div class="mt-3">
      <span>Цена {{ takePrice() }}&#x20bd</span>
    </div>
    <div class="form-group mt-3">
      <button class="btn btn-primary btn-block" :disabled="loading" @click="buyTickets">

        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span v-show="succesed">Куплено</span>
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
      place: yup.string().required("Выберите место"),
      name: yup.string().required("Введите имя"),
      series: yup.string().min(4, "Серия содержит больше цифр").max(4, "Серия содержит меньше цифр").required("Введите серию паспорта"),
      number: yup.string().min(6, "Номер содержит больше цифр").max(6, "Номер содержит меньше цифр").required("Введите номер паспорта"),
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
      loading: false,
      succesed: false
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
      for (var i = 0; i < this.passangersData.places.length; i++) {
        var data = {
          place: this.passangersData.places[i],
          name: this.passangersData.name[i],
          adultOrChild: this.passangersData.adultOrChild[i],
          series: this.passangersData.series[i],
          number: this.passangersData.number[i],
          userId: this.$store.state.auth.user.id,
          flightId: this.flight._id
        }
        this.createTicket(data);
        this.updateFlights(data);
      }
    },
    createTicket(data) {
      TicketService.create(data)
        .then(response => {
          this.succesed = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateFlights(data) {
      FlightsDataService.update(data.flightId, { "place": data.place }).
        then(response => {
          this.message = "Билеты куплены"
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
@import '../sass/_variables.scss';


.place-free {
  color: #257337;
  background-color: white;
}

.place-free:hover {
  color: #257337;
  background-color: rgb(242, 242, 242);
}

.place-taken {
  color: rgb(82, 82, 82);
}

.place-taken:hover {
  color: rgb(82, 82, 82);
  background-color: white;

}

.place-selected {
  color: white;
  background-color: $orng;
}

.place-selected:hover {
  color: white;
  background-color: $orng;
}


.container {
  background-color: white;
}

.adult-or-child {
  width: 150px;
}

.selected-place-field {
  border: none;
  cursor: unset;
  text-align: center;
}

.selected-place-field:focus {
  border: none;
  box-shadow: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.input-number {
  .series {
    width: 70px;
    text-align: center;
  }

  .number {
    width: 90px;
    text-align: center;
  }

}
</style>
  