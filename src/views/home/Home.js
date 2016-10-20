import DaySelector from 'components/day-selector/DaySelector.js';
import ProjectList from 'components/project-list/ProjectList.js';
import ProjectView from 'components/project-view/ProjectView.js';
import HomeMenu from 'components/home-menu/HomeMenu.js';
import HomeLoader from 'components/home-loader/HomeLoader.js';
import TweenLite from  "gsap";
import Api from 'Api';

export default {
  name: 'Home',
  template: require('./home.html'),
  components: {
    DaySelector: DaySelector,
    ProjectList: ProjectList,
    ProjectView: ProjectView,
    HomeMenu : HomeMenu,
    HomeLoader: HomeLoader
  },
  data () {
    return {
      contribs: [],
      hasContribs: false,
      isLoading: false,
      isProjectView : false
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {

  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      console.log(this.$route);
      console.log('Loading data for day #' + this.$route.params.day);
      Api.getContributionsOfDay(~~this.$route.params.day).then((contribs) => {
        this.contribs = contribs;
        this.hasContribs = (this.contribs.length > 0);
        setTimeout(()=> { this.isLoading = false;}, 300)
      })
    }
  }
};
