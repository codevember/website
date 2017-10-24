<template lang="html">
  <div class="home">
    <HeaderApp></HeaderApp>
    <calendar></calendar>
    <FooterApp></FooterApp>
  </div>
</template>

<script>
import Calendar from '@/components/calendar'
import HeaderApp from '@/components/header'
import FooterApp from '@/components/footer'

export default {
  name:'home',
  components:{
    HeaderApp,
    Calendar,
    FooterApp
  }
}
</script>

<style lang="css">
</style>
