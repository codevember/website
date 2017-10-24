<template>
  <div class="home">
    <div class="calendar">
      <div  v-for="day in 30"class="calendar-card" @click="routerAnim(day)">
          <div v-on:mouseover='showPrompt(day)'v-on:mouseleave='hidePrompt(day)' class="calendar-number">
            <h2>
              {{ day < 10 ? 0 + day.toString() : day }}.
            </h2>
          </div>
      </div>
    </div>
    <div  class="prompt-container prompt" v-for="prompt in prompts" >
      <h2   >{{prompt}}</h2>
    </div>
    <div class="year-selector">
      <h4 @click="updateYear(2017)" :class='{"selected-year": yearSelected == 2017}'>2017</h4>
      <h4 @click="updateYear(2016)" :class='{"selected-year": yearSelected == 2016}'>2016</h4>
    </div>
  </div>
</template>

<script>
//:class="{fadeIn: false}"
import { TweenMax } from 'gsap'
import { mapGetters } from 'vuex'
import prompts from '../lib/prompts.js'
export default {
  name: 'home',
  data () {
    return {
      windowResizeRate: 200,
      timeoutResize :{},
      layout:[{
        columns:0,
        elements:[]
      }],
      prompts,
      promptsEl:[]
    }
  },
  computed:{
    ...mapGetters({
      yearSelected: 'getYear'
    })
  },
  mounted(){
    this.$nextTick(()=>{
      this.buildLayout()
      this.buildPromptsEl()
      this.addEvent(window, 'resize', () => {
        clearTimeout(this.timeoutResize)
        this.timeoutResize = setTimeout(this.buildLayout(), this.windowResizeRate)
      })
    })
  },
  methods:{
    buildLayout(){
      this.layout = [{
        columns:0,
        elements:[]
      }]
      let tmpLayout = this.$el.querySelectorAll('.calendar-card')
      let columnsId = 0
      tmpLayout.length > 0 && this.layout[columnsId].elements.push(tmpLayout[0])
      for (var i = 1; i < tmpLayout.length; i++) {
        if(tmpLayout[i].getBoundingClientRect().top != tmpLayout[i-1].getBoundingClientRect().top){
          columnsId++
          this.layout.push({
            columns:columnsId,
            elements:[]
          })
        }
       this.layout[columnsId].elements.push(tmpLayout[i])
      }
    },
    buildPromptsEl(){
      this.promptsEl = this.$el.querySelectorAll('.prompt')
    },
    routerAnim(day){
      let formatDay = day < 10 ? 0 + day.toString() : day
      this.$store.dispatch('getContributionsOfDay', {
        year: this.yearSelected,
        day: day
      })
      this.animOut(()=>{
        this.$router.push({ name: 'day', params: { day: formatDay }})
      })
      //
    },
    updateYear(year){
      this.$store.commit('updateYear', year)
    },
    animOut(cb){
      var loop = 0
      for (var i = 0; i < this.layout.length; i++) {
        TweenMax.staggerFromTo(this.layout[i].elements, 0.7, {opacity:1}, {opacity:0}, 0.08, ()=> {
          loop++
          if(loop == this.layout.length - 1) cb()
        });
      }
    },
    showPrompt(day){
      let eltest = this.promptsEl
      this.promptsEl[day - 1].classList.add('fadeIn')
    },
    hidePrompt(day){
      this.promptsEl[day - 1].classList.remove('fadeIn')
    },
    addEvent (obj, type, fn) {
      if (obj.addEventListener) {
        obj.addEventListener(type, fn, false)
      } else if (obj.attachEvent) {
        obj.attachEvent('on' + type, () => {
          return fn.call(obj, window.event)
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "../styles/calendar";
</style>
