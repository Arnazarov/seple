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
    case 'FOLLOW':
      const user = JSON.parse(localStorage.getItem('user'));
      user['following'].push(action.payload.toString());
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case 'UNFOLLOW':
      const userLS = JSON.parse(localStorage.getItem('user'));
      userLS.following = userLS.following.filter((id) => id !== action.payload);
      localStorage.setItem('user', JSON.stringify(userLS));

      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter((id) => id !== action.payload),
        },
      };
    default:
      break;
  }
};

export default AuthReducer;
