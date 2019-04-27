let elem = (
  <div>
    {datingProfiles.map((profile, i) => {
      return React.createElement(
        "div",
        {
          key: i,
          style: { margin: "10px", display: "flex" }
        },
        React.createElement(
          "div",
          { style: { marginRight: "10px" } },
          React.createElement("img", {
            src: "http://placekitten.com/g/100/" + (150 + i)
          })
        ),
        React.createElement(
          "div",
          {},
          React.createElement("h2", {}, profile.name),
          React.createElement("hr", {}),
          React.createElement(
            "label",
            { style: { fontWeight: "bold" } },
            "Occupation "
          ),
          React.createElement(
            "label",
            {},
            `${profile.occupation.title} ${profile.occupation.salary}`
          ),

          React.createElement("hr", {}),

          React.createElement(
            "label",
            { style: { fontWeight: "bold" } },
            "Looking For "
          ),
          React.createElement(
            "label",
            {},
            `${profile.lookingFor.gender.toString()} | kids: ${
              profile.lookingFor.kids === "ok" ? "ok" : "no"
            } | smoking:  ${profile.lookingFor.smoking ? "ok" : "no"}`
          )
        )
      );
    })}
  </div>
);

ReactDOM.render(elem, document.getElementById("root"));
