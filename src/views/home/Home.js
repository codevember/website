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
    
    };
  },
  mounted() {},
  methods: {}
};
