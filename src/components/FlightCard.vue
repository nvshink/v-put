<template>
    <div class="d-flex flex-row">
        <div class="col-3 d-flex flex-column align-items-center">
            <span>{{ flight.startCity }}</span>

            <span class="time">{{ new Date(flight.startDate).getHours() }}:{{ new Date(flight.startDate).getMinutes() }}</span>
            <span class="date">{{ new Date(flight.startDate).getDate() }}.{{ new Date(flight.startDate).getMonth() }}</span>
        </div>
        <div class="col-3 d-flex flex-column align-items-center">
            <span>{{ flight.endCity }}</span>
            <span class="time">{{ new Date(flight.endDate).getHours() }}:{{ new Date(flight.endDate).getMinutes() }}</span>
            <span class="date">{{ new Date(flight.endDate).getDate() }}.{{ new Date(flight.endDate).getMonth() }}</span>
        </div>
        <div class="col-6 d-flex flex-column align-items-end">
            <span>{{ flight.airline }}</span>
            <span class="mt-auto price">{{ flight.price }} &#x20bd</span>
        </div>
    </div>
    <div class="d-flex justify-content-center" v-if="!this.currentUser">
        <button type="button" class="btn btn-primary rounded-3 buy" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            Войти для покупки
        </button>
    </div>
    <div class="d-flex justify-content-center" v-else-if="this.currentUser['roles'].includes('ROLE_USER')">
        <button type="button" class="btn btn-primary rounded-3 buy" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            Купить
        </button>
    </div>
    <div class="d-flex justify-content-center" v-else-if="this.currentUser['roles'].includes('ROLE_ADMIN')">
        <button type="button" class="btn rounded-3 buy me-sm-3" @click="deleteFlight(flight._id)">
            Удалить
        </button>
        <button type="button" class="btn rounded-3 buy ms-sm-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Редактировать
        </button>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <Flight :flight="flight"></Flight>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Flight from './Flight.vue';
import FlightsDataService from '../services/FlightsDataService';
export default {
    props: ["flight"],
    methods: {
        convertToUTCString(date) {
            var options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
                timezone: "UTC",
                hour: "numeric",
                minute: "numeric",
            };
            return new Date(date).toLocaleString("ru", options);
        },
        deleteFlight(id) {
            FlightsDataService.delete(id)
                .then((response) => {
                    if (response.data.success) {
                        this.flight.startCity = null;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateFlight(id) {
            FlightsDataService.update(id)
                .then((response) => {
                    if (response.data.success) {
                        this.flight = null;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    components: { Flight }
}
</script>
<style lang="scss">
.buy {
    width: 23pc;
    margin: 15px 0;
    color: white;
}
span {
    color: rgba( 0, 0, 0, 0.7);
    font-weight: 500;
    font-size: 24px;
}
.time {
    font-weight: 700;
}
.date {
    font-size: 20px;
}
.price {
    font-size: 36px;
}
</style>