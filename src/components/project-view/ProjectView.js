import TweenLite from  "gsap";
export default {
  name: 'ProjectView',
  template: require('./project-view.html'),
  props:['day', 'title', 'urlIframe'],
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
