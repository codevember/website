//import DayListManager from 'DayListManager';

export default {
  name: 'DayList',
  template: require('./dayList.html'),
  props: ['day'],
  data () {
    return {
      name: 'DayList'
    };
  },
  mounted() {
    //DayListManager.init();
    console.log('Hello from list');
  },
  methods: {}
};
