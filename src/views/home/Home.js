import DaySelector from 'components/day-selector/DaySelector.js';
import ProjectList from 'components/project-list/ProjectList.js';
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
      contribs: []
    };
  },
  created() {
    console.log('Loading data for day #', this.$route.params.day);
    Api.getAllContributions().then((contribs) => { // TODO: Get contribs for given day
      this.contribs = contribs;
    });
  },
  mounted() {},
  methods: {}
};
