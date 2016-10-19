import TweenLite from  "gsap";
export default {
  name: 'HomeLoader',
  template: require('./home-loader.html'),
  props:'',
  data () {
    return {};
  },
  created() {
  },
  mounted() {
  },
  computed(){
  },
  methods: {
  },
  beforeDestroy(){
    /*TweenLite.to(this.$refs.loader , 0.5, {
     opacity: 0,
     onComplete: () => {  }
   })*/
  }
};
