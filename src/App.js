import './App.css';
import Homepage from './pages/Homepage';
import Profile from './pages/profile';
import Login from './pages/auth/Login';
import Forgot from './pages/auth/Forgot';
import Setpassword from './pages/auth/Setpassword';
import Otp from './pages/auth/Otp';
import Error from './pages/404'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Homepage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/" element={<Login />} />
          <Route path="forgotpassword" element={<Forgot />} />
          <Route path="setpassword" element={<Setpassword />} />
          <Route path="otp" element={<Otp />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
