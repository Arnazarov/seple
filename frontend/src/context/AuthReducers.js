const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        user: null,
        loading: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
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
    case 'LOGOUT':
      localStorage.removeItem('user');
      return {
        user: null,
        loading: false,
        error: false,
      };
    default:
      break;
  }
};

export default AuthReducer;
