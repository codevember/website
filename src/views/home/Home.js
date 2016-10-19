import DaySelector from 'components/day-selector/DaySelector.js';
import ProjectList from 'components/project-list/ProjectList.js';
import TweenLite from  "gsap";
import Api from 'Api';

export default {
  name: 'Home',
  template: require('./home.html'),
  components: {
    DaySelector: DaySelector,
    ProjectList: ProjectList
  },
  data () {
    return {
      contribs: [],
      hasContribs: false,
      isLoading: false
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
      console.log('Loading data for day #' + this.$route.params.day);
      Api.getContributionsOfDay(~~this.$route.params.day).then((contribs) => {
        this.contribs = contribs;
        this.hasContribs = (this.contribs.length > 0);
        TweenLite.to(this.$refs.loader , 0.5, {
         opacity: 0,
         onComplete: () => { this.isLoading = false; }
        })
      })
    }
  }
};
