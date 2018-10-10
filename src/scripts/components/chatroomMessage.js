//Necessary external packages
import React from "react";

export default class ChatroomMessage extends React.Component {
	constructor(props){
		super(props)
	}
	
	render(){
		if (this.props.type == "ADMIN"){
			return(<div className="chatroomMessage adminMessage">
				<div>{this.props.message}</div>
			</div>);
		} else if (this.props.type == "PRIVATE"){
			return(<div className="chatroomMessage privateMessage">
				<div>{this.props.user}</div>
				<div>{this.props.message}</div>
			</div>);
		} else if (this.props.type == "SELF"){
			return(<div className="chatroomMessage selfMessage">
				<div>{this.props.message}</div>
			</div>);
		} else {
			return(<div className="chatroomMessage standardMessage">
				<div>{this.props.user}</div>
				<div>{this.props.message}</div>
			</div>);
		}
	}
}