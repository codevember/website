import BrowserDetect from 'lib/BrowserDetect';

export default {
  name: 'Project',
  template: require('./project.html'),
  props: ['slug', 'title', 'author', 'image'],
  methods: {
    onMouseEnter() {
      if (BrowserDetect.isMobile) return;

      if (this.tl) this.tl.kill();

      this.tl = new TimelineMax();
      this.tl.fromTo(this.$refs.pDeco, 0.6, {scaleY: 0}, {scaleY: 1, ease: Expo.easeOut}, 0);
      this.tl.fromTo(this.$refs.pImage, 0.6, {alpha: 1}, {alpha: 0.2, ease: Expo.easeOut}, 0);
      this.tl.staggerFromTo([this.$refs.pTitle, this.$refs.pAuthor], 0.6, {xPercent: 0}, {xPercent: 100, ease: Expo.easeOut}, 0.08, 0.1);
    },

    onMouseLeave() {
      if (BrowserDetect.isMobile) return;

      if (this.tl) this.tl.kill();

      this.tl = new TimelineMax();
      this.tl.to(this.$refs.pImage, 0.4, {alpha: 1, ease: Expo.easeOut}, 0);
      this.tl.to([this.$refs.pTitle, this.$refs.pAuthor], 0.4, {xPercent: 0, ease: Expo.easeOut}, 0);
      this.tl.to(this.$refs.pDeco, 0.4, {scaleY: 0, ease: Expo.easeOut}, 0.15);
    }
  }
};
