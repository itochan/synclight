window.onload = function () {
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
    },
    methods: {
      updateColor: function (color) {
        axios.post('/color/update', { color: color })
        .then(function (response) {
          this.status = "success";
        })
        .catch(function (error) {
          this.status = "fail!";
        });
      }
    }
  })
}
