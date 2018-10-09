//Necessary external packages
import React from "react";
import marked from "marked";

export default class ChatroomMessagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  renderer: new marked.Renderer(),
      id: props.id
    };
	
	let that = this;
	marked.setOptions({
		breaks: true,
		sanitize: true,
		renderer: that.state.renderer
	});
	
	this.state.renderer.link = function (href, title, text) {
		return `<a target="_blank" href="${href}">${text}` + '</a>';
	}
	
  }
  
  process_text(){
    return {__html: marked(this.props.currentMessage)}
  }
  
  render() {
    //You'd think the React tutorials and so on would mention this more prominently
    return <div id={this.state.id} dangerouslySetInnerHTML={this.process_text()}></div>;
  }
}