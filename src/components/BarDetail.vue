<template>
  <div class="bar global">
    <h1 class="barName ta-center">{{ bar.name }}</h1>
    <h6 class="rating ta-center bold">Note : {{ barDetail.rating }} / 10</h6>
    <div class="row"></div>
    <span class="ta-center"
      ><a @click="retourListe">Retour à la liste </a></span
    >
  </div>
</template>

<script>
import axios from "axios";
import { CLIENT_ID } from "./BarList.vue";
import { CLIENT_SECRET } from "./BarList.vue";

export default {
  data: function() {
    return {
      barDetail: {},
      urlVenueDetail: "https://api.foursquare.com/v2/venues/"
    };
  },
  props: ["bar"],
  created: function() {
    this.getDetailFromApi();
  },
  methods: {
    retourListe: function() {
      this.$emit("changeMode", "L");
    },
    getDetailFromApi: function() {
      let aujd = new Date();
      let params = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: aujd.getFullYear() + "" + aujd.getMonth() + 1 + "" + aujd.getDate()
      };
      if (localStorage[this.bar.id]) {
        this.barDetail = JSON.parse(localStorage.getItem(this.bar.id));
        console.log('this.barDetail',this.barDetail);
        return;
      }
      axios.get(this.urlVenueDetail + this.bar.id, { params: params }).then(
        function(response) {
          this.barDetail = response.data.response.venue;
          localStorage.setItem(this.bar.id, JSON.stringify(this.barDetail));
        }.bind(this)
      );
    }
  }
};
</script>

<style>
.global {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.bold {
  font-weight: bold;
}
.bar {
  margin-left: 25px;
}
.ta-center {
  display: block;
  text-align: center;
}
</style>
