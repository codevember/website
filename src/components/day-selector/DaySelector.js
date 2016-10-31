import BrowserDetect from 'lib/BrowserDetect';

export default {
  name: 'DaySelector',
  template: require('./day-selector.html'),
  props: ['day'],
  data () {
    return {
      maxDay: 1
    };
  },
  watch: {
    $route: 'scrollToCurrentDay'
  },
  created() {
    const d = new Date();
    this.maxDay = Math.min(30, d.getDate());
  },
  mounted() {
    this.scrollToCurrentDay();
  },
  methods: {
    scrollToCurrentDay() {
      if (BrowserDetect.isChrome) {
        this.$el.scrollTop = 22.3 * (30 - this.day); // Chrome
      } else {
        this.$el.scrollTop = 23 * (30 - this.day);
      }
    }
  }
};
