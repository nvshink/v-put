<template>
  <div class="">
    <ul class="list-group">
      <li class="list-group-item" v-for="(flight, index) in flights" :key="index">
        <div class="d-flex flex-wrap">
          <div class="m-1" v-for="(place, index) in flight.places">
            <span :class="[place ? 'place-free' : 'place-taken',]">{{ index + 1 }}</span>
          </div>
        </div>
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
          <span>Цена: </span>
          <span>{{ placesAdult * flight.price + placesChild * flight.price }} &#x20bd</span>
        </div>
        <button disabled type="button" class="btn btn-primary">Купить</button>
      </li>
    </ul>
  </div>
</template>
  
<script>
export default {
  name: "flights-list",
  props: ['flights', 'placesAdult', 'placesChild'],
  methods: {
    convertToUTCString(date) {
      var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
      };
      return new Date(date).toLocaleString("ru", options);
    }
  }
}
</script>
  
<style lang="scss">
.place-free {
  color: green;
}

.place-taken {
  color: red;
}
</style>
  