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
			return (<ChatroomMessage user={message.id} message={message.message} key={index}/>);
		})
	}
	
	render(){
		return (<div className="chatroomMessageLog">{this.renderMessages(this.props.messages)}</div>);
	}
}