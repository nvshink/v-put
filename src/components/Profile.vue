<template>
  <div class="container">
    <header class="jumbotron">
    </header>
    <p>
      <strong>Поч а:</strong>
      {{ currentUser.email }}
    </p>
    <p>
      <strong>Билеты:</strong>
    <ul class="list-group">
      <li class="list-group-item" v-for="ticket in tickets" :key="ticket">
        <li>Имя: {{ ticket.name }}</li>
        <li>Место: {{ ticket.place }}</li>
        <li><button class="btn btn-block btn-primary">Печать</button></li>
      </li>
    </ul>

    </p>
  </div>
</template>
  
<script>
import TicketService from '../services/ticket.service';

export default {
  name: 'Profile',
  data() {
    return {
      tickets: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

  },
  methods: {
    getTickets() {
      TicketService.getForUser(this.$store.state.auth.user.id).then(response => {
        console.log(response.data);
        this.tickets = response.data
      })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.getTickets()
  }
};
</script>