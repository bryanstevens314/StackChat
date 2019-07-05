import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggingMiddleware from 'redux-logger'
import axios from 'axios';
import socket from './socket';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const UPDATE_CURRENT_MESSAGE = 'UPDATE_CURRENT_MESSAGE';
const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_USER = 'UPDATE_USER';
const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const LOGOUT = 'LOGOUT';

export const updateUser = (UserName) => {
  return {
    type: UPDATE_USER,
    UserName
  }
}
export const logOut = () => {
  return {
    type: LOGOUT
  }
}
export const changeChannel = (channelId) => {
  return {
    type: CHANGE_CHANNEL,
    channelId
  }
}
export const gotMessageFromServer = (messages) => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  }
}
export const sendAMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    message
  }
}
export const sendMessageToDataBase = (message) => {
  return async (dispatch, getState) => {

    const response = await axios.post('/api/messages', message);
    socket.emit('new-message', response.data)
    dispatch(sendAMessage(response.data))
  }
}
export const updateCurrentMessage = (message) => {
  return {
    type: UPDATE_CURRENT_MESSAGE,
    message
  }
}
export const getMessages = () => {
  return async (dispatch, getState) => {
    const response = await axios.get('/api/messages');
    dispatch(gotMessageFromServer(response.data))
  }
}
const channelArray = [
  [1, 'really_random'],
  [2, 'generally_speaking'],
  [3, 'dogs_of_fullstack'],
  [4, 'lunch_planning']
]
const initialState = {
  messages: [],
  message: '',
  userName: 'Anonymous',
  currentChannel: { 1: 'really_random' }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages }
    case LOGOUT:
      return { ...state, userName: 'Anonymous' }
    case UPDATE_USER:
      return { ...state, userName: action.UserName }
    case CHANGE_CHANNEL:
      return { ...state, currentChannel: channelArray[action.channelId] }
    case UPDATE_CURRENT_MESSAGE:
      return { ...state, currentMessage: action.message }
    case SEND_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] }
    default:
      return state
  }
}
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export default store
