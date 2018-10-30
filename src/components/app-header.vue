<template lang="html">
  <div class="header">
    <h1 class="text-logo">#Codevember</h1>
    <router-link to="about" class="header-about">About</router-link>
  </div>
</template>

<script>
export default {
  name:'app-header',
  data () {
    return {
      logo: require('../assets/images/logo.png')
    }
  }
}
</script>

<style lang="scss">
  @import "../styles/header";
</style>
