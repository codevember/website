export default {
  name: 'DaySelector',
  template: require('./day-selector.html'),
  props: ['currentDay'],
  data () {
    return {};
  },
  created() {


  },
  mounted() {
    var ulDay = this.$refs.DaySelectorUl;
    console.log(this.$refs);


  },
  computed(){

  },
  methods: {


  }
};
