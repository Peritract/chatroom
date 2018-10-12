//Necessary external packages
import React from "react";

export default class ChatroomMessagePreview extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    //You'd think the React tutorials and so on would mention this more prominently
    return <div className="chatroomMessagePreview" dangerouslySetInnerHTML={this.props.processText(this.props.currentMessage)}></div>;
  }
}