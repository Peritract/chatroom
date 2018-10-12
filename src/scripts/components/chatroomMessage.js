//Necessary external packages
import React from "react";

export default class ChatroomMessage extends React.Component {
	constructor(props){
		super(props)
	}
	
	render(){
		if (this.props.type == "ADMIN"){
			return(<div className="chatroomMessage adminMessage">
				<div className="chatroomMessageContent" dangerouslySetInnerHTML={this.props.processText(this.props.message)}></div>
			</div>);
		} else if (this.props.type == "PRIVATE"){
			return(<div className="chatroomMessage privateMessage">
				<div className="chatroomMessageUser">{"Private message from " + this.props.user + "."}</div>
				<div className="chatroomMessageContent" dangerouslySetInnerHTML={this.props.processText(this.props.message)}></div>
			</div>);
		} else if (this.props.type == "SELF"){
			return(<div className="chatroomMessage selfMessage">
				<div className="chatroomMessageContent" dangerouslySetInnerHTML={this.props.processText(this.props.message)}></div>
			</div>);
		} else if (this.props.type == "SELF-PRIVATE"){
			
			return(<div className="chatroomMessage selfPrivateMessage">
				<div className="chatroomMessageUser">{"Private message to "  + this.props.message.split(" ")[1] + "."}</div>
				<div className="chatroomMessageContent" dangerouslySetInnerHTML={this.props.processText(this.props.message.split(" ").slice(2).join(" "))}></div>
			</div>);
		} else {
			return(<div className="chatroomMessage standardMessage">
				<div>{this.props.user}</div>
				<div className="chatroomMessageContent" dangerouslySetInnerHTML={this.props.processText(this.props.message)}></div>
			</div>);
		}
	}
}