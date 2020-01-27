<template>
  <div class="bar global">
    <h1 class="barName ta-center">{{ bar.name }}</h1>
    <h6 class="rating ta-center bold">Note : {{ barDetail.rating }} / 10</h6>
    <div class="row"></div>
    <div ng-if="photos.count >0"  >
      <img  v-for="photo in photos.items"
        v-bind:photo="photo"
        v-bind:key="photo.id" :src="getSrc(photo)">
    </div>
    <span class="ta-center"
      ><a @click="retourListe">Retour à la liste </a></span
    >
  </div>
</template>

<script>
import axios from "axios";


export default {
  data: function() {
    return {
      barDetail: {},
      photos:[],
      urlVenueDetail: "https://api.foursquare.com/v2/venues/",
    };
  },
  props: ["bar"],
  created: function() {
    this.getDetailFromApi();
    this.getPhotosFromApi();
  },
  methods: {
    retourListe: function() {
      this.$emit("changeMode", "L");
    },
    getPhotosFromApi: function() {
      let params = this.getAuthParams();
      params.limit = 200;
      if (localStorage[this.bar.id+'/photos']) {
        this.photos = JSON.parse(localStorage.getItem(this.bar.id+'/photos'));
        return;
      }
      axios.get(this.urlVenueDetail + this.bar.id +'/photos', { params: params }).then(
        function(response) {
          this.photos = response.data.response.photos;
          localStorage.setItem(this.bar.id+'/photos', JSON.stringify(this.photos));
        }.bind(this)
      );
    },
    getSrc: function(photo){
      return photo.prefix+photo.height + 'x' + photo.width  + photo.suffix;
    },
    getDetailFromApi: function() {
      let params = this.getAuthParams();
      if (localStorage[this.bar.id]) {
        this.barDetail = JSON.parse(localStorage.getItem(this.bar.id));
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
img {
  width: 450px;
	max-width: 100%;
	height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
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
