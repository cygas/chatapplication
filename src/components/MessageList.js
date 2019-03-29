import React from 'react';
import Message from './Message';

export default class MessageList extends React.Component {
    render() {
        return (
            <div className='message-list'>
                {this.props.messages.map((message, index) => {
                    return (
                        <Message
                            key={index}
                            username={message.senderId}
                            text={message.parts[0].payload.content}
                        />
                    );
                })}
            </div>
        )
    }
}