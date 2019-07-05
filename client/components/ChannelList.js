import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeChannel } from '../store';
// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1';
const GENERAL_CHANNEL = '/channels/2';
const DOGS_CHANNEL = '/channels/3';
const LUNCH_CHANNEL = '/channels/4';

class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.didClick = this.didClick.bind(this)
  }
  didClick(channelId) {
    this.props.changeChannel(channelId)
  }
  render() {

    const messages = this.props.messages;
    const RANDOM = messages.filter(message => message.channelId === 1);
    const GENERAL = messages.filter(message => message.channelId === 2);
    const DOGS = messages.filter(message => message.channelId === 3);
    const LUNCH = messages.filter(message => message.channelId === 4);
    return (
      <ul>
        <li>
          <NavLink to={RANDOM_CHANNEL} activeClassName="active" onClick={() => this.didClick(0)}>
            <span># really_random</span>
            <span className="badge">{RANDOM.length}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={GENERAL_CHANNEL} activeClassName="active" onClick={() => this.didClick(1)}>
            <span># generally_speaking</span>
            <span className="badge">{GENERAL.length}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={DOGS_CHANNEL} activeClassName="active" onClick={() => this.didClick(2)}>
            <span># dogs_of_fullstack</span>
            <span className="badge">{DOGS.length}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={LUNCH_CHANNEL} activeClassName="active" onClick={() => this.didClick(3)}>
            <span># lunch_planning</span>
            <span className="badge">{LUNCH.length}</span>
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeChannel: (channelId) => dispatch(changeChannel(channelId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelList))
