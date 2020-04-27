<template>
  <div>
    <div class="row form ta-center">
      <div class="input-group col-md-3 ">
        <input
          type="text"
          class="form-control inputVille"
          v-model="ville"
          placeholder="Ville"
        />
      </div>
      <button class="btn btn-bleu" @click="getListBar()">Voir la liste</button>

      <button class="btn btn-vert margeGauche " @click="showTheWheel()">
        Voir la roue
      </button>
    </div>
    <div class="info">
      <span
        class="alert alert-info"
        v-if="barlist.length == 0 && afficheErreur == false"
        >Aucun résultat !
      </span>
      <span class="alert alert-danger" role="alert" v-if="afficheErreur == true"
        >Une erreur est survenue</span
      >
    </div>
    <modal v-show="isModalVisible" @close="closeModal" />
    <div id="wheel" class="row">
      <wheel :barlist="barlist" v-if="displayWheel"></wheel>
      <h3  @click="showModal"></h3>
    </div>
    <ol class="hidden" v-if="barlist && mode == 'L'">
      <bar-item
        v-for="item in barlist"
        v-bind:bar="item"
        v-bind:key="item.id"
        @affiche-detail-bar="afficheDetailBar"
      ></bar-item>
    </ol>
  </div>
</template>

<script>
import BarItem from "./BarItem";
import axios from "axios";
import Wheel from "./Wheel.vue";
import Modal from "./Modal.vue";

export const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET;

const categoryIdBar = "4bf58dd8d48988d116941735";

export default {
  data: function() {
    return {
      ville: null,
      displayWheel: false,
      afficheErreur: null,
      barlist: [],
      mode: "R",
      isModalVisible: false,
      urlVenuesSearch: "https://api.foursquare.com/v2/venues/search"
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    afficheDetailBar: function(barItem) {
      this.$emit("affiche-detail-bar", barItem);
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomBar: function() {
      if (this.barlist.length == 0) {
        this.getListBarFromApi()
          .then(
            function(response) {
              this.barlistTmp = response.data.response.venues;
              this.afficheDetailBar(
                this.barlistTmp[
                  this.getRandomInt(0, this.barlistTmp.length - 1)
                ]
              );
            }.bind(this)
          )
          .catch(
            function(err) {
              this.afficheErreur = true;
              console.error(err);
            }.bind(this)
          );
      } else {
        this.afficheDetailBar(
          this.barlist[this.getRandomInt(0, this.barlist.length - 1)]
        );
      }
    },
    showTheWheel() {
      this.getListBarFromApi()
        .then(
          function(response) {
            this.barlist = response.data.response.venues;
            this.afficheErreur = false;
            this.displayWheel = true;
          }.bind(this)
        )
        .catch(
          function() {
            this.afficheErreur = true;
          }.bind(this)
        );
    },
    getListBar() {
      this.getListBarFromApi()
        .then(
          function(response) {
            this.barlist = response.data.response.venues;
            this.afficheErreur = false;
          }.bind(this)
        )
        .catch(
          function() {
            this.afficheErreur = true;
          }.bind(this)
        );
    },
    getListBarFromApi() {
      if (!this.ville) {
        return;
      }
      let aujd = new Date();
      let params = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: aujd.getFullYear() + "" + aujd.getMonth() + 1 + "" + aujd.getDate(),
        near: this.ville + ",FR",
        intent: "browse",
        radius: 1000,
        limit: 1000,
        categoryId: categoryIdBar
      };
      return axios.get(this.urlVenuesSearch, { params: params });
    }
  },
  components: {
    BarItem,
    Wheel,
    Modal
  }
};
</script>

<style>
.form {
  margin-left: 37% !important;
  display: inline-block;
  margin-top: 50px;
}
.inputVille {
  height: 50px !important;
}

.info {
  margin-top: 25px;
  margin-left: 35px;
}
</style>
