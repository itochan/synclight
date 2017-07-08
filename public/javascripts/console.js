var edit = new Vue({
  el: "#edit",
  methods: {
    addItem: function () {
      lists.items.push({
        comment: this.comment,
        color: this.color
      });
    }
  }
})

var lists = new Vue({
  el: '#lists',
  data: {
    items: []
  }
})
