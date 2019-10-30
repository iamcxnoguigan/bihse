// express_demo.js 文件
var express = require('express')
var app = express()
var fs = require('fs')
var readline = require('readline')
var path = require('path')
var xml2js = require('xml2js')
var parser = new xml2js.Parser()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Cache-Control', 'no-cache')
  next()
})

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/getCollaboration', async function (req, res) {
  fs.readFile('/home/cx/Desktop/7月视频+文件/dydt.xml', function (error, data) {
    if (error) {
      res.send(-1)
    } else {
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
        res.send(getGraph(bpmnjson.bpmn_definitions.bpmn_collaboration[0].bpmn_messageFlow))
      })
    }
  })
})

app.get('/getLocation', async function (req, res) {
  var arr = new Array()
  await readFileToArr(path.join(__dirname, './VS413362260.csv'), function (data) {
    if (data) {
      // console.log(data)
      arr = data
      res.send(data)
    } else {
      res.send(-1)
    }
  })
  // console.log(arr)
  // res.send(arr)
})

function readFileToArr (filename, callback) {
  var fRead = fs.createReadStream(filename)
  var objReadline = readline.createInterface({
    input: fRead
  })
  var arr = new Array()
  objReadline.on('line', function (line) {
    arr.push(line)
    // console.log('line:'+ line);
  })

  objReadline.on('close', function () {
    // console.log("完成")
    callback(arr)
  })
}
function getGraph (messageFlow) {
  var nodemap = []
  var link = []
  for (key of messageFlow) {
    if (nodemap.indexOf(key.$.sourceRef) === -1) {
      nodemap.push(key.$.sourceRef)
    }
    if (nodemap.indexOf(key.$.targetRef) === -1) {
      nodemap.push(key.$.targetRef)
    }
    link.push({'source': key.$.sourceRef, 'target': key.$.targetRef, 'value': key.$.name})
  }
  return link
}

// class Graph {
//   constructor (v, edge, edgename) {
//     let len = v.length
//     this.vexs = [].slice.apply(v) // 顶点数组
//     let arcs = []
//     for (let i = 0; i < len; i++) { // 初始化矩阵
//       arcs[i] = new Array(len)
//       for (let j = 0; j < len; j++) {
//         arcs[i][j] = i === j ? 'null' : 'Unreachable'
//       }
//     }
//     for (let j = 0; j < edge.length; j++) {
//       let v1 = v.indexOf(edge[j][0])
//       let v2 = v.indexOf(edge[j][1])
//       arcs[v1][v2] = edgename[j] || 1 // 若为无向表，则赋值arcs[v1][v2]
//     }
//     this.arcs = arcs
//   }
// }

var server = app.listen(9001, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
