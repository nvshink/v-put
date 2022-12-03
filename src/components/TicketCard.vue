<template>
    <div class="d-flex flex-row" v-for="flight in flights" :key="flight">
        <div class="col-3 d-flex flex-column align-items-center">
            <span>{{ flight.startCity }}</span>
            <span class="time">{{ new Date(flight.startDate).getHours() }}:{{ new Date(flight.startDate).getMinutes()
            }}</span>
            <span class="date">{{ new Date(flight.startDate).getDate() }}.{{ new Date(flight.startDate).getMonth()
            }}</span>
        </div>
        <div class="col-3 d-flex flex-column align-items-center">
            <span>{{ flight.endCity }}</span>
            <span class="time">{{ new Date(flight.endDate).getHours() }}:{{ new Date(flight.endDate).getMinutes()
            }}</span>
            <span class="date">{{ new Date(flight.endDate).getDate() }}.{{ new Date(flight.endDate).getMonth() }}</span>
        </div>
        <div class="col-6 d-flex flex-column align-items-end">
            <span>{{ flight.airline }}</span>
            <span class="mt-auto price">{{ ticket.place }}</span>
        </div>
    </div>
    <div class="d-flex justify-content-start">
        <span class="col-8 mt-auto">{{ ticket.name }}</span>
        <button type="button" class="col-2 btn rounded-3 print-download ms-auto me-sm-3 d-flex justify-content-center"
            @click="printTicket(ticket)">
            <img src="./assets/print.svg" />
        </button>
        <button type="button" class="col-2 btn rounded-3 print-download d-flex justify-content-center"
            @click="saveTicket(ticket)">
            <img src="./assets/download.svg" />
        </button>
    </div>
</template>

<script>
import FlightsDataService from '../services/FlightsDataService';
import TicketService from '../services/ticket.service';
//import { saveAs } from 'file-saver'
export default {
    props: ["ticket"],
    data() {
        return {
            flights: [],
        }
    },
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
        findFlight() {
            FlightsDataService.get(this.ticket.flightId).then(response => {
                this.flights[0] = response.data
            }).catch(e => {
                console.log(e);
            });
        },
        saveAs(content, fileName) {
            const a = document.createElement("a");
            const isBlob = content.toString().indexOf("Blob") > -1;
            let url = content;
            if (isBlob) {
                url = window.URL.createObjectURL(content);
            }
            a.href = url;
            a.download = fileName;
            a.click();
            if (isBlob) {
                window.URL.revokeObjectURL(url);
            }
        },
        printTicket(ticket) {
            TicketService.print(ticket._id).then(response => {
                TicketService.fetch(ticket._id).then(res => {
                    const blob = new Blob([res.data], { type: "application/pdf" });
                    var blobURL = URL.createObjectURL(blob);
                    var iframe = document.createElement("iframe");
                    document.body.appendChild(iframe);
                    iframe.style.display = "none";
                    iframe.src = blobURL;
                    iframe.onload = function () {
                        setTimeout(function () {
                            iframe.focus();
                            iframe.contentWindow.print();
                        }, 1);
                    };
                })
                    .catch(e => {
                        console.log(e);
                    });
            });
        },
        saveTicket(ticket) {
            TicketService.print(ticket._id).then(response => {
                TicketService.fetch(ticket._id).then(res => {
                    const blob = new Blob([res.data], { type: "application/pdf" });
                    this.saveAs(blob, `Билет ${ticket.name}.pdf`);
                })
                    .catch(e => {
                        console.log(e);
                    });
            });
        },
    },
    mounted() {
        this.findFlight();
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
}
</script>
<style lang="scss">
@import '../sass/_variables.scss';

.print-download {
    width: 38px;
    height: 38px;
    min-width: 38px;
    min-height: 38px;
    margin: 10px 0;
}

.print-download:hover {
    background-color: $blue_main;
}

span {
    color: rgba(0, 0, 0, 0.7);
    font-weight: 500;
    font-size: 24px;
    height: fit-content;
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