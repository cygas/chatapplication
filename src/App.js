import React, {Component} from 'react';
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import {url, instanceLocator} from "./config";

class App extends Component {
    state = {
        roomId: null,
        messages: [],
        joinableRooms: [],
        joinedRooms: []
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

                this.getRooms();
            })
            .catch(err => console.log('error on connecting: ', err));
    }

    getRooms = () => {
        this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            })
            .catch(err => console.log('error on joinableRooms: ', err));
    };

    subscribeToRoom = (roomId) => {
        this.setState({messages: []});
        this.currentUser.subscribeToRoomMultipart({
            roomId: roomId,
            messageLimit: 20,
            hooks: {
                onMessage: message => {
                    this.setState(prevState => ({messages: [...prevState.messages, message]}));
                }
            }
        })
            .then(room => {
                this.setState({roomId: room.id});
                this.getRooms()
            })
            .catch(err => console.log('error on subscribing to room: ', err));
    };

    sendMessage = text => {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        });
    };

    createRoom = name => {
        this.currentUser.createRoom({
            name
        })
            .then(room => this.subscribeToRoom(room.id))
            .catch(err => console.log('error with create room: ', err));
    };

    render() {
        return (
            <div>
                <RoomList
                    roomId={this.state.roomId}
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                />
                <MessageList messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
                <NewRoomForm createRoom={this.createRoom}/>
            </div>
        );
    }
}

export default App;
