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
import Logo from './compomemts/logo';



function App() {
  const { user, logout } = useAuth(); // 👈 Access user and logout

  return (

    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md dark:bg-gray-800 dark:text-white">
  {/* Logo */}
  <Link to="/" className="flex items-center gap-2">
    <Logo/>
   
  </Link>

  {/* Center Links */}
  <div className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200 text-sm font-medium">
    <Link to="/dailytask" className="hover:text-blue-600 transition">Daily Task</Link>
    <Link to="/challenge" className="hover:text-blue-600 transition">Challenge</Link>
  </div>

  {/* Right Side: Auth buttons / Profile */}
  <div className="flex items-center gap-4">
    {!user ? (
      <Link
        to="/signin"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </Link>
    ) : (
      <>
        <Link to="/profile">
          <img
            src={user.profileImage || 'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'}
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-blue-500 hover:scale-105 transition-transform"
          />
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
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
