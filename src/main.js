import Vue from "vue";
import Main from "./Main.vue";
import "bootstrap";
import { CLIENT_ID } from "./components/BarList.vue";
import { CLIENT_SECRET } from "./components/BarList.vue";


Vue.config.productionTip = false;

new Vue({
  render: h => h(Main)
}).$mount("#app");

Vue.mixin({
  methods: {
    getAuthParams: function(){
      let aujd = new Date();
      return {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: aujd.getFullYear() + "" + aujd.getMonth() + 1 + "" + aujd.getDate()
      };
    }
  }
});