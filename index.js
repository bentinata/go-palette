const vue = new Vue({
  el: 'main',
  data: {
    colors: ['#282a29ff', '#ec1d25ff', '#4b6688ff', '#f1f1f4ff'],
  },
  render(createElement) {
    return createElement('main', [
      createElement('form', [
        createElement('input', {
          attrs: {
            id: 'file',
            name: 'file',
            type: 'file',
            accept: 'image/jpeg,image/png',
          },
          on: { change: this.upload },
        }),
        createElement('label', { attrs: {for: 'file'}}, [
          createElement('strong', 'Choose a file'),
          createElement('span', { staticClass: 'dragndrop' }, ' or drag it here'),
          '.',
        ]),
      ]),
      createElement('li', this.colors.map(color => createElement('ul', {
        style: { background: color },
      }, color))),
    ]);
  },
  methods: {
    async upload(event) {
      const form = new FormData();
      form.append('file', event.target.files[0]);

      const response = await axios.post('image', form, {
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