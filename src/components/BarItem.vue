<template>
  <div class="barItem">
    <h3 class="barName">{{ bar.name }}</h3>
    {{ bar.location.address }} <br />
    <a v-on:click="clickHandler(bar)">Voir plus</a>
  </div>
</template>

<script>
export default {
  props: ["bar"],
  methods: {
    clickHandler: function(bar) {
      this.$emit("affiche-detail-bar", bar);
    }
  }
};
</script>

<style>
a {
  color: #2980b9;
  text-decoration: underline !important;
}
a:hover {
  cursor: pointer;
}
.barName {
  color: #2980b9;
}

.barItem {
  margin-bottom: 40px;
}
</style>
