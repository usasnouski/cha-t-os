import React, { Component } from "react";
import Cable from "actioncable";
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    // this.handleUpdate = this.handleUpdate.bind(this);
  }

  intializeSocket() {
    const cable = Cable.createConsumer('ws://localhost:3001/cable');
    this.chats = cable.subscriptions.create({
      channel: 'ChatosChannel',
    },
    {
      connected: () => {},
      received: (data) => {
        console.log(data);
      }
    },
    {
      create: chatContent => {
        this.perform('create', { content: chatContent });
      }
    });
  }

  handleUpdate(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value  });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Cha+os</h1>
          <div className="chat-window" />
          <input
            value={this.state.message}
            onChange={this.handleUpdate('message')}
            type="text"
            placeholder="What's on your mind?"
            className="chat-input"
          />
          <button onClick={this.submitMessage} className="send-btn">
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default App;
