<template lang="html">
  <div class="about">
    <router-link to="home" class="about-back">back</router-link>
    <div class="about-content">
      <h2>What is Codevember?</h2>
      <p>Codevember is a challenge for developpers to sharpen their creativity and improve their skills. The goal is to build a creative piece of code every day of November. We give you daily hints to inspire you but you can do unrelated sketches.</p>

      <h2>How participate?</h2>
      <p>Open your favourite code editor and let your imagination flows!</p>

      <h2>Want to see you work on the website?</h2>
      <p>For <a  target="_blank" href="https://codepen.io/">CodePen</a> and <a href="https://codier.io/" target="_blank">Codier</a> users, title your creation with #codevember and the number of the day (eg: #codevember - 12 - My awesome work). Then our bot will automatically add your sketch on the website.</p>
      <p>Otherwise, you can complete the form below:</p>
      <form class="about-form" @submit="onSubmit">
        <input type="text" name="author" v-model="author" placeholder="Your name">
        <input type="text" name="title" v-model="title" placeholder="Title">
        <input type="text" name="url" v-model="url" placeholder="URL">
        <select name="day" v-model="day">
          <option v-for="n in 30" :value="n">Day {{ n }}</option>
        </select>
        <button type="submit">Send</button>
        <p>{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
const today = new Date()

export default {
  name: 'about',
  data () {
    return {
      error: '',
      author: '',
      title: '',
      url: '',
      day: today.getDate()
    }
  },
  methods: {
    validateForm () {
      this.error = ''

      if (this.author === '') {
        this.error = 'Please fill the author field';
        return false;
      }

      if (this.title === '') {
        this.error = 'Please fill the title field';
        return false;
      }

      if (this.url === '') {
        this.error = 'Please fill the URL field';
        return false;
      }

      return true;
    },

    onSubmit (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      const isValid = this.validateForm();

      if (!isValid) return false

      const data = {
        author: this.author,
        title: this.title,
        url: this.url,
        image: '',
        year: today.getFullYear(),
        day: parseInt(this.day, 10)
      }

      console.log('SAVE', data)

      return false;
    }
  }
}
</script>

<style lang="scss">
  @import "../styles/about";
</style>
