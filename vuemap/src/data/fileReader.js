var fs = require('fs');
var readline = require('readline');

// var array = []
// readFileToArr('./VS413362260.csv', function (arr) {
//     console.log(arr);
//     console.log(arr.length)
//     array = arr
//     for(var i =0;i<array.length;i++){
//         var m = array[i].split(",");
//         for(var j = 0;j<m.length;j++){
//             console.log(m[j])
//         }
//     }
// });

console.log("程序执行完毕。");

function readFileToArr(callback){
    var fRead = fs.createReadStream('./VS413362260.csv');
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
        //console.log('line:'+ line);
    });
    objReadline.on('close',function () {
       // console.log(arr);
        callback(arr);
    });
}
