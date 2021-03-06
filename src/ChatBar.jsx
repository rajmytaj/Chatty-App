import React, { Component } from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: this.props.currentUser.name,
      content: '',
    };
  }

  // message content is sent on enter 
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onMessage();
    }
  }

  // sets content of message
  handleChange = (event) => {
    this.setState({ content: event.target.value });
  }

  // clears message input box on enter
  onMessage() {
    this.props.onNewMessage(this.state.content);
    this.setState({ content: '' });
  }

  // sets username 
  handleUserChange = (event) => {
    this.setState({ username: event.target.value });
  }

  // username update is sent on focus loss of input field 
  onLeaveFocus = (event) => {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your name (Optional)"
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