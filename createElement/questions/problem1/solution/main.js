let rootdiv = document.getElementById("root")
let elem = React.createElement(
  "div",
  {},
  React.createElement("h1", {}, "hello world")
)
ReactDOM.render(elem, rootdiv)
