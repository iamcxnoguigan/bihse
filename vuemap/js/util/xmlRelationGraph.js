export {Relationship_extraction}
var xml2js = require('xml2js')
var parser = new xml2js.Parser()
var fs = require('fs')

function getGraph (bpmnjson) {
  var messageFlow = bpmnjson.bpmn_definitions.bpmn_collaboration[0].bpmn_messageFlow
  var nodemap = []// 节点名称
  var nodeinfo = []// 节点名称和所属流程二元组
  var edge = []// 边的入点和出点二元组
  var edgename = []// 边的名字
  for (key of messageFlow) {
    if (nodemap.indexOf(key.$.sourceRef) === -1) {
      nodemap.push(key.$.sourceRef)
      var proId = ''
      for (pro of bpmnjson.bpmn_definitions.bpmn_process) {
        for (task of pro.bpmn_task) {
          if (task.$.id === key.$.sourceRef) {
            proId = pro.$.id
            break
          }
        }
        if (proId !== '') {
          break
        }
      }
      nodeinfo.push({name: key.$.sourceRef, processID: proId})
      proId = ''
    }
    if (nodemap.indexOf(key.$.targetRef) === -1) {
      nodemap.push(key.$.targetRef)
      var proId = ''
      for (pro of bpmnjson.bpmn_definitions.bpmn_process) {
        for (task of pro.bpmn_task) {
          if (task.$.id === key.$.targetRef) {
            proId = pro.$.id
            break
          }
        }
        if (proId !== '') {
          break
        }
      }
      nodeinfo.push({name: key.$.targetRef, processID: proId})
      proId = ''
    }
    edge.push([key.$.sourceRef, key.$.targetRef])
    edgename.push(key.$.name)
    // if() 这里需要一个数据结构存储连线的名字  可以有 可以没有 暂时不用做
  }
  for (pro of bpmnjson.bpmn_definitions.bpmn_process) {
    if (pro.bpmn_callActivity !== undefined) {
      for (call of pro.bpmn_callActivity) {
        nodemap.push(call.$.calledElement)
        nodeinfo.push({name: call.$.calledElement, processID: call.$.calledElement})
        if (nodemap.indexOf(call.$.id) === -1) {
          nodemap.push(call.$.id)
          nodeinfo.push({name: call.$.id, processID: pro.$.id})
        }
        edge.push([call.$.id, call.$.calledElement])
        edgename.push('Call Activity')
      }
    }
  }

  // console.log(edge, edgename)
  // console.log(nodeinfo)
  let a = new Graph(nodemap, nodeinfo, edge, edgename)
  return a
}

class Graph {
  constructor (nodemap, nodeinfo, edge, edgename) {
    this.nodemap = nodemap
    this.nodeinfo = nodeinfo
    this.edge = edge
    this.edgename = edgename
  }
}

function Relationship_extraction () {
  fs.readFile('/home/cx/Desktop/7月视频+文件/dydt.xml', function (error, data) {
    if (error) return console.log('读取文件失败,内容是' + error.message)
    // console.log('读取文件成功,内容是' + data)
    parser.parseString(data, function (errors, result) {
      if (errors !== null) {
        console.log(errors)
        return
      }
      // console.log(typeof result)
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
      // console.log(bpmnjson.bpmn_definitions.bpmn_process[3].bpmn_callActivity[0])
      // console.log(bpmnjson.bpmn_definitions.bpmn_process)
      return getGraph(bpmnjson)
    })
  })
}
