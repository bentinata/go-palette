const vue = new Vue({
  el: 'main',
  data: {
    file: null,
    colors: ['#463758ff', '#755355ff', '#88788bff', '#edd5c1ff'],
  },
  methods: {
    async upload(event) {
      const form = new FormData();
      form.append('file', event.target.files[0]);

      const response = await axios.post('/image', form, {
        'Content-Type': 'multipart/form-data',
      });

      this.colors = response.data.data;
    },
  },
  async mounted() {
  },
});
