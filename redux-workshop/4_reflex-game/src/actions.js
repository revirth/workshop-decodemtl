const mapDispatchToProps = dispatch => {
  return {
    comWin: () => dispatch({ type: "comWin" }),
    youWin: () => dispatch({ type: "youWin" })
  };
};

export default mapDispatchToProps;
