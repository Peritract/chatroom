//Necessary external packages
import React from "react";
import IO from "socket.io-client";

//Necessary React components
import ChatroomMessageLog from './chatroomMessageLog.js';
import ChatroomSubmitButton from './chatroomSubmitButton.js';
import ChatroomMessageEntry from './chatroomMessageEntry.js';


export default class Chatroom extends React.Component {
	
	constructor(props){
		super(props)
		this.state = {
			socket: IO(),
			messages: [],
			currentMessage: ""
		}
		
		this.addMessageToLog = this.addMessageToLog.bind(this);
		this.submitMessage = this.submitMessage.bind(this);
		this.updateCurrentMessage = this.updateCurrentMessage.bind(this);
		
		this.state.socket.on("message", (message, id) => this.addMessageToLog(message,id));
	}
	
	updateCurrentMessage(val){
		this.setState({currentMessage: val});
	}
	
	addMessageToLog(message, id){
		let msgs = this.state.messages;
		let entry = {message: message, id: id};
		msgs.push(entry);
		this.setState({messages: msgs});
	}
	
	submitMessage(){
		if (this.state.currentMessage.length > 0){
			this.state.socket.emit("message_submit", this.state.currentMessage);
		}
	}
	
	render(){
		return(<div className="chatroom">
			<ChatroomMessageLog messages={this.state.messages}/>
			<ChatroomMessageEntry messageEntry={this.state.messageEntry} updateCurrentMessage={this.updateCurrentMessage}/>
			<ChatroomSubmitButton submitMessage={this.submitMessage}/>
		</div>);
	}
}