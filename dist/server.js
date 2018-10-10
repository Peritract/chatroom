const express = require("express");
const socket = require("socket.io");

const app = express()
app.use(express.static(__dirname + '/public'));

const listener = app.listen(3000);

const hub = socket(listener)

let users = {}

const generateUserDetails = function(existing){
	return "Guest_" + (Object.keys(existing).length + 0);
}

const updateUserDetails = function(id, details){
	users[id] = details;
}

hub.on("connection", function(socket){
	users[socket.id] = {name: generateUserDetails(users)};
	hub.emit("update users", users);
	hub.emit("post message", users[socket.id].name + " has joined the room.", socket.id, "ADMIN");
	
  socket.on("disconnect", function(){
	  hub.emit("post message", users[socket.id].name + " has left the room.", socket.id, "ADMIN");
  });
  
  socket.on("update user", function(details){
	 let old = users[socket.id].name;
	 updateUserDetails(socket.id, details);
	 hub.emit("update users", users);
	 hub.emit("post message",  old + " changed their name to " + users[socket.id].name + ".", socket.id, "ADMIN");
  });
  
  socket.on("submit message", function(message){
    socket.broadcast.emit("post message", message, socket.id);
  })
})