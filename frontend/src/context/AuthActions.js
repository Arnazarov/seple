export const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
});

export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const loginError = (error) => ({
  type: 'LOGIN_ERROR',
  payload: error,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const follow = (userID) => ({
  type: 'FOLLOW',
  payload: userID,
});

export const unfollow = (userID) => ({
  type: 'UNFOLLOW',
  payload: userID,
});
