import { createStore } from "redux";

let reducer = (state, action) => {
  switch (action.type) {
    case "fontfamily":
      return { ...state, myFontFamily: action.font };
    case "fontstyle":
      return { ...state, myFontStyle: action.style };
    case "color":
      return { ...state, myBackColor: action.color };
  }
  return state;
};

const store = createStore(
  reducer,
  {
    myFontStyle: "normal",
    myBackColor: "",
    myFontFamily: "arial"
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
