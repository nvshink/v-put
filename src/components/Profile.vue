<template>
  <div class="container">
    <header class="jumbotron">
    </header>
    <p>
      <strong>Почта:</strong>
      {{ currentUser.email }}
    </p>
    <p>
      <strong>Билеты:</strong>
    <ul class="list-group">
      <li class="list-group-item" v-for="ticket in tickets" :key="ticket">
      <li>Имя: {{ ticket.name }}</li>
      <li>Место: {{ ticket.place }}</li>
      <li><button class="btn btn-block btn-primary" @click="printTicket(ticket)">Печать</button></li>
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
        this.tickets = response.data
      })
        .catch(e => {
          console.log(e);
        });
    },
    printTicket(ticket) {
      // var iframe = document.createElement('iframe');
      // iframe.style.visibility = 'hidden';

      TicketService.print(ticket._id).then(response => {
        TicketService.fetch().then(res => {
            const blob = new Blob([res.data], { type: 'application/pdf' });
            var blobURL = URL.createObjectURL(blob);

            var iframe = document.createElement('iframe'); //load content in an iframe to print later
            document.body.appendChild(iframe);

            iframe.style.display = 'none';
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