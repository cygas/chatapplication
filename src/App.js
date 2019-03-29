import React, {Component} from 'react';
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import {url, instanceLocator} from "./config";

class App extends Component {
    state = {
        messages: []
    };

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: 'cygas',
            tokenProvider: new Chatkit.TokenProvider({
                url
            })
        });

        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser;
                this.currentUser.subscribeToRoomMultipart({
                    roomId: '19548825',
                    messageLimit: 20,
                    hooks: {
                        onMessage: message => {
                            this.setState(prevState => ({messages: [...prevState.messages, message]}));
                        }
                    }
                })
            });
    }

    sendMessage = text => {
        this.currentUser.sendMessage({
            text,
            roomId: '19548825'
        });
    };

    render() {
        return (
            <div>
                <RoomList/>
                <MessageList messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
                <NewRoomForm/>
            </div>
        );
    }
}

export default App;
