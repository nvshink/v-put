<template>
  <div class="col-md-12">
    <div class="card-container">
      <Form @submit="handleRegister" :validation-schema="schema" class="d-flex flex-column">
        <div class="main_brd align-self-center" v-if="!successful">
          <div class="form-group">
            <label for="email">Электронная почта</label>
            <Field name="email" type="email" class="form-control type_field" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <Field name="password" type="password" class="form-control type_field" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password-confirm">Повторите пароль</label>
            <Field name="passwordConf" type="password" class="form-control type_field" />
            <ErrorMessage name="passwordConf" class="error-feedback" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block mt-4 butt" type="submit" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>
  </div>
</template>
  
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Введите Email")
        .email("Email неверный")
        .max(50, "Не больше 50 символов"),
      password: yup
        .string()
        .required("Введите пароль")
        .min(6, "Минимум 6 символов")
        .max(40, "Не больше 40 символов"),
      passwordConf: yup
        .string()
        .required("Подтвердите пароль")
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
  