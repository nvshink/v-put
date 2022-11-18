<template>
    <div>
        {{ flight.startCity }} &#8212 {{ flight.endCity }}
    </div>
    <div>
        Авиакомпания: {{ flight.airline }}
    </div>
    <div>
        Время вылета: {{ convertToUTCString(flight.startDate) }}
    </div>
    <div>
        Время прибытия: {{ convertToUTCString(flight.endDate) }}
    </div>
    <div>
        <span>Цена за место: </span>
        <span>{{ flight.price }} &#x20bd</span>
    </div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Купить
    </button>
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
    },
    components: { Flight }
}
</script>
<style lang="scss">

</style>