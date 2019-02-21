const vue = new Vue({
  el: 'main',
  data: {
    colors: ['#282a29', '#ec1d25', '#4b6688', '#f1f1f4'],
  },
  methods: {
    async upload(event) {
      const form = new FormData();
      form.append('file', event.target.files[0]);

      const response = await axios.post('/image', form, {
        'Content-Type': 'multipart/form-data',
      });

      this.colors = response.data.data;

      this.recolor();
    },
    recolor() {
      for (let i = 0, l = this.colors.length; i < l; i++) {
        document.documentElement.style.setProperty(`--color${i}`, this.colors[i]);
      }
    },
  },
  mounted() {
    this.recolor();
  },
});
