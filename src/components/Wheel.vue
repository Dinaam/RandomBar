<template>
  <svg :width="width" :height="height"></svg>
</template>

<script>
import * as d3 from "d3";

export default {
  data: function() {
    return {
      svg: null,
      width: 800,
      height: 800,
      padding: { top: -50, right: 80, bottom: 20, left: 20 },
      rotation: 0,
      oldrotation: 0,
      picked: 100000,
      color: d3.scaleOrdinal(d3.schemeSet3)
    };
  },
  props: ["barlist"],
  watch: {
    barlist: "renderSvg"
  },
  computed: {
    w() {
      return 800 - this.padding.left - this.padding.right;
    },
    h() {
      return 800 - this.padding.top - this.padding.bottom;
    },
    r() {
      return Math.min(this.w, this.h) / 2;
    }
  },

  mounted() {
    this.initSvg();
  },
  methods: {
    initSvg() {
      this.svg = d3.select(this.$el).append("g");
      this.renderSvg();
    },
    renderSvg() {
      console.log("w", this.w);
      console.log("h", this.h);
      console.log("r", this.r);
      var color = this.color;
      var data = this.barlist;
      this.svg.data([data]);
      var container = this.svg
        .append("g")
        .attr("class", "chartholder")
        .attr(
          "transform",
          "translate(" +
            (this.w / 2 + this.padding.left) +
            "," +
            (this.h / 2 + this.padding.top) +
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
        .outerRadius(this.r)
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
        .attr("transform", d => {
          d.innerRadius = 0;
          d.outerRadius = this.r;
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

      this.svg
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (this.w + this.padding.left + this.padding.right) +
            "," +
            (this.h / 2 + this.padding.top) +
            ")"
        )
        .append("path")
        .attr(
          "d",
          "M-" +
            this.r * 0.15 +
            ",0L0," +
            this.r * 0.05 +
            "L0,-" +
            this.r * 0.05 +
            "Z"
        )
        .style("fill", "black");
      //draw spin circle
      container
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 60)
        .style("fill", "white")
        .style("cursor", "pointer");
      //spin text
      container
        .append("text")
        .attr("x", 0)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .text("SPIN")
        .style("font-weight", "bold")
        .style("font", "30px");
      var spin = () => {
        var ps = 360 / data.length,
          rng = Math.floor(Math.random() * 1440 + 360);
        this.rotation = Math.round(rng / ps) * ps;
        this.rotation += 90 - Math.round(ps / 2);
        vis
          .transition()
          .duration(3000)
          .attrTween("transform", () => {
            var i = d3.interpolate(this.oldrotation % 360, this.rotation);
            return function(t) {
              return "rotate(" + i(t) + ")";
            };
          })
          .on("end", function() {
            //populate question
            // d3.select("#question h1").text(data[picked].question);
            this.oldrotation = this.rotation;
            container.on("click", spin);
          });
      };
      container.on("click", spin);
    }
  },
  components: {}
};
</script>

<style>
#wheel {
  margin-left: 27%;
  width: 900px;
  top: 0;
  left: 0;
}
</style>
