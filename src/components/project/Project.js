export default {
  name: 'Project',
  template: require('./project.html'),
  props: ['projectTitle','projectUser','projectImg'],
  data () {
    return {
      name: 'Project'
    };
  },
  mounted() {
    console.log('Hello from project');
  },
  methods: {}
};
