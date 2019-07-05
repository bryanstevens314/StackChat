import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { updateUser, logOut } from '../store';
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempUserName: ''
    }
    this.didChange = this.didChange.bind(this)
    this.didSubmit = this.didSubmit.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  didChange(event) {
    this.setState({ tempUserName: event.target.value })
  }
  didSubmit(event) {
    console.log('SUBMIT')
    event.preventDefault();
    this.props.updateUser(this.state.tempUserName)
    this.setState({ tempUserName: '' })
  }
  logOut(event) {
    this.props.logOut();
  }
  render() {
    console.log('RENDER IN NAVBAR', this.props.userName)
    return (
      <nav>
        <h3># {this.props.currentChannel[1]}</h3>
        <form onSubmit={this.didSubmit} >
          <label>Your Name
          <input onChange={this.didChange} type="text" placeholder="Name" value={this.state.tempUserName}></input>
            <button type="submit">Enter</button>
          </label>
          <br />
          <label>Logged in as {this.props.userName}</label>
          <button type="button" onClick={this.logOut}>Log Out</button>
        </form>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.currentMessage,
    currentChannel: state.currentChannel,
    userName: state.userName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userName) => dispatch(updateUser(userName)),
    logOut: () => dispatch(logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
