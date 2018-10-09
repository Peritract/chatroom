//Necessary external packages
import React from "react";
import IO from "socket.io-client";

//Necessary React components
import ChatroomMessageLog from './chatroomMessageLog.js';
import ChatroomSubmitButton from './chatroomSubmitButton.js';
import ChatroomMessageEntry from './chatroomMessageEntry.js';
import ChatroomMessagePreview from './chatroomMessagePreview.js';

export default class Chatroom extends React.Component {
	
	constructor(props){
		super(props)
		this.state = {
			socket: IO(),
			messages: [],
			users: {},
			currentMessage: ""
		}
		
		this.addMessageToLog = this.addMessageToLog.bind(this);
		this.submitMessage = this.submitMessage.bind(this);
		this.updateCurrentMessage = this.updateCurrentMessage.bind(this);
		this.updateUsers = this.updateUsers.bind(this);
		
		this.state.socket.on("post message", (message, id) => this.addMessageToLog(message,id));
		this.state.socket.on("update users", (users) => this.updateUsers(users));
	}
	
	updateCurrentMessage(val){
		this.setState({currentMessage: val});
	}
	
	updateUsers(new_users){
		this.setState({users: new_users});
	}
	
	addMessageToLog(message, id){
		let msgs = this.state.messages;
		let entry = {message: message, id: id};
		msgs.push(entry);
		this.setState({messages: msgs});
	}
	
	submitMessage(){
		if (this.state.currentMessage.length > 0){
			if (this.state.currentMessage[0] == "/"){
				console.log("dreddl");
			} else {
				this.state.socket.broadcast.emit("submit message", this.state.currentMessage);
				this.state.currentMessage = "";
			}
		}
	}
	
	render(){
		return(<div className="chatroom">
			<ChatroomMessageLog messages={this.state.messages} users={this.state.users}/>
			<ChatroomMessageEntry currentMessage={this.state.currentMessage} updateCurrentMessage={this.updateCurrentMessage}/>
			<ChatroomMessagePreview currentMessage={this.state.currentMessage} />
			<ChatroomSubmitButton submitMessage={this.submitMessage}/>
		</div>);
	}
}