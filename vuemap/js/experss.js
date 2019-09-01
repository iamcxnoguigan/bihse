//express_demo.js 文件
var express = require('express');
var app = express();
var fs = require('fs');
var readline = require('readline');
var path = require('path');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Cache-Control', 'no-cache')
    next();
});

app.get('/', function (req, res) {
   res.send('Hello World');
})
app.get('/getLocation', async function(req, res){
    var arr = new Array();
    await readFileToArr(path.join(__dirname, './VS413362260.csv'), function (data){
        if(data){
            // console.log(data)
            arr = data
            res.send(data)
        }else {
            res.send(-1)
        }
    })
    // console.log(arr)
    // res.send(arr)
})

function readFileToArr(filename,callback){
    var fRead = fs.createReadStream(filename);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
        // console.log('line:'+ line);
    });
    
    objReadline.on('close',function () {
        // console.log("完成")
        callback(arr);
    });
   
}
 
var server = app.listen(9001, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})