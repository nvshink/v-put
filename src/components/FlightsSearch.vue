<template>
    <div class="d-flex flex-column">
        <div class="card card-container border-white main_border">
            <Form class="main rounded-4  ms-5 me-5 bg-xl-white" @submit="handleSearch" :validation-schema="schema">
                <div class="group1 d-flex flex-column flex-xl-row justify-content-center align-items-center p-3">
                    <div class="d-flex flex-column flex-xl-row align-items--xl-end">
                        <div class="form-group type_field ms-1">
                            <label name="startDate" class="text-white">Дата вылета</label>
                            <Field class="form-control rounded-3" name="startDate" type="date" label="Дата вылета"
                                placeholder="дд.мм.гггг" />
                            <ErrorMessage name="startDate" class="error-feedback" />
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="checkboxEndDate"
                                    v-model="checkboxEndDate">
                                <label class="form-check-label text-white" for="checkboxEndDate">В обе стороны</label>
                            </div>
                        </div>
                        <div class="form-group type_field ms-1">
                            <label name="endDate" class="text-white">Дата возвращения</label>
                            <Field class="form-control rounded-3" name="endtDate" type="date" label="Дата возвращения"
                                placeholder="дд.мм.гггг" :disabled="!checkboxEndDate" />
                            <ErrorMessage name="endDate" class="error-feedback" />
                        </div>
                        <div class="form-group type_field ms-1">
                            <label name="startCity" class="text-white">Место вылета</label>
                            <Field name="startCity" type="text" class="form-control rounded-3" list="datalistOptionsSC"
                                placeholder="Место вылета" required v-model="flight.startCity"
                                @keyup="liveSearch('startCity')" />
                            <ErrorMessage name="startCity" class="error-feedback" />
                            <datalist id="datalistOptionsSC">
                                <option v-for="(result, index) in this.liveSearchResult" :key="index">{{ result }}
                                </option>
                            </datalist>
                        </div>
                        <div class="form-group type_field ms-1">
                            <label name="endCity" class="text-white">Место назначения</label>
                            <Field name="endCity" type="text" class="form-control rounded-3" list="datalistOptionsEC"
                                placeholder="Место возвращения" required v-model="flight.endCity"
                                @keyup="liveSearch('endCity')" />
                            <ErrorMessage name="endCity" class="error-feedback" />
                            <datalist id="datalistOptionsEC">
                                <option v-for="(result, index) in this.liveSearchResult" :key="index">{{ result }}
                                </option>
                            </datalist>
                            <template v-if="this.liveSearchAttr == 'endCity' && this.liveSearchNoSearch">
                                <div class="search-item">
                                    <p class="text-white">Туда нет рейсов</p>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="form-group d-flex justify-content-center align-items-center m-3">
                        <button class="btn btn-primary btn-block h-50 rounded-3" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <span>Найти рейс</span>
                        </button>
                    </div>
                </div>
            </Form>
        </div>
        <div class="listback ">
            <FlightsList :flights="this.flights">
            </FlightsList>
        </div>
    </div>
</template>

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
        yesterday.setDate(yesterday.getDate() - 1);
        const schema = yup.object().shape({
            checkboxEndDate: yup.boolean(),
            startDate: yup.date().min(yesterday, "В прошлое нельзя").required("Введите дату"),
            endDate: yup.date().when("checkboxEndDate", { is: true, then: yup.date().min(new Date()).required("Введите дату") }),
            startCity: yup.string().required("Введите город"),
            endCity: yup.string().required("Введте город"),
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
                    }
                    else {
                        this.liveSearchNoSearch = false;
                        var resArray = [];
                        resArray = response.data;
                        this.liveSearchResult = resArray.filter(s => s.includes(data));
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },
}
</script>
<style lang="scss">
@import '../sass/_variables.scss';

.type_field {
    width: 210px;
}

.main {
    background-color: $blue_main;
}

@media (max-width: 1199.5px) {
    .main_border {
        border-color: $blue_main !important;
    }

    .text-white {
        color: black !important;
    }

    .main {
        background-color: white;
    }

    .listback {
        display: flex;

    }
}

.btn {
    background-color: $orng;
    border: none;

    span {
        color: white;
        font-size: 16px;
    }
}

.listback {
    margin-top: 72px;
}

.error-feedback {
    font-size: 12px;
    background-color: #f03b3b;
    color: white;
    padding: 3px;
    border-radius: 3px;
}
</style>