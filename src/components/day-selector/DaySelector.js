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
    this.setFontSize();
    this.placeLi();
  },
  watch: {
    $route: ['setFontSize']
    
  },
  computed(){

  },
  methods: {
    setFontSize(){
      for (var i = 0; i < this.$refs.liDay.length; i++) {
        TweenLite.to(this.$refs.liDay[i], 0.3, { fontSize: "1.1em"})
      }
      var liDay = this.$refs.liDay[this.$route.params.day-1];
      var liDayPrev = this.$refs.liDay[this.$route.params.day-2];
      var liDayPast = this.$refs.liDay[this.$route.params.day];
      TweenLite.to(liDay, 0.4, { fontSize: "2em"})
      TweenLite.to(liDayPrev, 0.5, { fontSize: "1.5em"})
      TweenLite.to(liDayPast, 0.5, { fontSize: "1.5em"})

    },
    placeLi(){
      var ulDay = this.$refs.DaySelectorUl;
      var ulDayPos = ulDay.getBoundingClientRect()
      var liDay = this.$refs.liDay[this.$route.params.day-1];
      var liDayPos = liDay.getBoundingClientRect();
      var offset = 85; // position du selecteur
      var dist = ulDayPos.height + liDayPos.top - offset -(liDayPos.height/2) ;
      TweenLite.to(ulDay, 0.3, {opacity: 1})
      TweenLite.to(ulDay, 0.8, { scrollTop: dist})
      //ulDay.scrollTop = dist;

    }


  }
};
