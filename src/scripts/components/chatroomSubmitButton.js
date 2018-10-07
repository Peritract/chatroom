//Necessary external packages
import React from "react";

export default class ChatroomSubmitButton extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(){
		this.props.submitMessage();
	}
	
	render(){
		return (<button className="chatroomSubmitButton" onClick={this.handleClick}>Send</button>);
	}
}