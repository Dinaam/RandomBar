<template>
  <ol v-if="barlist">
    <bar-item
      v-for="item in barlist"
      v-bind:bar="item"
      v-bind:key="item.id"
      @affiche-detail-bar="afficheDetailBar"
    ></bar-item>
  </ol>
</template>

<script>
import BarItem from "./BarItem";
import axios from "axios";

export const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET;

const categoryIdBar = "4bf58dd8d48988d116941735";

export default {
  data: function() {
    return {
      barlist:[],
      //     barlist :[
      //   { id: "0", nom: "Peter Mc'cool",description: "Dolore velit do ut sint ea ex ex id."},
      //   { id: "1", nom: "La maison Café",description: 'Commodo duis dolor proident laboris aliquip mollit.' },
      //   { id: "2", nom: "Le mojo",description:'Ea id amet consectetur officia in minim adipisicing officia.' },
      //   { id: "3", nom: "Le molière",description:'Aliquip irure exercitation minim sint consequat occaecat magna duis non ullamco.'}
      // ],
      urlVenuesSearch: "https://api.foursquare.com/v2/venues/search"
    };
  },
  created: function() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error('no_credential');
      return;
    }
    this.getListBarFromApi();
  },
  methods: {
    afficheDetailBar: function(barItem) {
      this.$emit("affiche-detail-bar", barItem);
    },
    getListBarFromApi() {
      let aujd = new Date();
      let params = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: aujd.getFullYear() + "" + aujd.getMonth() + 1 + "" + aujd.getDate(),
        near: "Nantes",
        intent: "browse",
        radius: 10000,
        limit: 1000,
        categoryId: categoryIdBar
      };
      axios
        .get(this.urlVenuesSearch, { params: params })
        .then(response => (this.barlist = response.data.response.venues))
          
        
    }
  },
  components: {
    BarItem
  }
};
</script>

<style></style>
