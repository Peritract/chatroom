const express = require("express");
const socket = require("socket.io");

const app = express()
app.use(express.static(__dirname + '/public'));

const listener = app.listen(3000);

const hub = socket(listener)

let users = {}

let generateUserDetails = function(existing){
	return "Guest_" + (Object.keys(existing).length + 0);
}

hub.on("connection", function(socket){
	users[socket.id] = {name: generateUserDetails(users)};
	hub.emit("update users", users);
	
  socket.on("disconnect", function(socket){
	  delete users[socket.id];
	  hub.emit("update users", users);
  });
  
  socket.on("submit message", function(message){
    socket.emit("post message", message, socket.id);
  })
})