const express = require("express");
const socket = require("socket.io");

const app = express()
app.use(express.static(__dirname + '/public'));

const listener = app.listen(3000);

const hub = socket(listener)

let users = {}

const generateUserDetails = function(existing){
	return "Guest_" + (1 + Object.keys(existing).length);
}

const updateUserDetails = function(id, details){
	users[id] = details;
}

const uniqueName = function(name, users){
	if (name.startsWith("Guest_")){
		return false;
	}
	for (user in users){
		if (name == users[user].name){
			return false;
		}
	}
	return true;
}

const getIDFromName = function(name, users){
	let keys = Object.keys(users);
	for (let i = 0; i < keys.length; i++){
		if (users[keys[i]].name == name){
			return keys[i];
		}
	}
	return undefined;
}

hub.on("connection", function(socket){
	users[socket.id] = {name: generateUserDetails(users)};
	hub.emit("update users", users);
	hub.emit("post message", users[socket.id].name + " has joined the room.", socket.id, "ADMIN");
	
  socket.on("disconnect", function(){
	  hub.emit("post message", users[socket.id].name + " has left the room.", socket.id, "ADMIN");
	  delete users[socket.id];
	  hub.emit("update users", users);
  });
  
  socket.on("update user", function(details){
	 let old = users[socket.id].name;
	 if (uniqueName(details.name, users)){
		updateUserDetails(socket.id, details);
		hub.emit("update users", users);
		hub.emit("post message",  old + " changed their name to " + users[socket.id].name + ".", socket.id, "ADMIN");
	 } else {
		 hub.to(socket.id).emit("post message", "Unable to update user.", socket.id, "ADMIN");
	 }
  });
  
  socket.on("whisper", function(target, message){
	  let id = getIDFromName(target, users);
	  if (id != undefined){
		  socket.to(id).emit("post message", message, socket.id, "PRIVATE");
		  hub.to(socket.id).emit("post message", message, socket.id, "SELF-PRIVATE");
	  } else {
		  hub.to(socket.id).emit("post message", "Unable to send private message.", socket.id, "ADMIN");
	  }
  });
  
  socket.on("submit message", function(message){
    socket.broadcast.emit("post message", message, socket.id);
  })
})