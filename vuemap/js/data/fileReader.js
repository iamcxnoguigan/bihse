var fs = require('fs')
var readline = require('readline')

function readFileToArr (callback) {
  var fRead = fs.createReadStream('./VS413362260.csv')
  var objReadline = readline.createInterface({
    input: fRead
  })
  var arr = new Array()
  objReadline.on('line', function (line) {
    arr.push(line)
    console.log('line:' + line)
  })
  objReadline.on('close', function () {
    // console.log(arr);
    callback(arr)
  })
}

export {
  readFileToArr
}
