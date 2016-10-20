import Mediator from 'lib/Mediator';

export default {
  name: 'ProjectView',
  template: require('./project-view.html'),
  props: ['url'],
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    hide() {
      Mediator.emit('projectview:hide');
      this.isVisible = false;
    }
  }
};
