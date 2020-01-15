<template>
  <div id="app">
    <nav-bar></nav-bar>
    <bar-list
      @affiche-detail-bar="afficheDetailBar"
      v-show="mode === 'L'"
    ></bar-list>
    <bar-detail :bar="bar" @changeMode="changeMode" v-if="mode === 'D'"></bar-detail>
  </div>
</template>

<script>
import BarList from "./components/BarList.vue";
import BarDetail from "./components/BarDetail.vue";
import NavBar from "./components/NavBar.vue";


export default {
  name: "app",
  data: function() {
    return {
      mode: "L"
    };
  },

  methods: {
    afficheDetailBar: function(barItem) {
      this.changeMode('D');
      this.bar = barItem;
    },
    changeMode: function(mode){
      this.mode = mode;
    },
    
    
  },
  components: {
    BarList,
    BarDetail,
    NavBar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@import'~bootstrap/dist/css/bootstrap.css'
</style>
