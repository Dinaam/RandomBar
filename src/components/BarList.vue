<template>
  <ol>
    <bar-item
      v-for="item in barlist"
      v-bind:bar="item"
      v-bind:key="item.id"
      @affiche-detail-bar="afficheDetailBar"
    ></bar-item>
  </ol>
</template>

<script>
import BarItem from "./BarItem"
export default {
  data: function(){
    return {
        barlist :[
      { id: "0", nom: "Peter Mc'cool",description: "Dolore velit do ut sint ea ex ex id."},
      { id: "1", nom: "La maison Café",description: 'Commodo duis dolor proident laboris aliquip mollit.' },
      { id: "2", nom: "Le mojo",description:'Ea id amet consectetur officia in minim adipisicing officia.' },
      { id: "3", nom: "Le molière",description:'Aliquip irure exercitation minim sint consequat occaecat magna duis non ullamco.'}
    ]
    }
  },
  methods:{
       afficheDetailBar: function(barItem){
           console.log('bar list ',barItem)
          this.$emit('affiche-detail-bar',barItem);
      }
  },
  components:{
      BarItem
  }
};
</script>

<style></style>
