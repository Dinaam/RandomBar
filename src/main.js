import Vue from "vue";
import Main from "./Main.vue";
import "bootstrap";
import { CLIENT_ID } from "./components/BarList.vue";
import { CLIENT_SECRET } from "./components/BarList.vue";
import "@/assets/css/main.css";
import "@/assets/css/pulse.css";

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    getAuthParams: function() {
      // let aujd = new Date();
      return {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: 20200712
      };
    }
  }
});

new Vue({
  render: h => h(Main)
}).$mount("#app");
