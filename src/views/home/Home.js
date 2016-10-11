import List from '../../components/list/List.js'
import Proj from '../../components/project/Project.js'
import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyBsMjMcz4qhy8GtWeHQAq1S2oiO2HXYGb8",
  authDomain: "codevembertest.firebaseapp.com",
  databaseURL: "https://codevembertest.firebaseio.com",
  storageBucket: "codevembertest.appspot.com",
  messagingSenderId: "668336650459"
};
firebase.initializeApp(config)

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
    let database = firebase.database().ref().child('projects');
    database.on('value',function( snap ){
      console.log(snap.val())
    });

  },
  ready(){

 },
  methods: {}
};
