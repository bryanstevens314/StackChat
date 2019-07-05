import React, { Component } from 'react';
import { getMessages, updateCurrentMessage, sendMessageToDataBase } from '../store';
import { connect } from 'react-redux';
import { EventEmitter } from 'events';

class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempMessageInput: ''
    }
    this.didChange = this.didChange.bind(this)
    this.didSubmit = this.didSubmit.bind(this)
  }
  didChange(event) {
    this.setState({
      tempMessageInput: event.target.value
    })
  }
  didSubmit(event) {
    event.preventDefault();
    const obj = { name: this.props.currentUser, channelId: this.props.channelId, content: this.state.tempMessageInput };
    this.props.sendMessage(obj)
    this.setState({
      tempMessageInput: ''
    })
  }
  render() {
    return (
      <form id="new-message-form" onSubmit={this.didSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={this.state.tempMessageInput}
            onChange={this.didChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    message: state.currentMessage

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateMessageState: (message) => dispatch(updateCurrentMessage(message)),
    sendMessage: (message) => dispatch(sendMessageToDataBase(message))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
