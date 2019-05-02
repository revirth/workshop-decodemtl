const mapDispatchToProps = dispatch => {
  return {
    signup: form => {
      dispatch({ type: "signup" });
    },
    afterLogin: () => dispatch({ type: "login-success" }),
    afterLogOut: () => dispatch({ type: "logout" }),
    setmessage: message => dispatch({ type: "set-message", message: message })
  };
};

export default mapDispatchToProps;
