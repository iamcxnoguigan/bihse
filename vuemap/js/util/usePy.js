// var spawn = require('child_process').spawn
// free = spawn('free', ['-m'])

// // 捕获标准输出并将其打印到控制台
// free.stdout.on('data', function (data) {
//   console.log('standard output:\n' + data)
// })

// // 捕获标准错误输出并将其打印到控制台
// free.stderr.on('data', function (data) {
//   console.log('standard error output:\n' + data)
// })

// // 注册子进程关闭事件
// free.on('exit', function (code, signal) {
//   console.log('child process eixt ,exit:' + code)
// })

var exec = require('child_process').exec
var arg1 = 'hello'
var arg2 = 'jzhou'
exec('python ~/Desktop/vuemap/python/1.py ' + arg1 + ' ' + arg2 + ' ', function (error, stdout, stderr) {
  if (stdout.length > 1) {
    console.log('you offer args:', stdout)
    var v = stdout
    console.log(typeof (v))
  } else {
    console.log('you don\'t offer args')
  }
  if (error) {
    console.info('stderr : ' + stderr)
  }
})
