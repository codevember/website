export default {
  name: 'Project',
  template: require('./project.html'),
  props: ['url', 'title', 'author', 'image'],
  data () {
    return {};
  },
  mounted() {
    console.log('Hello from project');
  },
  methods: {}
};
