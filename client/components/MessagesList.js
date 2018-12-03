import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import { getMessages } from '../store';


class MessagesList extends Component {

  constructor() {
    super();
    this.state = { messages: [] };
  }

  async componentDidMount() {
    this.setState({ messages: getMessages() });
  }

  render() {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => <Message message={message} key={message.id} />)}
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: () => { dispatch(getMessages()) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)
