import Api from 'Api';

export default {
  name: 'Admin',
  template: require('./admin.html'),
  data() {
    return {
      author: '',
      title: '',
      url: '',
      image: '',
      day: '',
      saved: false,
      error: ''
    };
  },
  methods: {
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
        day: ~~this.day
      }).then(() => {
        this.saved = true;
      });
    },

    onNewClick() {
      this.saved = false;
    }
  }
};
