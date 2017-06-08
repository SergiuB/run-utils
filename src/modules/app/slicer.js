const slicer = (state) => ({
  ...state.app,
  userData: null,
  isAuthenticating: false,
});

export default slicer;