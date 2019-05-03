import { createStore } from "redux";

let reducer = (state, action) => {
  switch (action.type) {
    case "login-success":
      return { ...state, loggedIn: true };
    case "logout":
      return { ...state, loggedIn: false };
    case "add-message":
      return {
        ...state,
        messages: state.messages
          .concat(action.message)
          .sort((a, b) => (a.time < b.time ? 1 : -1))
      };
    case "set-messages":
      return {
        ...state,
        messages: action.messages.sort((a, b) => (a.time < b.time ? 1 : -1))
      };
    case "set-loginUsers":
      return { ...state, loginUsers: action.loginUsers };
  }

  return state;
};

const store = createStore(
  reducer,
  { messages: [], loggedIn: false, loginUsers: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
