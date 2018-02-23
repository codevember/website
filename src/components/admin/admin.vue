<template lang="html">
  <div class="Admin">
    <div class="Admin-content">
      <h1>New contribution</h1>
      <div v-if="!saved">
        <input type="text" name="author" v-model="author" placeholder="Author">
        <input type="text" name="title" v-model="title" placeholder="Title">
        <input type="text" name="url" v-model="url" placeholder="URL">
        <input type="text" name="image" v-model="image" placeholder="Image">
        <label for="day">Day</label>
        <select name="day" v-model="day">
          <option v-for="n in 30">{{ n }}</option>
        </select>
        <label for="year">Year</label>
        <select name="year" v-model="year">
          <option v-for="y in availableYears">{{ y }}</option>
        </select>
        <button type="button" @click="onSubmit">Save</button>
        <p>
          {{ error }}
        </p>
      </div>
      <div v-else>
        Contribution saved!<br>
        <button type="button" @click="onNewClick">New</button>
      </div>
    </div>
  </div>
</template>

<script>
import Api from 'backend-api/dist/browser.js';
import * as Codepen from '../../lib/codepen-parser'

const today = new Date()

export default {
  name: 'Admin',
  data() {
    return {
      availableYears: [2015, 2016, 2017, 2018, 2019, 2020],
      author: '',
      title: '',
      url: '',
      image: '',
      day: today.getDate(),
      year: today.getFullYear(),
      saved: false,
      error: ''
    };
  },
  watch: {
    url() {
      if (Codepen.isCodepenUrl(this.url)) {
        this.getCodepenData()
      }
    }
  },
  methods: {
    getCodepenData () {
      let data = Codepen.getPenDataFromUrl(this.url)
      this.author = data.user
      this.image = data.image
    },

    onSubmit() {
      if (this.author === '') {
        this.error = 'Please fill author field';
        return;
      }

      if (this.title === '') {
        this.error = 'Please fill title field';
        return;
      }

      if (this.url === '') {
        this.error = 'Please fill url field';
        return;
      }

      if (this.image === '') {
        this.error = 'Please fill image field';
        return;
      }

      if (!this.day || this.day === '') {
        this.error = 'Please fill day field';
        return;
      }

      Api.saveContribution({
        author: this.author,
        title: this.title,
        url: this.url,
        image: this.image,
        year: ~~this.year,
        day: ~~this.day
      }).then(() => {
        this.saved = true;
      });
    },

    onNewClick() {
      this.author = '';
      this.title = '';
      this.url = '';
      this.image = '';
      this.day = today.getDate()
      this.year = today.getFullYear()
      this.saved = false;
    }
  }
};
</script>

<style lang="scss">
  @import "../../styles/admin";
</style>
