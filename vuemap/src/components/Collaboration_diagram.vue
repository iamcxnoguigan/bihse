<template>
<div>
  <p><button  v-on:click="geGraph">生成协作关系图</button></p>
  <div id="echarts" />
</div>
</template>

<script>
import { drawChart } from '../../js/util/RelationGraph'
import axios from 'axios'
export default {
  name: 'RelationGraph',
  data () {
    return {
      dataInput: {
        style: {
          height: 800 // canvas高度
        }, //
        node: [
        ],
        relation: [
        ],
        node_category: [
          {
            name: 'Activity',
            itemStyle: {
              normal: {
                color: 'blue'
              }
            }
          }, {
            name: 'Process',
            itemStyle: {
              normal: {
                color: 'pink'
              }
            }
          }
        ],
        relation_category: {
          // 'process': {
          //   lineStyle: {
          //     normal: {
          //       opacity: 0.9,
          //       width: 2,
          //       curveness: 0,
          //       type: 'solid', // 'solid''dashed''dotted'
          //       color: 'rgba(0,0,0,0.6)'
          //     },
          //     emphasis: {
          //       color: 'rgba(0,0,0,1)'
          //     }
          //   }
          //   // TODO:可添加 隐藏的hideLineStyle ...
          // },
          default: {
            lineStyle: {
              normal: { curveness: 0.3 } // 可设置为负值
            }
          }
          // "同学": {}  不添加则是默认
        },
        legend: ['Activity', 'Process'] // 可部分隐藏,此处省略了未知性别
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.geGraph()
    }, 300)
    // drawChart(this.dataInput)
  },
  methods: {
    geGraph: async function () {
      await axios.get('http://localhost:9001/getCollaboration').then(response => {
        this.graphinfo = response.data
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
      this.GraphinfoClear()
      this.Graphinfohandle()
      setTimeout(() => {
        drawChart(this.dataInput)
      }, 300)
    },
    GraphinfoClear () {
      this.dataInput.node = []
      this.dataInput.relation = []
    },

    Graphinfohandle: function () {
      for (var node of this.graphinfo.nodeinfo) {
        console.log(node)
        var Gnode = {
          name: node.name,
          value: node.processID,
          category: ''

        }
        if (node.name === node.processID) Gnode.category = 'Process'
        else {
          Gnode.category = 'Activity'
        }
        this.dataInput.node.push(Gnode)
      }
      for (let i = 0; i < this.graphinfo.edgename.length; i++) {
        var link = {
          source: this.graphinfo.edge[i][0],
          target: this.graphinfo.edge[i][1],
          value: this.graphinfo.edgename[i],
          symbol: ['none', 'arrow']
        }
        this.dataInput.relation.push(link)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
