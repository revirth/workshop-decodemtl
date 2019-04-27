let cats = ["http://placekitten.com/200/300", "http://placekitten.com/300/200"];
let ulul = (
  <ul>
    {cats.map((cat, i) => {
      return React.createElement(
        "li",
        { key: i },
        React.createElement("img", { src: cat })
      );
    })}
  </ul>
);

ReactDOM.render(ulul, document.getElementById("root"));
