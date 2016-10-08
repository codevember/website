
export default {
  name: 'About',
  template: require('./about.html'),
  data () {
    return {
      name: 'miaou'
    };
  },
  mounted() {
    console.log('Hello from about');
  },
  methods: {}
};
