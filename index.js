var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//定义了一个路由 / 来处理首页访问。
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// 添加socket.io 模块
//我们通过传入 http （HTTP 服务器） 对象初始化了 socket.io 的一个实例。 然后监听 connection 事件来接收 sockets， 并将连接信息打印到控制台。
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
    console.log(msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
