export const loginRequest = (userInfo) => ({
  type: 'LOGIN_REQUEST',
});

export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const loginError = () => ({
  type: 'LOGIN_ERROR',
});
