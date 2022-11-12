<template>
  <div class="">
    <ul class="list-group">
      <li class="list-group-item" v-for="(flight, index) in flights" :key="index">
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
  

  