import { createStore } from "redux";

let reducer = (state, action) => {
  console.log("TCL: reducer", action);

  switch (action.type) {
    case "add":
      return { ...state, todolist: state.todolist.concat(action.todo) };
    case "reverse":
      return { ...state, todolist: state.todolist.slice().reverse() };
  }

  return state;
};

const store = createStore(
  reducer,
  { todolist: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
