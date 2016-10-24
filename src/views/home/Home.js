import DaySelector from 'components/day-selector/DaySelector.js';
import ProjectList from 'components/project-list/ProjectList.js';
import ProjectView from 'components/project-view/ProjectView.js';
import HomeLoader from 'components/home-loader/HomeLoader.js';
import Api from 'lib/Api';
import Mediator from 'lib/Mediator';

export default {
  name: 'Home',
  template: require('./home.html'),
  components: {
    DaySelector: DaySelector,
    ProjectList: ProjectList,
    ProjectView: ProjectView,
    HomeLoader: HomeLoader
  },
  data () {
    return {
      contribs: [],
      hasContribs: false,
      isLoading: false,
      currentUrl: undefined
    };
  },
  created() {
    this.fetchData();
    Mediator.on('project:click', this.onProjectClick);
    Mediator.on('projectview:hide', this.onProjectViewHide);
  },
  mounted() {

  },
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
      tl.to(this.$refs.loader.$el, 0.6, {alpha: 0, ease: Expo.easeOut}, 0);
      if (this.hasContribs) {
        tl.fromTo(this.$refs.list.$el, 0.6, {scale: 0.9, transformOrigin: '50% 20%'}, {scale: 1, ease: Expo.easeOut}, 0);
      }
    },

    onProjectClick(url) {
      this.currentUrl = url;
      this.$refs.iframe.show();
    },

    onProjectViewHide() {
      this.currentUrl = null;
    }
  },

  beforeDestroy() {
    Mediator.off('project:click', this.onProjectClick);
  }
};
