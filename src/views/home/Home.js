import DaySelector from 'components/day-selector/DaySelector.js';
import ProjectList from 'components/project-list/ProjectList.js';
import HomeLoader from 'components/home-loader/HomeLoader.js';
import Api from 'lib/Api';
import Mediator from 'lib/Mediator';
import BrowserDetector from 'lib/BrowserDetect';

export default {
  name: 'Home',
  template: require('./home.html'),
  components: {
    DaySelector: DaySelector,
    ProjectList: ProjectList,
    HomeLoader: HomeLoader
  },
  data () {
    return {
      contribs: [],
      hasContribs: false,
      isLoading: false,
      isMobile: BrowserDetector.isMobile,
      isTablet: BrowserDetector.isTablet,
      currentUrl: undefined
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      Api.getContributionsOfDay(~~this.$route.params.day).then((contribs) => {
        this.contribs = contribs;
        this.hasContribs = (this.contribs.length > 0);
        setTimeout(this.hideLoader, 300);
      });
    },

    hideLoader() {
      let tl = new TimelineMax({
        onComplete: () => {
          this.isLoading = false;
        }
      });
      if (this.$refs.loader) tl.to(this.$refs.loader.$el, 0.6, {alpha: 0, ease: Expo.easeOut}, 0);
      if (this.hasContribs && this.$refs.list) {
        tl.fromTo(this.$refs.list.$el, 0.6, {scale: 0.9, transformOrigin: '50% 20%'}, {scale: 1, ease: Expo.easeOut}, 0);
      }
    }
  }
};
