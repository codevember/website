import DayList from 'components/dayList/DayList.js';
import Proj from 'components/project/Project.js';
import Api from 'Api';

export default {
  name: 'Home',
  template: require('./home.html'),
  components: {
    'DayList': DayList,
    'Project': Proj
  },
  data () {
    return {
      contribs: []
    };
  },
  created() {
    Api.getAllContributions((contribs) => { // TODO: Get contribs for given day
      this.contribs = contribs;
    });
  },
  mounted() {},
  methods: {}
};
