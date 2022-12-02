<template>
  <div class="container">
    <div class="profile-info rounded-3 d-flex flex-column">
      <span>Почта: {{ currentUser.email }}</span>
    </div>
    <ul class="list-group d-flex flex-row flex-wrap justify-content-center">
      <li class="list-group-item ticket rounded-3 col-12 col-md-6" v-for="(ticket, index) in tickets" :key="index">
        <TicketCard :ticket="ticket"></TicketCard>
      </li>
    </ul>
  </div>
</template>
  
<script>
import TicketService from '../services/ticket.service';
import TicketCard from './TicketCard.vue';
export default {
  name: "Profile",
  data() {
    return {
      tickets: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getTickets() {
      TicketService.getForUser(this.$store.state.auth.user.id).then(response => {
        this.tickets = response.data;
      })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getTickets();
  },
  components: { TicketCard }
};
</script>

<style lang="scss">
@import '../sass/_variables.scss';
.ticket {
  margin: 20px 5px
}
.list-group-item + .list-group-item {
  border-top-width: 3px;
}
.profile-info {
  background-color: $blue_main;
  padding: 10px;
  margin-bottom: 20px;
  width: fit-content;
  span {
    color: white;
  }
}
</style>