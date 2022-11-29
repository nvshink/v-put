<template>
    <div class="card card-container">
        <Form @submit="handleSearch" :validation-schema="schema">
            <div class="form-group">
                <CustomInput name="startDate" type="date" label="Дата вылета" v-model="flight.startDate"></CustomInput>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkboxEndDate" v-model="checkboxEndDate">
                <label class="form-check-label" for="checkboxEndDate">В обе стороны</label>
            </div>
            <div class="form-group">
                <label for="endDate">Дата возврашения</label>
                <Field name="endDate" type="date" class="form-control" :validateOnInput="false"
                    :disabled="!checkboxEndDate" />
                <ErrorMessage name="endDate" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="startCity">Место отправления</label>
                <Field name="startCity" type="text" class="form-control" list="datalistOptionsSC" id="startCity"
                    required @keyup="liveSearch('startCity')" />
                <datalist id="datalistOptionsSC">
                    <option v-for="(result, index) in this.liveSearchResult" :key="index">{{ result }}</option>
                </datalist>
                <template v-if="this.liveSearchAttr == 'startCity' && this.liveSearchNoSearch">
                    <div class="search-item">
                        <p>Отсюда нет рейсов</p>
                    </div>
                </template>
            </div>
            <div class="form-group">
                <label for="endCity">Место прибытия</label>
                <Field name="endCity" type="text" class="form-control" list="datalistOptionsEC" required
                    v-model="flight.endCity" @keyup="liveSearch('endCity')" />
                <datalist id="datalistOptionsEC">
                    <option v-for="(result, index) in this.liveSearchResult" :key="index">{{ result }}</option>
                </datalist>
                <template v-if="this.liveSearchAttr == 'endCity' && this.liveSearchNoSearch">
                    <div class="search-item">
                        <p>Туда нет рейсов</p>
                    </div>
                </template>
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Найти</span>
                </button>
            </div>
        </Form>
        <FlightsList :flights="this.flights">
        </FlightsList>
    </div>
</template>
<style lang="scss">
.has-error {
    border: 2px solid red;
}
</style>
<script>
import FlightsDataService from '../services/FlightsDataService';
import FlightsList from './FlightsList.vue';
import CustomInput from './CustomInput.vue';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    name: "FlightsSearch",
    components: {
        Form,
        Field,
        ErrorMessage,
        FlightsList,
        CustomInput
    },
    data() {
        var yesterday = new Date()
        yesterday.setDate(yesterday.getDate()-1);
        const schema = yup.object().shape({
            checkboxEndDate: yup.boolean(),
            startDate: yup.date().min(yesterday).required(),
            endDate: yup.date().when("checkboxEndDate", { is: true, then: yup.date().min(new Date ()).required("ss") }),
            startCity: yup.string().required("startCity is required!"),
            endCity: yup.string().required("endCity is required!"),
        });
        return {
            loading: false,
            message: "",
            schema,
            checkboxEndDate: false,
            liveSearchResult: [],
            liveSearchNoSearch: true,
            liveSearchAttr: "",
            flights: [],
            flight: {
                startDate: "",
                startCity: "",
                endDate: "",
                endCity: "",
                planeCode: "",
                placesAdult: "",
                placesChild: "",
            },
        };
    },
    methods: {
        handleSearch(request) {
            var data = {
                date: new Date(request.startDate).toISOString(),
                startCity: request.startCity,
                endCity: request.endCity,
            };
            FlightsDataService.findFlights(data)
                .then(response => {
                    this.flights = response.data;
                    console.log(this.flights);
                })
                .catch(e => {
                    console.log(e);
                });
            if (this.checkboxEndDate) {
                data.date = new Date(request.endDate).toISOString();
                data.endCity = [data.startCity, data.startCity = data.endCity][0];
                FlightsDataService.findFlights(data)
                    .then(response => {
                        this.flights = this.flights.concat(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        liveSearch(attr) {
            var data = "";
            if (attr == "startCity") {
                data = this.flight.startCity;
            } else if (attr == "endCity") {
                data = this.flight.endCity;
            }
            this.liveSearchAttr = attr
            FlightsDataService.unicValuesColumn(attr)
                .then(response => {
                    if (response.data.length == 0) {
                        this.liveSearchNoSearch = true;
                        this.liveSearchResult = [];
                        return;
                    }
                    this.liveSearchNoSearch = false;
                    var resArray = [];
                    resArray = response.data;
                    this.liveSearchResult = resArray.filter(s => s.includes(data));
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },
}
</script>