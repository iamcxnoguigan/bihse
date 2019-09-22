<template>
  <baidu-map class='bm-view'
             :center="center"
             :zoom="zoom"
             @ready="handler">
    <div>
<el-button type="primary" plain class='vs' style="width:8%">Vessl State</el-button>
<el-button type="primary" class='startProcess' icon="el-icon-caret-right " v-on:click="startProcess()"></el-button>
<el-button type="primary" class="delaytime" @click="dialogFormVisible = true">Delay</el-button>
<el-dialog title="Delay Info" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="Delay" :label-width="formLabelWidth">
      <el-input placeholder="Delay time (/h)" v-model="form.time" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="handleCommand()">Submit</el-button>
  </div>
</el-dialog>
      <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    :data="tableData"
    height="390"
    border
    style="width:16.5%;position: absolute;top: 55px;
  left: 320px;"
   >
    <el-table-column
      prop="IOTname"
      label="Logistics information"
      width="180">
    </el-table-column>
    <el-table-column
      prop="IOTvalue"
      label="value"
      width="135">
    </el-table-column>
  </el-table>
    </div>
    <bm-overlay ref="customOverlay"
                :class="{sample: true}"
                :icon="{url: 'https://www.cnblogs.com/images/cnblogs_com/progor/1390402/o_bike2.png', size: {width: 25, height: 50}}"
                pane="labelPane"
                @draw="draw">
    </bm-overlay>
    <bm-driving :start="start" :end="endpoint" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="true"></bm-driving>
      <bml-lushu
        ref="car"
        @stop="reset"
        :path="path"
        :icon= icon
        :play="play"
        :speed= speed
        :rotation="true">
      </bml-lushu>
  </baidu-map>
</template>

<script>
import { BmOverlay, BmlLushu } from 'vue-baidu-map'
import axios from 'axios'
import { setInterval, clearInterval } from 'timers'
var moment = require('moment')

