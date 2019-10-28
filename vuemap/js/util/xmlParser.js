
var xml2js = require('xml2js')
var parser = new xml2js.Parser()
var fs = require('fs')
fs.readFile('/home/cx/Desktop/7月视频+文件/dydt.xml', function (error, data) {
  if (error) return console.log('读取文件失败,内容是' + error.message)
  console.log('读取文件成功,内容是' + data)
  parser.parseString(data, function (errors, result) {
    if (errors !== null) {
      console.log(errors)
      return
    }
    console.log(typeof result)
    // console.log(Object.getOwnPropertyDescriptor(Object.getOwnPropertyDescriptor(result, 'bpmn:definitions').value, 'bpmn:collaboration'))
    // console.log(Object.getOwnPropertyNames(result))
    var r = JSON.stringify(result)
    r = r.replace(/bpmn:/g, 'bpmn_')
    r = r.replace(/xmlns:/g, 'xmlns_')
    r = r.replace(/bpmndi:/g, 'bpmndi_')
    r = r.replace(/di:/g, 'di_')
    r = r.replace(/dc:/g, 'dc_')
    // console.log(r)
    var bpmnjson = JSON.parse(r)
    console.log(Object.getOwnPropertyNames(bpmnjson.bpmn_definitions.bpmn_collaboration))
    console.log(bpmnjson.bpmn_definitions.bpmn_collaboration[0].bpmn_messageFlow)
    let ans = getGraph(bpmnjson.bpmn_definitions.bpmn_collaboration[0].bpmn_messageFlow)
    console.log(ans)
  })
})

var xml_string = '<response id="1" shop="aldi">' + 'This is some other content' +
            '<who name="james">James May</who>' 		+
			'<who name="sam">'			+
			'Sam Decrock'			+
			'<location>Belgium</location>'		+
			'</who>' 		+
			'<who name="jack">Jack Johnsen</who>'		+
			'<games age="6">'			+
			'<game>Some great game</game>'			+
			'<game>Some other great game</game>'		+
			'</games>' + '<note>These are some notes</note>'	+ '</response>'

// xmlreader.read(xmlread, function (errors, response) {
//   if (errors !== null) {
//     console.log(errors)
//     return
//   }
//   console.log(response.response)
//   console.log(response.response.text())
// })
function getGraph (messageFlow) {
  var nodemap = []
  var edge = []
  var edgename = []
  for (key of messageFlow) {
    if (nodemap.indexOf(key.$.sourceRef) === -1) {
      nodemap.push(key.$.sourceRef)
    }
    if (nodemap.indexOf(key.$.targetRef) === -1) {
      nodemap.push(key.$.targetRef)
    }
    edge.push([key.$.sourceRef, key.$.targetRef])
    edgename.push(key.$.name)
    // if() 这里需要一个数据结构存储连线的名字  可以有 可以没有 暂时不用做
  }
  let a = new Graph(nodemap, edge, edgename)
  return a
}

class Graph {
  constructor (v, edge, edgename) {
    let len = v.length
    this.vexs = [].slice.apply(v) // 顶点数组
    let arcs = []
    for (let i = 0; i < len; i++) { // 初始化矩阵
      arcs[i] = new Array(len)
      for (let j = 0; j < len; j++) {
        arcs[i][j] = i === j ? 'null' : 'Unreachable'
      }
    }
    for (let j = 0; j < edge.length; j++) {
      let v1 = v.indexOf(edge[j][0])
      let v2 = v.indexOf(edge[j][1])
      arcs[v1][v2] = edgename[j] || 1 // 若为无向表，则赋值arcs[v1][v2]
    }
    this.arcs = arcs
  }
}
