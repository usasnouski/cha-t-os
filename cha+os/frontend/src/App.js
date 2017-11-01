import React, { Component } from "react";
import Cable from "actioncable";
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      chatWindow: []
    };

    // this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillMount() {
    this.intializeSocket();
  }

  intializeSocket() {
    const cable = Cable.createConsumer('ws://localhost:3001/cable');
    this.chats = cable.subscriptions.create({
      channel: 'ChatosChannel',
    },
    {
      connected: () => {},
      received: (data) => {
        const chatMessages = this.state.chatWindow.slice();
        chatMessages.push(data);
        this.setState({ chatWindow: chatMessages });
        console.log(data);
      },
      create: function (chatContent) {
        this.perform('create', { content: chatContent });
      }
    });
  }

  handleUpdate(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value  });
    }
  }

  submitMessage(e) {
    e.preventDefault();
    this.chats.create(this.state.message);
    this.setState({ message: '' });
  }

  renderChatMessages() {
    return this.state.chatWindow.map(msg => (
      <div className="text-cloud" key={msg.id}>
        <div className="chat-msg">{msg.content}</div>
        <div className="message-time">{msg.sent_at}</div>
      </div>
    ));
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Cha+os</h1>
          <div className="chat-window">{this.renderChatMessages()}</div>
          <div className="chat-stuff">
            <input
              value={this.state.message}
              onChange={this.handleUpdate('message')}
              type="text"
              placeholder="What's on your mind?"
              className="chat-input"
            />
            <button onClick={this.submitMessage.bind(this)} className="send-btn">
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
