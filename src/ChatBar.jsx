import React, { Component } from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: this.props.currentUser.name,
      inputValue: ''
    };
  }
  onKeyDown(event) {
    if (event.key === 'Enter'){
      this.props.newMessage(this.state.username, this.state.inputValue);    
    }
  };
  onContent(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  onUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input 
            className="chatbar-username" value={this.state.username}
            placeholder={ this.props.currentUser.name } onChange={this.onUsername.bind(this)}
          />
          <input 
            className="chatbar-message" value={this.state.inputValue}
            placeholder="Type a message and hit ENTER" onChange={this.onContent.bind(this)}
            onKeyDown={ this.onKeyDown.bind(this) }
          />
        </footer>
      </div>
    );
  }
}
export default ChatBar;
