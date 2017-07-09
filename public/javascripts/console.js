window.onload = function () {
  var status = new Vue({
    el: '#status',
    data: {
      status: {
        connection: 0
      }
    },
    methods: {
      refresh: function () {
        var self = this;
        setInterval(function () {
          axios.get('/console/status')
          .then(function (res) {
            self.status = res.data;
          })
          .catch(function (err) {
            console.log("fail!");
          });

        }, 1000);
      }
    }
  });
  status.refresh();

  var config = new Vue({
    el: "#config",
    data: {
      selected: "",
      items: ["hamori.json"]
    },
    methods: {
      upload: function () {
        var data = new FormData();
        data.append('name', this.name);
        data.append('file', document.getElementById('file').files[0]);
        axios.put('/config/upload', data, null)
            .then(function (res) {
              alert("success!!");
              location.reload();
            })
            .catch(function (err) {
              alert("error!!: " + err);
            });
      },
      loadConfig: function (item) {
        axios.get('/config/load/' + item)
        .then(function (res) {
          lists.items = res.data;
        })
        .catch(function (err) {
          alert("fail!");
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

  axios.get('/config/list')
  .then(function (res) {
    config.items = res.data;
  })
  .catch(function (err) {
    alert("fail!");
  });
}
