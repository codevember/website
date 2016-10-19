import TweenLite from  "gsap";
export default {
  name: 'Project',
  template: require('./project.html'),
  props: ['url', 'title', 'author', 'image'],
  data () {
    return {};
  },
  mounted() {
    this.projectAnim();
  },
  methods: {
    projectAnim(){
      TweenLite.to(this.$refs.pAuthor , 0.5, { bottom: "-22px" , opacity:1,delay: .3})
      TweenLite.to(this.$refs.pTitle , 0.6, { bottom: "0px",opacity:1,delay: .1})
      TweenLite.to(this.$refs.pDeco , 0.4, { left: "18px",opacity:0.8})
      console.log(this.$refs.pContainer);
    }
  }
};
