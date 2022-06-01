const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        user: null,
        loading: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: false,
      };
    case 'LOGIN_ERROR':
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      break;
  }
};

export default AuthReducer;
