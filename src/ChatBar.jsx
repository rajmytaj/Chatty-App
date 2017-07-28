import React, { Component } from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: this.props.currentUser.name,
      content: '',
    };
  }
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onMessage();
    }
  }

  handleChange = (event) => {
    this.setState({ content: event.target.value });
  }

  onMessage() {
    this.props.onNewMessage(this.state.content);
    this.setState({ content: '' });
  }


  handleUserChange = (event) => {
    this.setState({ username: event.target.value });
  }

  // an update message is only sent when a user leaves focus from the
  // change username input field 
  // users generally dont have to press enter on change
  onLeaveFocus = (event) => {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser ? this.props.currentUser.name : undefined}
          onChange={this.handleUserChange}
          onBlur={this.onLeaveFocus}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.handleKeyPress}
          onChange={this.handleChange}
          value={this.state.content}
        />
      </footer>
    )
  }
}

export default ChatBar;