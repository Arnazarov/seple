import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import SignUp from './screens/SignUp/SignUp';
import User from './screens/User/User';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <SignUp />} exact />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
        exact
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <SignUp />}
        exact
      />
      <Route path="/profile/:name" element={<User />} exact />
    </Routes>
  );
}

export default App;
