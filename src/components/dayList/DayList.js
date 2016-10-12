import DayListManager from 'DayListManager';


export default {
  name: 'DayList',
  template: require('./dayList.html'),
  props: ['day'],
  data () {
    return {
      name: 'DayList',
      liCounter : DayListManager.init(),
      currentDay : DayListManager.init(),
      activeDay : DayListManager.init()
    };
  },
  mounted() {
    console.log('Hello from list');
  },
  methods: {}
};
