<template>
  <div id="app" class="min-vh-100 d-flex flex-column justify-content-between" v-if="pC == 'p-c'">
    <nav class="navigation navbar navbar-expand">
      <router-link to="/" class="navbar-brand"><img src="./components/assets/logo.svg" alt="VPut"
          class="logo"></router-link>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Регистрация
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Вход
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin" class="nav-link">{{ currentUser.email }}</router-link>
          </li>
          <router-link v-else to="/profile" class="nav-link">
            {{ currentUser.email }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">Выйти
          </a>
        </li>
      </div>
    </nav>

    <div class="flex-fill">
      <router-view />
    </div>

    <div class="mt-auto ft_back">
      <footer>
        <div class="d-flex  flex-column justify-content-center">
          <div class="d-flex flex-row align-self-center">
            <p>О нас</p>
            <p>&#8901</p>
            <a href="https://vk.com/nvshink" class="nav-link">Поддержка</a>
            <p>&#8901</p>
            <p>Реклама</p>
          </div>
          <p class="align-self-center">&#xa9 2019-2023, VПуть - в последний ...</p>
        </div>
      </footer>
    </div>

  </div>
  <div v-else-if="pC == ''">
    <Loading></Loading>
  </div>
  <div v-else>
    <ErrorLogo></ErrorLogo>
  </div>
</template>

<script>
import UserService from './services/user.service';
import ErrorLogo from './components/ErrorLogo.vue';
import Loading from './components/Loading.vue';
export default {
  data() {
    return {
      pC: ''
    }
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.pC = response.data;
      },
      error => {
        this.pC = error.data;
      });
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }
      return false;
    }
  },
  components: { Loading, ErrorLogo },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss">
@import './sass/_variables.scss';

.navigation {
  margin: 20px;
  display: flex;
  justify-content: space-between !important;
}

.logo {
  height: 40px;
}

.ft_back {
  background-color: $blue_main;
}

footer {
  color: white;
}
</style>