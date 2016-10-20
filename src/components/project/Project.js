import Mediator from 'lib/Mediator';

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
    projectAnim() {
      let tl = new TimelineMax();
      tl.to(this.$refs.pDeco, 0.4, {x: 18, alpha: 0.8}, 0);
      tl.to(this.$refs.pImage, 0.4, {alpha: 0.2}, 0);
      tl.to(this.$refs.pTitle, 0.6, {y: -33, alpha: 1}, 0.1);
      tl.to(this.$refs.pAuthor, 0.5, {y: -30, alpha: 1}, 0.3);
    },
    onClick() {
      Mediator.emit('project:click', this.url);
    }
  }
};
