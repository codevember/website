export default {
  name: 'Home',
  template: require('./home.html'),
  data () {
    return {
      name: 'World'
    };
  },
  mounted() {
    console.log('Hello from home');
  },
  methods: {}
};
