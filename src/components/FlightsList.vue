<template>
  <div class="flights_list">
    <ul class="list-group tickets d-flex flex-row flex-wrap justify-content-center flex-fill mb-5">
      <li class="list-group-item ticket rounded-3 m-3" v-for="(flight) in flights" :key="flight">
        <FlightCard :flight="flight"></FlightCard>
      </li>
    </ul>
  </div>
</template>
  
<script>
import FlightCard from './FlightCard.vue';

export default {
    name: "flights-list",
    props: ["flights"],
   
    components: { FlightCard }
}
</script>
  
<style lang="scss">

@import '../sass/_variables.scss';


.tickets {
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 12px;
}
.ticket {
  border: none;
  box-shadow: 0px 1px 3px $blue_main;
  width: 450px;
}
</style>