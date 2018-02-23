<template>
  <div id="app">
    <router-view/>
    <transition name="fade">
      <loader v-show='isLoading && $route.name == "day"'></loader>
    </transition>
  </div>
</template>

<script>
import loader from './components/loader'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components:{
    loader
  },
  computed:{
    ...mapGetters({
      isLoading: 'getCallStatus'
    })
  }
}
</script>

<style lang="scss">
@import 'styles/main.scss';
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>
