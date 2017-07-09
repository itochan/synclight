window.onload = function () {
  var config = new Vue({
    el: "#config",
    methods: {
      upload: function () {
        var data = new FormData();
        data.append('name', this.name);
        data.append('file', document.getElementById('file').files[0]);
        axios.put('/config/upload', data, null)
            .then(function (res) {
              alert("success!!");
            })
            .catch(function (err) {
              alert("error!!: " + err);
            });
      }
    }
  });

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
  });

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
  });
}
