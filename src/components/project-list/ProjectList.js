import Project from 'components/project/Project';

export default {
  name: 'ProjectList',
  template: require('./project-list.html'),
  props: ['contribs'],
  components: {
    project: Project
  },
  data () {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
