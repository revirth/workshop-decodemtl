const mapDispatchToProps = dispatch => {
  return {
    color: rgb => dispatch({ type: "color", color: rgb }),
    arial: () => dispatch({ type: "fontfamily", font: "arial" }),
    timesNewRoman: () =>
      dispatch({ type: "fontfamily", font: "timesNewRoman" }),
    italic: isItalic =>
      dispatch({
        type: "fontstyle",
        style: isItalic ? "italic" : "normal"
      })
  };
};

export default mapDispatchToProps;
