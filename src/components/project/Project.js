import Api from 'Api';

export default {
  name: 'Project',
  template: require('./project.html'),
  props: ['url', 'title', 'author', 'image'],
  data () {
    return {
        contribs: []
    };
  },
  mounted() {
    console.log('Hello from project');
  },
  created() {
    Api.getAllContributions().then((contribs) => { // TODO: Get contribs for given day
      this.contribs = contribs;
    });
  },
  methods: {}
};
