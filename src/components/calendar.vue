<template>
  <div class="home">
    <div class="calendar">
      <div  v-for="day in 30" class="calendar-item" @click="routerAnim(day)">
          <div v-on:mouseover='showPrompt($event,day)'v-on:mouseleave='hidePrompt($event, day)' class="calendar-card">
            <div class="calendar-card-gradient"></div>
            <div class="calendar-card-bg"></div>
            <h2 class="calendar-card-number">
              {{ day < 10 ? 0 + day.toString() : day }}.
            </h2>
          </div>
      </div>
    </div>
    <div class="after-calendar">
      <div class="social">
        <a href="https://twitter.com/codevember_">
         <h4>tw</h4>
        </a>

      </div>
      <div class="year-selector">
        <h4 v-for="year in availableYears" @click="updateYear(year)" :class='{"selected-year": yearSelected == year}'>{{ year }}</h4>
      </div>
    </div>

    <div class="prompt-container prompt" v-for="prompt in prompts" >
      <h2 >{{prompt}}</h2>
    </div>
  </div>
</template>

<script>
import { Power2, TimelineMax } from 'gsap/all'
import { mapGetters } from 'vuex'
import prompts from '../lib/prompts.js'
import {getCurrentYear} from '../lib/utils.js'

export default {
  name: 'home',
  data () {
    return {
      prompts: [],
      promptsEl: [],
      availableYears: [],
      calendarLines: [],
      itemsPerLine: 0
    }
  },
  computed:{
    ...mapGetters({
      yearSelected: 'getYear'
    })
  },
  mounted() {
    let years = []
    for (let y in prompts) {
      if (y > getCurrentYear()) continue

      years.push(y)
    }
    years.sort((a, b) => a < b)

    this.availableYears = years
    this.definePrompts()
    this.onResize()

    window.addEventListener('resize', this.onResize)
  },
  methods:{
    routerAnim(day){
      let formatDay = day < 10 ? 0 + day.toString() : day
      this.$store.dispatch('getContributionsOfDay', {
        year: this.yearSelected,
        day: day
      })
      this.animOut(() => {
        this.$router.push({ name: 'day', params: { day: formatDay, year: this.yearSelected }})
      })
    },

    onResize () {
      let calendar = this.$el.querySelector('.calendar')
      let items = this.$el.querySelectorAll('.calendar-item')
      let itemsPerLine = Math.floor(calendar.offsetWidth / items[0].offsetWidth)

      if (itemsPerLine === this.itemsPerLine) return

      this.itemsPerLine = itemsPerLine

      let nbLines = Math.ceil(items.length / itemsPerLine)

      this.calendarLines = []

      let curr = 0
      for (let l = 0; l < nbLines; l++) {
        this.calendarLines[l] = []

        for (var i = 0; i < itemsPerLine; i++) {
          this.calendarLines[l].push(items[curr])
          curr++
        }
      }
    },

    definePrompts () {
      this.prompts = prompts[this.yearSelected]
      this.$nextTick(() => {
        this.promptsEl = this.$el.querySelectorAll('.prompt')
      })
    },

    updateYear(year){
      this.animOut(() => {
        this.$store.commit('updateYear', year)
        this.definePrompts()
        this.animIn()
      })
    },

    animIn() {
      let tl = new TimelineMax()
      tl.staggerTo(this.calendarLines, 0.6, {y: 0, alpha: 1, ease: Power2.easeOut}, -0.08, 0.2)
    },

    animOut(cb) {
      let tl = new TimelineMax()
      tl.staggerTo(this.calendarLines, 0.6, {y: -50, alpha: 0, ease: Power2.easeOut}, 0.08, 0)
      tl.to(this.promptsEl, 0.4, {alpha: 0, ease: Power2.easeOut}, 0)
      if (cb) {
        tl.add(cb, 0.8)
      }
    },

    showPrompt(self, day){
      if (!this.promptsEl[day - 1]) return

      this.promptsEl[day - 1].classList.add('fadeIn')
    },

    hidePrompt(self, day){
      if (!this.promptsEl[day - 1]) return

      this.promptsEl[day - 1].classList.remove('fadeIn')
    }
  }
}
</script>

<style lang="scss">
@import "../styles/calendar";
</style>
