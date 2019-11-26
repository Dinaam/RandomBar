<template>
  
  <span> <h3 class="barName">{{bar.nom}}</h3>
   {{bar.description}} <br>
    <a v-on:click="clickHandler(bar)">Voir plus</a></span>
</template>

<script>


export default {
    props: ["bar"],
    methods:{
        clickHandler:function(bar){
            console.log('bar item : ',bar)
            this.$emit('affiche-detail-bar',bar);
        }
    }
    
};
</script>

<style>
    a{
        color: #2980b9;
        
    }
    a:hover{
        cursor: pointer;
    }
    .barName{
        color: #2ecc71;
    }
</style>
