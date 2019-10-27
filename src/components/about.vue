<template lang="html">
  <div class="about">
    <router-link to="home" class="about-back">back</router-link>
    <div class="about-content">
      <h2>What is Codevember?</h2>
      <p>Codevember is a challenge for developers to sharpen their creativity and improve their skills. The goal is to build a creative piece of code every day of November. We give you daily hints to inspire you but you can do unrelated sketches.</p>

      <h2>How participate?</h2>
      <p>Open your favourite code editor and let your imagination flows!</p>

      <h2>Want to see you work on the website?</h2>
      <p>For <a  target="_blank" href="https://codepen.io/">CodePen</a> and <a href="https://codier.io/" target="_blank">Codier</a> users, title your creation with #codevember and the number of the day (eg: <i>#codevember - 12 - My awesome work</i>). Then our bot will automatically add your sketch on the website.</p>
      <p>Otherwise, send us your creation with the form below:</p>
      <form enctype="multipart/form-data" class="about-form" @submit="onSubmit" v-if="isFormAvailable">
        <input type="text" name="author" v-model="author" placeholder="Your name">
        <input type="text" name="title" v-model="title" placeholder="Creation title">
        <input type="text" name="url" v-model="url" placeholder="Creation URL">
        <select name="day" v-model="day">
          <option v-for="n in 30" :value="n">Day {{ n }}</option>
        </select>
        <label for="cover">Image of your creation (optional)</label>
        <input type="file" id="cover" accept="image/png, image/jpeg, image/jpg" @change="onCoverChange">
        <button type="submit" v-if="sent == false">Send</button>
        <p>{{ message }}</p>
      </form>
      <p v-else><i>The form will be availble on November, 1st...</i></p>
    </div>
  </div>
</template>

<script>
import { isCodevemberMonth } from '../lib/utils'

const today = new Date()

export default {
  name: 'about',
  data () {
    return {
      isFormAvailable: isCodevemberMonth(),
      sent: false,
      message: '',
      author: '',
      title: '',
      url: '',
      day: today.getDate(),
      cover: ''
    }
  },
  methods: {
    validateForm () {
      this.message = ''

      if (this.author === '') {
        this.message = 'Please fill the author field';
        return false;
      }

      if (this.title === '') {
        this.message = 'Please fill the title field';
        return false;
      }

      if (this.url === '') {
        this.message = 'Please fill the URL field';
        return false;
      }

      return true;
    },

    onCoverChange (evt) {
      if (!evt.target.files[0]) return

      this.cover = evt.target.files[0]
    },

    onSubmit (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      const isValid = this.validateForm();

      if (!isValid) return false

      const data = new FormData()
      data.append('author', this.author.trim())
      data.append('title', this.title.trim())
      data.append('url', this.url.trim())
      data.append('day', parseInt(this.day, 10))
      data.append('year', today.getFullYear())
      data.append('cover', this.cover)

      window.fetch(`${window.location.origin}/static/send-mail.php`, {
        method: 'post',
        body: data
      })
      .then(res => res.json())
      .then((response) => {
        if (!response.sent) {
          this.message = 'An error occured. Please try again later.'
          console.error(response.error);
          return
        }

        this.message = 'Your submission has been sent!'
        this.sent = true
      })

      return false;
    }
  }
}
</script>

<style lang="scss">
  @import "../styles/about";
</style>
