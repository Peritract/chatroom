//Necessary external packages
import React from "react";

export default class ChatroomMessage extends React.Component {
	constructor(props){
		super(props)
	}
	
	render(){
		return(<div className="chatroomMessage">
			<div>{this.props.user}</div>
			<div>{this.props.message}</div>
		</div>);
	}
}