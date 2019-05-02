import { createStore } from "redux";

let reducer = (state, action) => {
  switch (action.type) {
    case "login-success":
      return { ...state, loggedIn: true };
    case "logout":
      return { ...state, loggedIn: false };
    case "set-message":
      return { ...state, messages: state.messages.concat(action.message) };
  }

  return state;
};

const store = createStore(
  reducer,
  { messages: [], loggedIn: false },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
