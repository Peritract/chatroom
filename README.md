# Chatroom

### Concept

A simple markdown-enabled chatroom using Socket.io and React.

### Usage

Visiting the website (https://babel-towering.glitch.me) automatically adds you to the chatroom. You can send messages by typing in the box provided and send them with the "send" button.

Above the textbox is a preview window that updates as you type. This is there because the chatroom is capable of handling github-style markdown, and it's useful to see what your message will actually look like on the other end. 

Currently, there are two special instructions:

* **/user** followed by a word will change your name to that word if the name is not already in use.

* **/whisper** followed by another user's display name and a message will send a private message to the user. 

### Dependencies

* Socket.io
* React.js
* marked.js

Also Webpack for the build, plus small webpack plugins.

### Installation

Download it or clone it, then run `npm install` to get it all set up.

`npm run build` packs all the /src files together into /dist

`npm run start` starts a local server at http://localhost:3000.

### Issues

I don't expect massive usage from anyone, but if you find an error, raise it here or email me at peritract@hotmail.co.uk.
