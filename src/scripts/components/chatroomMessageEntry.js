//Necessary external packages
import React from "react";

export default class ChatroomMessageEntry extends React.Component {
	constructor(props){
		super(props);
		
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(e){
		this.props.updateCurrentMessage(e.target.value);
	}
	
	render(){
		return (<input type="text" className="chatroomMessageEntry" value={this.props.currentMessage} placeholder="Start typing..." onChange={this.handleChange} />);
	}
}