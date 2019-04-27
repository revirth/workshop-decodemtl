let elem = (
  <div>
    {subreddits.map((reddit, i) => {
      return React.createElement(
        "div",
        { key: i },
        React.createElement(
          "h2",
          {},
          reddit.name,
          ` by ${reddit.moderators.map(m => m.name).join(", ")}`
        ),
        React.createElement(
          "ul",
          {},
          reddit.posts.map((post, i) => {
            return React.createElement(
              "li",
              { key: i },
              React.createElement(
                "div",
                {},
                React.createElement("label", {}, post.title),
                React.createElement(
                  "label",
                  { style: { fontStyle: "italic" } },
                  ` ${post.date.month.substr(0, 3)} ${post.date.year} ${
                    post.date.op
                  }`
                )
              )
            );
          })
        )
      );
    })}
  </div>
);

ReactDOM.render(elem, document.getElementById("root"));
