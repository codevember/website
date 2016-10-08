export default {
  name: 'Header',
  template: require('./header.html'),
  data () {
    return {
      name: 'Header'
    };
  },
  mounted() {
    console.log('Hello from header');
  },
  methods: {}
};
