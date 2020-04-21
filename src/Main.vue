<template>
  <div id="app">
    <h1 class="title">Random Bar</h1>
    <div class="fond">
      <div style='width:0;height:0'>&nbsp;</div>
      <bar-list
        @affiche-detail-bar="afficheDetailBar"
        v-show="mode === 'L'"
      ></bar-list>
      <bar-detail
        :bar="bar"
        @changeMode="changeMode"
        v-if="mode === 'D'"
      ></bar-detail>
    </div>
    <div class="bottom margeHaut ta-center">
      <h4>Made with     <font-awesome-icon class="pulse red"  icon="heart" /> by <a href="https://github.com/Dinaam" target="blank">Noel</a></h4>
    </div>
  </div>
</template>

<script>
import BarList from "./components/BarList.vue";
import BarDetail from "./components/BarDetail.vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHeart);


export default {
  name: "app",
  data: function() {
    return {
      mode: "L"
    };
  },

  methods: {
    afficheDetailBar: function(barItem) {
      this.changeMode("D");
      console.log("barItem", barItem);
      this.bar = barItem;
    },
    changeMode: function(mode) {
      this.mode = mode;
    }
  },
  components: {
    BarList,
    BarDetail,
    FontAwesomeIcon
  }
};
</script>

<style>
.fond:before
{content: '';position: relative;height: 0px;width: 0px;overflow: hidden;white-space: pre;}

.fond {
  background-color: #F7F9FB;
  margin-left: 10%;
  margin-right: 10%;
  background-attachment: fixed;
  min-height: 800px;
}
.title {
  text-align: center;
  font-size: 60px;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
