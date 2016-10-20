import * as EmailValidator from 'email-validator';
import Api from 'lib/Api';

export default {
  name: 'Login',
  template: require('./login.html'),
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
};
