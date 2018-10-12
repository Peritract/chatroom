//Necessary external packages
import React from "react";
import IO from "socket.io-client";
import marked from "marked";

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
			currentMessage: "",
			renderer: new marked.Renderer(),
		}
		
		let that = this;
		marked.setOptions({
			breaks: true,
			sanitize: true,
			renderer: that.state.renderer
		});
	
		this.state.renderer.link = function (href, title, text) {
			return `<a target="_blank" href="${href}">${text}` + '</a>';
		}
		
		this.addMessageToLog = this.addMessageToLog.bind(this);
		this.submitMessage = this.submitMessage.bind(this);
		this.updateCurrentMessage = this.updateCurrentMessage.bind(this);
		this.updateUsers = this.updateUsers.bind(this);
		this.updateUser = this.updateUser.bind(this);
		this.messageUser = this.messageUser.bind(this);
		this.getActiveUsers = this.getActiveUsers.bind(this);
		this.processText = this.processText.bind(this);
		
		this.state.socket.on("post message", (message, id, type) => this.addMessageToLog(message, id, type));
		this.state.socket.on("update users", (users) => this.updateUsers(users));
	}
	
	processText(info){
		return {__html: marked(info)}
	}
	
	updateCurrentMessage(val){
		this.setState({currentMessage: val});
	}
	
	updateUsers(new_users){
		this.setState({users: new_users});
	}
	
	addMessageToLog(message, id, type="STANDARD"){
		let msgs = this.state.messages;
		let entry = {message: message, id: id, type: type, fallback_user: this.state.users[id]};
		msgs.push(entry);
		this.setState({messages: msgs});
	}
	
	updateUser(){
		let options = this.state.currentMessage.split(" ");
		if (options.length > 1){
			let details = {name: options[1]};
			this.state.socket.emit("update user", details);
		}
	}
	
	messageUser(){
		let options = this.state.currentMessage.split(" ");
		if (options.length > 2){
			this.state.socket.emit("whisper", options[1], options.slice(2).join(" "));
		}
		this.addMessageToLog("Unable to message user.", this.state.socket.id, "ADMIN");
	}
	
	submitMessage(){
		if (this.state.currentMessage.length > 0){
			if (this.state.currentMessage.startsWith("/user")){
				this.updateUser();					
			} else if (this.state.currentMessage.startsWith("/whisper")){
				this.messageUser();
			}else if (this.state.currentMessage.startsWith("/")){
				this.addMessageToLog("Command not recognised.", this.state.socket.id, "ADMIN");
			} else {
				this.state.socket.emit("submit message", this.state.currentMessage);
				this.addMessageToLog(this.state.currentMessage, this.state.socket.id, "SELF");
			}
			this.state.currentMessage = "";
		}
	}
	
	getActiveUsers(users){
		return Object.keys(users).length;
	}
	
	render(){
		return(<div className="chatroom">
			<div className="chatroomHeader">
				<h3 className="chatroomTitle">Chatroom: talk to people online</h3>
				<div className="infoWrapper">
				<div className="chatroomActiveDisplay">Active Users: {this.getActiveUsers(this.state.users)}</div>
				<div className="infoContent">Created by <a className="userLink" href="https://peritract.github.io" target="blank">Dan Keefe</a></div>
				</div>
			</div>
			<ChatroomMessageLog messages={this.state.messages} users={this.state.users} processText={this.processText}/>
			<div className="chatroomPreviewBar">
			<ChatroomMessagePreview currentMessage={this.state.currentMessage} processText={this.processText}/>
			</div>
			<div className="chatroomUserBar">
				<ChatroomMessageEntry currentMessage={this.state.currentMessage} updateCurrentMessage={this.updateCurrentMessage}/>
				<ChatroomSubmitButton submitMessage={this.submitMessage}/>
			</div>
		</div>);
	}
}