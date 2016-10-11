import List from 'components/list/List.js';
import Proj from 'components/project/Project.js';
import Api from 'Api';

export default {
  name: 'Home',
  template: require('./home.html'),
  components: {
    'List': List,
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
