<template lang="html">
  <div class="home">
    <AppHeader></AppHeader>
    <calendar></calendar>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Calendar from '@/components/calendar'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'

export default {
  name:'home',
  components:{
    AppHeader,
    Calendar,
    AppFooter
  }
}
</script>

<style lang="css">
</style>
