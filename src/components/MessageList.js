import React from 'react';

const DATA = [
    {
        senderId: 'mariusz',
        text: 'hey'
    },
    {
        senderId: 'cygas',
        text: 'co się staneło?'
    },
    {
        senderId: 'mariusz',
        text: 'a tak tylko zagaduję'
    }
];

export default class MessageList extends React.Component {
    render() {
        return (
            <div className='message-list'>
                {DATA.map((message, index) => {
                    return (
                        <div key={index} className='message'>
                            <div className='message-username'>{message.senderId}</div>
                            <div className='message-text'>{message.text}</div>
                        </div>
                    );
                })}
            </div>
        )
    }
}