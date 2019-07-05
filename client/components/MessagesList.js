import NewMessageEntry from './NewMessageEntry';
import React, { Component } from 'react';
import { getMessages, changeChannel } from '../store';
import { connect } from 'react-redux';
import Message from './Message';

class MessagesList extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.getAllMessages()
    const channelId = Number(this.props.match.params.channelId);
    this.props.changeChannel(channelId - 1)
  }
  render() {

    const channelId = Number(this.props.match.params.channelId);
    const messages = this.props.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);
    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => <Message message={message} key={message.id} />)}
        </ul>
        <NewMessageEntry didSubmit={this.didSubmit} currentUser={this.props.username} channelId={channelId} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    username: state.userName
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllMessages: () => dispatch(getMessages()),
    changeChannel: (channelId) => dispatch(changeChannel(channelId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)
