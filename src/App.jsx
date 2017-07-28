
import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [],
      usersConnected: 0,
    }
    this.onNewMessage = this.onNewMessage.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
  }

  onNewMessage(content) {
    this.socket.send(JSON.stringify({
      type: "postMessage",
      username: this.state.currentUser.name,
      content: content
    }));
  }

  onNameChange(content) {
    this.setState({ currentUser: { name: content } });

    this.socket.send(JSON.stringify({
      type: 'postNotification',
      content: this.state.currentUser.name + ' has changed their name to ' + content
    }))
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    const client = new WebSocket("ws://localhost:3001/");

    client.onopen = function (connection) {
    }

    this.socket = client;

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);

      switch (data.type) {
        case 'incomingMessage':
          this.setState({ messages: this.state.messages.concat(data) });
          break;
        case 'incomingNotification':
          this.setState({ messages: this.state.messages.concat(data) });
          break;
        case 'initial_connection':
          break;
        default:
          // everytime a new client connects, the server updates all clients 
          this.setState({ usersConnected: data });
          break;
      }
    }
  }

  render() {
    const { messages, currentUser } = this.state;

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users"> Users connected: {this.state.usersConnected} </span>
        </nav>
        <MessageList messages={messages} />
        <ChatBar currentUser={currentUser}
          onNewMessage={this.onNewMessage}
          onNameChange={this.onNameChange} />
      </div>
    );
  }
}

export default App;