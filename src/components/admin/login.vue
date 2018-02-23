<template lang="html">
  <div class="Login">
    <div class="Login-form" v-if="!isLogged">
      <h2>Login</h2>
      <input type="email" name="email" v-model="email" v-on:focus="clearError" placeholder="E-mail">
      <input type="password" name="password" v-model="password" v-on:focus="clearError" placeholder="Password">
      <button type="button" v-on:click="onSubmit">GO</button>
      <p>
        {{ error }}
      </p>
    </div>
    <div class="Login-logged" v-else>
      Your are already logged in.<br>
      <button type="button" v-on:click="signout">Sign out</button>
    </div>
  </div>
</template>

<script>
import * as EmailValidator from 'email-validator';
import Api from 'backend-api/dist/browser.js';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLogged: false
    };
  },
  mounted() {
    if (Api.getCurrentUser()) {
      this.isLogged = true;
    }
  },
  methods: {
    clearError() {
      this.error = '';
    },

    onSubmit() {
      if (this.email === '') {
        this.error = 'Please enter your email';
        return;
      }

      if (this.password === '') {
        this.error = 'Please enter your password';
        return;
      }

      if (!EmailValidator.validate(this.email)) {
        this.error = 'Please enter a valid email';
        return;
      }

      Api.signin(this.email, this.password)
        .then(() => {
          window.location.href = '/admin';
          this.isLogged = true;
        })
        .catch((error) => {
          this.error = error.message;
        });
    },

    signout() {
      Api.signout().then(() => {
        window.location.href = '/';
      });
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/login";
</style>
