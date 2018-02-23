<template lang="html">
  <div class="home-loader">
    <div class="home-loader-points">
      <div class="Point-loader" v-for="i in 4" :style="{ animationDelay: i * 0.2 + 's', background:colors[i-1]}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'loader',
  data() {
    return {
      colors: ['#005872' ,'#4d9aa9' ,'#0e7286' ,'#002029']
    }
  }
}
/*

      animation-delay: $i*0.2s;
      background: $colors_Load[$i - 1]; */
</script>

<style lang="scss">
$colors_Load: #005872 ,#4d9aa9 ,#0e7286 ,#002029 ;

.home-loader{
  pointer-events: none;
  position: fixed;
  top: 0px;
  left: 0;
  width:100vw;
  height:100vh;
  background: rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index :1;
  & .points{
      height: 30px;
  }
}

.Point-loader{
  width: 15px;
  height: 15px;
  background: grey;
  border-radius: 10px;
  margin: 5px;
  float: left;
  animation:Bounce ease-in-out infinite alternate both .4s;
}

@keyframes Bounce {
  from{
     transform :translateY(0px);
  }
  to{
     transform :translateY(10px);
  }
}

</style>
