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
      
      <button class="btn btn-vert margeGauche " @click="getRandomBar()">
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
    <div id="wheel"></div>
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
import * as d3 from "d3";

export const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET;

const categoryIdBar = "4bf58dd8d48988d116941735";

export default {
  data: function() {
    return {
      ville: null,
      afficheErreur: null,
      barlist: [],
      mode:'R',
      urlVenuesSearch: "https://api.foursquare.com/v2/venues/search"
    };
  },
  methods: {
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
      //TODO Refactor d3 functions
      var data = this.barlist;
      var padding = { top: -50, right: 80, bottom: 20, left: 20 },
        w = 800 - padding.left - padding.right,
        h = 800 - padding.top - padding.bottom,
        r = Math.min(w, h) / 2,
        rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = [],
        color = d3.scaleOrdinal(d3.schemeSet3);
      var svg = d3
        .select("#wheel")
        .append("svg")
        .data([data])
        .attr("width", w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom);
      var container = svg
        .append("g")
        .attr("class", "chartholder")
        .attr(
          "transform",
          "translate(" +
            (w / 2 + padding.left) +
            "," +
            (h / 2 + padding.top) +
            ")"
        );
      var vis = container.append("g");

      var pie = d3
        .pie()
        .sort(null)
        .value(function() {
          return 1;
        });

      // declare an arc generator function
      var arc = d3
        .arc()
        .outerRadius(r)
        .innerRadius(0);

      // select paths, use arc generator to draw
      var arcs = vis
        .selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "slice");
      arcs
        .append("path")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", function(d) {
          return arc(d);
        });
      // add the text
      arcs
        .append("text")
        .attr("transform", function(d) {
          d.innerRadius = 0;
          d.outerRadius = r;
          d.angle = (d.startAngle + d.endAngle) / 2;
          return (
            "rotate(" +
            ((d.angle * 180) / Math.PI - 90) +
            ")translate(" +
            (d.outerRadius - 10) +
            ")"
          );
        })
        .attr("text-anchor", "end")
        .text(function(d, i) {
          return data[i].name;
        });
      container.on("click", spin);
      function spin() {
        
        var ps = 360 / data.length,
          //pieslice = Math.round(1440/data.length),
        rng = Math.floor(Math.random() * 1440 + 360);

        rotation = Math.round(rng / ps) * ps;

        picked = Math.round(data.length - (rotation % 360) / ps);
        picked = picked >= data.length ? picked % data.length : picked;
        if (oldpick.indexOf(picked) !== -1) {
          d3.select(this).call(spin);
          return;
        } else {
          oldpick.push(picked);
        }
        rotation += 90 - Math.round(ps / 2);
        vis
          .transition()
          .duration(3000)
          .attrTween("transform", rotTween)
          .each("end", function() {
            //mark question as seen
            d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr(
              "fill",
              "#111"
            );
            //populate question
            d3.select("#question h1").text(data[picked].question);
            oldrotation = rotation;

            container.on("click", spin);
          });
      }
      //make arrow
      svg
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (w + padding.left + padding.right) +
            "," +
            (h / 2 + padding.top) +
            ")"
        )
        .append("path")
        .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
        .style("fill", "black");
      //draw spin circle
      container
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 60)
        .style( "fill", "white")
        .style("cursor", "pointer");
      //spin text
      container
        .append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .text("SPIN")
        .style( "font-weight", "bold")
        .style("font", "30px");

      function rotTween() {
        var i = d3.interpolate(oldrotation % 360, rotation);
        return function(t) {
          return "rotate(" + i(t) + ")";
        };
      }
    },
    getListBar() {
      this.getListBarFromApi()
        .then(
          function(response) {
            this.barlist = response.data.response.venues;
            this.afficheErreur = false;
            this.showTheWheel();
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
    BarItem
  }
};
</script>

<style>
.form {
  margin-left: 37% !important;
  display:inline-block;
  margin-top: 50px;
}
.inputVille{
  height: 50px !important;
}

.info {
  margin-top: 25px;
  margin-left: 35px;
}

#wheel {
  margin-left: 27%;
  width: 900px;
  top: 0;
  left: 0;
}
</style>
