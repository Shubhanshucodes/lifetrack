import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // 👈 Import auth context
import Home from './pages/home';
import VideoUpload from './pages/dailytasks';
import Signin from './pages/signin';
import Signup from './pages/signup';
import ProfilePage from './pages/profile';
import ChallengePage from './pages/challenge';
import ChallengePayment from './pages/paymet';
import ProtectedRoute from "./compomemts/protected";
import './index.css'



function App() {
  const { user, logout } = useAuth(); // 👈 Access user and logout

  return (

    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'white', alignItems: 'center' }}>
        <Link to="/">
          <img
            src="./src/assets/fef8830173b042d0a5e4fad025780433-free.png"
            style={{ height: "60px" }}
            alt="Logo"
          />
        </Link>

        <div style={{ display: "flex", gap: "1rem", paddingLeft: "4rem" }}>
          <Link to="/dailytask">Dailytask</Link>
          <Link to="/challenge">Challenge</Link>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: "1rem", alignItems: "center" }}>
          {!user && (
            <>
              
              <Link to="/signin">Signin</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/profile">
                <img
                  style={{ height: "40px", borderRadius: "50%" }}
                  src={user.profileImage || 'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'}
                  alt="Profile"
                />
              </Link>
              <button onClick={logout} style={{ cursor: 'pointer' }}>Logout</button>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dailytask" element={<VideoUpload />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/challenge"
          element={
            <ProtectedRoute>
             .
              <ChallengePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <ChallengePayment />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>

  );
}

export default App;
