import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import SignUp from './screens/SignUp/SignUp';
import User from './screens/User/User';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/login" element={<Login />} exact />
      <Route path="/signup" element={<SignUp />} exact />
      <Route path="/profile/:name" element={<User />} exact />
    </Routes>
  );
}

export default App;
