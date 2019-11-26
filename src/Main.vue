<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <bar-list
      @affiche-detail-bar="afficheDetailBar"
      v-if="mode === 'L'"
    ></bar-list>
    <bar-detail :bar="bar" v-if="mode === 'D'"></bar-detail>
  </div>
</template>

<script>
import BarList from "./components/BarList.vue";
import BarDetail from "./components/BarDetail.vue";

export default {
  name: "app",
  data: function() {
    return {
      mode: "L"
    };
  },
  methods: {
    afficheDetailBar: function(barItem) {
      this.mode = "D";
      this.bar = barItem;
    }
  },
  components: {
    BarList,
    BarDetail
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
