import React, { Component } from 'react';
import Chatkit from 'chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomList from './components/NewRoomForm';

class App extends Component {
  render() {
    return (
      <div>
        <MessageList/>
      </div>
    );
  }
}

export default App;
