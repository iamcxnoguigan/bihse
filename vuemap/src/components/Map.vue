<template>
  <baidu-map class='bm-view' :center="center" :zoom="zoom" @ready="handler">
     <bm-overlay
    ref="customOverlay"
    :class="{sample: true}"
    :icon="{url: 'https://www.cnblogs.com/images/cnblogs_com/progor/1390402/o_bike2.png', size: {width: 32, height: 32}}"
    pane="labelPane"
    @draw="draw">
  </bm-overlay>
  </baidu-map>
</template>
/* eslint-disable */
<script>
import { BmOverlay } from 'vue-baidu-map'
import { readFileToArr } from '../data/fileReader.js'
export default {
  components: {
    BmOverlay
  },
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3,
      active: false,
      pointColor: '',
      position:{
        lng: 114.54404,
        lat: 30.66266
      }
    }
  },
  mounted () {
    this.pointColor = this.color
  },
  created () {
    // this.setPosition()
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 114.54404
      this.center.lat = 30.66266
      this.zoom = 11
    },
    draw ({ el, BMap, map }) {
      const { lng, lat } = this.position
      console.log('position', this.position)
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 16 + 'px'
      el.style.top = pixel.y - 16 + 'px'
    },
    setPosition: async function () {
      readFileToArr(function (arr) {
        console.log(arr)
        console.log(arr.length)
        var pretime = '2017-12-06 18:42:00'
        var t1 = new Date(pretime)
        for (var i = 0; i < arr.length; i++) {
          var m = arr[i].split(',')
          // for (var j = 0; j < m.length; j++) {
          //   console.log(m[j])
          // }
          var t2 = new Date(m[2])
          let interval = (t2 - t1)/1000;
          setTimeout(function() {
            this.position = { lng: m[0], lat:m[1] }
            console.log(this.position)
          }, interval);
        }
      })
    }
  }
}
</script>
<style scoped>
.bm-view {
 position: relative;
 left:400px;
  width: 60%;
  height: 600px;
}
.sample {
  width: 10px;
  height: 10px;
  line-height: 32px;
  border-radius: 32px;
  background: rgba(0,0,0,0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  position: absolute;
}
.sample.active {
  background: rgba(0,0,0,0.75);
  color: #fff;
}
</style>
