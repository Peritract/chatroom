//Necessary external packages
import React from "react";

//Smaller components
import ChatroomMessage from './chatroomMessage';

export default class ChatroomMessageLog extends React.Component {
	constructor(props){
		super(props);
		
		this.renderMessages = this.renderMessages.bind(this);
	}
	
	renderMessages(log){
		return log.map((message, index) => {
			let user = (this.props.users[message.id]) ? this.props.users[message.id]["name"] : message.fallback_id; 
			return (<div><ChatroomMessage user={user} message={message.message} type={message.type} key={index} keyStem={index} processText={this.props.processText}/><hr /></div>);
		})
	}
	
	render(){
		return (<div className="chatroomMessageLog">{this.renderMessages(this.props.messages)}</div>);
	}
}