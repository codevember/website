import List from '../../components/list/List.js'
import Proj from '../../components/project/Project.js'
export default {
  name: 'Home',
  template: require('./home.html'),
  components: {
    'List' : List,
    'Project' : Proj
  },
  data () {
    return {
      name: 'World'
    };
  },
  mounted() {
    console.log('Hello from home');
  },
  methods: {}
};
