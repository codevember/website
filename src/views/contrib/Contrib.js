import Api from 'lib/Api';

export default {
  name: 'Contrib',
  template: require('./contrib.html'),
  data() {
    return {
      contrib: {}
    };
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {
    this.contrib = null;
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      Api.getContributionBySlug(this.$route.params.slug).then((data) => {
        this.contrib = data;
      });
    }
  }
};
