import React from 'react';

export default class NewRoomForm extends React.Component {
    state = {
        roomName: ''
    };

    handleChange = e => this.setState({roomName: e.target.value});

    handleSubmit = e => {
        e.preventDefault();
        this.props.createRoom(this.state.roomName);
        this.setState({roomName: ''});
    };

    render() {
        return (
            <div className='new-room-form'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        type='text'
                        value={this.state.roomName}
                        placeholder='NewRoomForm'
                        required
                    />
                    <button id='create-room-btn' type='submit'>+</button>
                </form>
            </div>
        )
    }
}