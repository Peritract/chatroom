import '../styles/index.css';

import React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

let socket = io()

const Index = () => {
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("root"));