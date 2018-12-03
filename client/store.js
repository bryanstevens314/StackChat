import { createStore, applyMiddleware } from 'react-redux'
import { thunkMiddleware } from 'redux-thunk'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

export const gotMessageFromServer = (messages) => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  }
}
export const getMessages = () => {
  return async (dispatch, getState) => {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    dispatch(gotMessageFromServer(messages))
  }
}

const initialState = {
  messages: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:

      return { ...state, messages: action.messages }
    default:
      return state
  }
}
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export default store
