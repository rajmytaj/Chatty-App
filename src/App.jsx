import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

const ws = new WebSocket("ws://localhost:3001")


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }
  componentDidMount() {
    //check for connection to server on mount 
    console.log("componentDidMount <App />");

    ws.onopen = (event) => {
      ws.onmessage = function(event) {
        console.log(event.data);
      }
    };
    
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }

  createNewMessage(username, content) {
    const message = {
      username, content
    };
    
    const newMessageList = this.state.messages.concat(message);
    this.setState({
      messages: newMessageList
    });
    ws.send(JSON.stringify(message));
    
  }
  


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} newMessage={this.createNewMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