export default {
  components: {
    BmOverlay,
    BmlLushu
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
    },
    temperature: function () {
      if (this.alertshow) {

      } else if (this.temperature > 30 || this.humidity < 35) {
        this.alertshow = true
        this.t = this.temperature
        this.h = this.humidity
        if (this.temperature > 30) {
          this.tred = true
        }
        if (this.humidity < 35) {
          this.hred = true
        }
      }
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      tred: false,
      hred: false,
      alertshow: false,
      start: '上饶',
      speed: 15000,
      play: false,
      path: [],
      icon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: {width: 52, height: 26},
        opts: {anchor: {width: 12, height: 25},
          imageSize: {width: 26, height: 13}
        }
      },
      endpoint: '南京',
      pid: '',
      preport: '出发点',
      nextport: '黄石',
      now: new Date(),
      nowtime: new Date().getTime(),
      dtime: 0,
      delay_time: 0,
      total_delay: 0,
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
      },
      portList: ['黄石', '武穴', '九江', '安庆', '池州', '铜陵', '芜湖', '马鞍山', '南京', '仪征', '镇江', '泰州', '常州', '江阴'],

      portindex: [110, 159, 205, 378, 449, 495, 600, 669, 695, 715, 746, 824, 875, 922],
      tableData: [
      ],
      form: {
        time: ''
      },
      formLabelWidth: '120px'
    }
  },
  // mounted() {
  //     this.timer = setInterval(this.setPosition, 1000);
  // },
  created: async function () {
    await this.getPosition()
  },
  methods: {
    reset () {
      this.play = false
    },
    handleSearchComplete (res) {
      this.path = res.getPlan(0).getRoute(0).getPath()
      console.log(res.getPlan(0).getRoute(0).getPath())
    },
    handleCommand () {
      this.dialogFormVisible = false
      console.log(this.$refs.car.originInstance._overlay._point)
      this.delay_time = this.form.time
      if (this.delay_time > 0) {
        this.start = { lat: 28.976358,
          lng: 118.669587}// 第700个点
        this.endpoint = '芜湖'
      }
      console.log(this.delay_time)
    },
    handler ({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 118.48214
      this.center.lat = 30.20765
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
        var beishu = 1500
        this.interval = (t2 - this.t1) / beishu
        if (this.portindex.indexOf(this.index) !== -1) {
          this.preport = this.portList[this.portindex.indexOf(this.index)]
          this.nextport = this.portList[this.portindex.indexOf(this.index) + 1]

          this.interval += this.delay_time * 3600000 / beishu
          // if (this.delay_time > 0) {
          //   this.endpoint = '铜陵'
          // }
          this.delay_time = 0
          this.total_delay += this.delay_time
          console.log('停留中')
        }// 总延迟时间要写一下计算
        this.t1 = t2
        var t = parseInt(Math.random() * 100)
        var h = parseInt(Math.random() * 500)
        this.temperature = 20.5 + t / 10
        this.humidity = 32.5 + h / 10
        var asss = new Date(t2 - new Date('2017-12-06 18:42:00') + this.total_delay + this.nowtime)
        this.now = asss
        this.vv = m[3]
        // console.log(moment(this.now).format('YYYY-MM-DD HH:mm:ss'))
        console.log('lng:' + this.position.lng + ' ' + 'lat:' + this.position.lat)
        this.tableData = [
          {
            IOTname: 'Port InterVal',
            IOTvalue: this.preport + ' --> ' + this.nextport
          }, {
            IOTname: 'Longitude',
            IOTvalue: this.position.lng
          },
          {
            IOTname: 'Latitude',
            IOTvalue: this.position.lat
          },
          {
            IOTname: 'Speed',
            IOTvalue: this.vv + ' km/h'
          },
          {
            IOTname: 'Temperature',
            IOTvalue: this.temperature + ' ℃'
          },
          {
            IOTname: 'Humidity',
            IOTvalue: this.humidity + ' %'
          },
          {
            IOTname: 'Time',
            IOTvalue: moment(this.now).format('YYYY-MM-DD HH:mm')
          }
        ]
      }
    },
    initDateTime (date) {
      var d = date
      var vYear = d.getFullYear()
      var vMon = d.getMonth() + 1
      var vDay = d.getDate()
      var hours = d.getHours()
      var minutes = d.getMinutes()
      var s = d.getSeconds()
      var currDay = d.getDate() + 2
      var today = vYear + '-' + (vMon < 10 ? '0' + vMon : vMon) + '-' + (vDay < 10 ? '0' + vDay : vDay) + ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (s < 10 ? '0' + s : s)
      var current = vYear + '-' + (vMon < 10 ? '0' + vMon : vMon) + '-' + (currDay < 10 ? '0' + currDay : currDay) + ' ' + (hours < 10 ? '0' + hours : hours) + ':' +
            (minutes < 10 ? '0' + minutes : minutes) + ':' + (s < 10 ? '0' + s : s)
      document.forms[0].startTime.value = today
      document.forms[0].endTime.value = current
      document.forms[0].newDate.value = today
    },
    startProcess () {
      this.play = true
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
  float: right;
  width: 80%;
  height: 800px;
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
  top: 0px;
  left: 320px;
}
.infocar {
  position: absolute;
  top: 260px;
  left: 1150px;
}
.infoalert{
  position: absolute;
  top: 300px;
  left: 1150px;
}
.vs{
position: absolute;
  top: 10px;
  left: 320px;
}
.startProcess {
  position: absolute;
  top: 10px;
  left: 490px;
  background-color: #606060; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.startProcess:focus {
  background-color: red;
}
.delaytime {
  position: absolute;
  top: 10px;
  left: 540px;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;

}
.submit {
  position: absolute;
  top: 30px;
  left: 550px;
  width: 80px;
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.submit:focus {
  background-color: red;
}
.processid{
  position: absolute;
  top: 30px;
  left: 5px;
  /* border: none; */
  color: black;
  /* text-align: center; */
  width: 180px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.car{
  width :1vm;
 height:1vm;
}
</style>
