import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducers';

const INIT_STATE = {
  user: null,
  loading: false,
  error: false,
};

export const AuthContext = createContext(INIT_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INIT_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
