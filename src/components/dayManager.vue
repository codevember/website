<template lang="html">
  <div class="dayManager">
    <div class="day-header">
      <router-link :to="{name:'home'}">
        <h2 class="back-button">back</h2>
      </router-link>
      <h1>Day #{{$route.params.day}} <span v-if="prompt">- {{ prompt }}</span></h1>
    </div>

    <div class="project-container">
      <div class="project-cards" v-for="project in projects">
        <a :href="project.url">
          <div class="project-image" :style="'background-image: url(' + project.image + '); border-color: '+ colors[Math.floor(Math.random() * colors.length)]"></div>
          <div class="project-title">
            <h2>{{ project.title }}</h2>
            <h4>@{{ project.author }}</h4>
          </div>
        </a>
      </div>

      <div v-if="projects.length == 0 && !this.isLoading" class="no-project">
        <h2>There is no project for this day 😿</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import prompts from '../lib/prompts.js'

export default {
  name:'projectManager',
  computed: {
    ...mapGetters({
      projects: 'getContribs',
      isLoading: 'getCallStatus'
    })
  },
  data () {
    return {
      prompt: '',
      colors: ['#005872' ,'#4d9aa9' ,'#0e7286' ,'#002029']
    }
  },
  mounted () {
    this.prompt = prompts[this.$route.params.year][parseInt(this.$route.params.day) - 1]

    this.$nextTick(() => {
      if (!this.isLoading && this.projects.length == 0) {
        this.$store.dispatch('getContributionsOfDay', {
          year: this.$route.params.year,
          day: parseInt(this.$route.params.day)
        })
      }
    })
  }
}
 </script>

 <style lang="scss">
 @import "../styles/project";
 </style>
