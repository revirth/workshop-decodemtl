const mapDispatchToProps = dispatch => {
  return {
    signup: form => dispatch({ type: "signup" }),
    afterLogin: () => dispatch({ type: "login-success" }),
    afterLogOut: () => dispatch({ type: "logout" }),
    addMessage: msg => dispatch({ type: "add-message", message: msg }),
    setmessages: msgs => dispatch({ type: "set-messages", messages: msgs }),
    setLoginUsers: users =>
      dispatch({ type: "set-loginUsers", loginUsers: users })
  };
};

export default mapDispatchToProps;
