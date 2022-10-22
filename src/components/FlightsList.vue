<template>
  <div class="">
    <h4>Рейсы</h4>
    <ul class="list-group">
      <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(flight, index) in flights"
        :key="index" @click="setActiveFlight(flight, index)">
        {{ flight.startCity + " ----> " + flight.endCity }}
      </li>
    </ul>
  </div>
</template>
  
<script>
export default {
  name: "flights-list",
  data() {
    return {
      // flights: [],
      currentFlight: null,
      currentIndex: -1,
    };
  },
  props: ['flights'],
}
</script>
  
<style lang="scss">

</style>
  