let mapDispatchToProps = dispatch => {
  return {
    reverse: () => dispatch({ type: "reverse" }),
    add: todo => dispatch({ type: "add", todo: todo })
  };
};

export default mapDispatchToProps;
