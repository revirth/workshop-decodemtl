import { createStore } from "redux";

let reducer = (state, action) => {
  if (state.isGameOver) return state;

  switch (action.type) {
    case "comWin":
      return { ...state, isGameOver: true, isUserWin: false };
    case "youWin":
      return { ...state, isGameOver: true, isUserWin: true };
  }
  return state;
};

const store = createStore(
  reducer,
  { isGameOver: false, isUserWin: false },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
