export default {
  name: 'List',
  template: require('./list.html'),
  props: ['day'],
  data () {
    return {
      name: 'List'
    };
  },
  mounted() {
    console.log('Hello from list');
  },
  methods: {}
};
