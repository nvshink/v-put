<template>
  <div class="brd">
    <div class="bd_main">
      <Flights></Flights>
    </div>
  </div>
</template>
  
<script>
import Flights from '../components/Flights.vue';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  components: { Flights },
  mounted() {
    error => {
      this.content =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
};
</script>

<style>

.px-2 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>