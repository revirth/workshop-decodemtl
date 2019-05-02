import { createStore } from "redux";

let reducer = (state, action) => {
  switch (action.type) {
    case "query":
      return { ...state, searchQuery: action.q };
    case "minimum-price":
      return { ...state, min: action.min };
    case "maximum-price":
      return { ...state, max: action.max };
    case "inStock":
      return { ...state, inStock: action.inStock };
    case "clear":
      return { ...state, searchQuery: "", min: 0, max: 10000, inStock: true };
    case "toggle-showInputs":
      return { ...state, showInputs: action.showInputs };
  }
  return state;
};

const store = createStore(
  reducer,
  { searchQuery: "", min: 0, max: 10000, inStock: true, showInputs: false },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
