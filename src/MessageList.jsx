import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const message = this.props.messages.map(message => {
      return <Message
        key={message.id}  
        user={message.username} 
        content={message.content}
        type={message.type} /> 
    })

    return (
      <main className="messages">
        <div>
          {message}
        </div>
      </main>
    );
  }
}

export default MessageList;