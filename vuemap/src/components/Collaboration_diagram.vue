<template>
<div>
    <p>在下方文本框内输入有向图JSON（[source, target, value]）：</p>
<textarea id="graph-input" style="height:210px;width:500px">
[[0,1,10], [1,0,1], [1,2,5], [2,0,5]]
</textarea>
<p><button  v-on:click='draw' id="gen-btn">生成力导向图</button></p>
<div id="echarts-main" style="height:320px;width:500px;border:1px dashed;"></div>
</div>

</template>
<script>

export default {
  methods: {
    // 发送请求获得数据
    draw () {
    //   var text = this.$('#graph-input').val()
      console.log('ok')
      var data = [[0, 1, 10], [1, 0, 1], [1, 2, 5], [2, 0, 5]]
      var graph = this.data2Graph(data)
      this.drawGraph(graph)
    },
    data2Graph (data) {
      var graph = {}
      var vertices = {}
      var links = []
      for (var i = 0; i < data.length; i++) {
        var s = String(data[i][0])
        var t = String(data[i][1])
        var v = data[i][2]
        vertices[s] = s
        vertices[t] = t
        links.push({'source': s, 'target': t, 'value': v})
      }
      var nodes = []
      //   $.each(vertices, function (k, v) {
      //     nodes.push({'name': v, 'value': v})
      //   })
      graph['links'] = links
      graph['data'] = nodes
      return graph
    },

    drawGraph (graph) {
      var myChart = this.$echarts.init(document.getElementById('echarts-main'))
      var option = {
        tooltip: {},
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 30,
            edgeSymbol: ['none', 'arrow'],
            data: graph.data,
            links: graph.links,
            roam: true,
            label: {
              normal: {
                show: true,
                formatter: function (e) {
                  return e['data']['value']
                }
              }
            },
            edgeLabel: {
              normal: {
                show: true,
                position: 'middle'
              }
            },
            force: {
              repulsion: 1000,
              edgeLength: 200
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
