const express = require("express");
const socket = require("socket.io");

const app = express()
app.use(express.static(__dirname + '/public'));

var listener = app.listen(3000);

const hub = socket(listener)

hub.on("connection", function(socket){
	
  socket.on("disconnect", function(){
    socket.broadcast.emit("user_exit", socket.id);
  });
  
  socket.on("message_submit", function(message){
    socket.emit("message", message, socket.id);
  })
})