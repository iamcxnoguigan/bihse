<template>
  <baidu-map class='bm-view'
             :center="center"
             :zoom="zoom"
             @ready="handler">
    <bm-overlay ref="customOverlay"
                :class="{sample: true}"
                :icon="{url: 'https://www.cnblogs.com/images/cnblogs_com/progor/1390402/o_bike2.png', size: {width: 5, height: 5}}"
                pane="labelPane"
                @draw="draw">
    </bm-overlay>
    <button class="startProcess"
            type="button"
            v-on:click="startProcess()">启动流程</button>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="0px"
             class="demo-ruleForm">
      <el-form-item prop="delay_time">
        <el-input v-model="ruleForm.dtime"
                  class="input-color"
                  placeholder="delay time"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="aside-link"
                   @click="handleCommand()">提交</el-button>
      </el-form-item>
    </el-form>
    <div v-show="shipshow"
         class="info">
      <table border="1">
        <tr>
          <th>船只物流信息</th>
          <th>数值</th>
        </tr>
        <tr>
          <td>经度</td>
          <td>{{ position.lng}}</td>
        </tr>
        <tr>
          <td>维度</td>
          <td>{{position.lat}}</td>
        </tr>
        <tr>
          <td>温度</td>
          <td>{{temperature}} ℃</td>
        </tr>
        <tr>
          <td>湿度</td>
          <td>{{humidity}} %</td>
        </tr>
      </table>
    </div>
    <div v-show="carshow"
         class="infocar">
      <table border="1">
        <tr>
          <th>货车物流信息</th>
          <th>数值</th>
        </tr>
        <tr>
          <td>经度</td>
          <td>{{ position.lng}}</td>
        </tr>
        <tr>
          <td>维度</td>
          <td>{{position.lat}}</td>
        </tr>
        <tr>
          <td>状态</td>
          <td>C语言之父</td>
        </tr>
        <tr>
          <td>下一港口</td>
          <td>C语言之父</td>
        </tr>
        <tr>
          <td>港口延误时间</td>
          <td>C语言之父</td>
        </tr>
      </table>
    </div>
  </baidu-map>
</template>

<script>
import { BmOverlay } from 'vue-baidu-map'
import axios from 'axios'
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
    },
    interval: function () {
      clearInterval(this.timer)
      this.timer = setInterval(this.setPosition, this.interval)
    }
  },
  data () {
    return {
      carshow: false,
      shipshow: false,
      t1: new Date('2017-12-06 18:42:00'),
      timer: '',
      interval: '',
      index: 0,
      center: { lng: 0, lat: 0 },
      zoom: 3,
      active: false,
      pointColor: '',
      position: {
        lng: 114.54404,
        lat: 30.66266
      },
      temperature: 0,
      humidity: 0,
      pdata: [],
      ruleForm: {
        delay_time: ''
      },
      rules: {
        delay_time: [
          { required: true, message: 'Please enter your user name', trigger: 'blur' }
        ]
      }
    }
  },
  // mounted() {
  //     this.timer = setInterval(this.setPosition, 1000);
  // },
  created: async function () {
    await this.getPosition()
  },
  methods: {
    handler ({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 118.18214
      this.center.lat = 30.640765
      this.zoom = 8
    },
    draw ({ el, BMap, map }) {
      const { lng, lat } = this.position
      // console.log('position', this.position)
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 10 + 'px'
      el.style.top = pixel.y - 10 + 'px'
    },
    getPosition: async function () {
      await axios.get('http://localhost:9001/getLocation').then(response => {
        this.pdata = response.data
        console.log(response.data[1])
      }).catch(err => {
        console.log(err)
      })
    },
    setPosition () {
      if (true) {
        // console.log("shuju",this.pdata[this.index])
        var m = this.pdata[this.index].split(',')
        this.index += 1
        var t2 = new Date(m[2])
        this.position = { lng: m[0], lat: m[1] }
        this.interval = (t2 - this.t1) / 24000000
        var t = parseInt(Math.random() * 100)
        var h = parseInt(Math.random() * 500)
        this.temperature = 23 + t / 10
        this.humidity = 30 + h / 10
        console.log('lng:' + this.position.lng + ' ' + 'lat:' + this.position.lat)
      }
    },
    startProcess () {
      this.shipshow = true
      this.setPosition()
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style scoped>
.bm-view {
  float: left;
  width: 60%;
  height: 600px;
}
.sample {
  height: 0px;
  width: 10px;
  border-top: 10px solid #ff0000;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  line-height: 0px;
  border-radius: 0px;
  /* background-image: url("../assets/logo.png"); */
  background-repeat: no-repeat;
  background-position: right bottom;
  /* background: rgba(0,0,0,0.5); */
  overflow: hidden;
  /* box-shadow: 0 0 5px #000; */
  color: #fff;
  text-align: center;
  position: absolute;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
.info {
  position: absolute;
  top: 60px;
  left: 1150px;
}
.infocar {
  position: absolute;
  top: 260px;
  left: 1150px;
}
.startProcess {
  position: absolute;
  top: 15px;
  left: 0;
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.startProcess:focus {
  background-color: red;
}
</style>
