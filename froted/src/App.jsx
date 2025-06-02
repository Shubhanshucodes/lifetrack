import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import DailyTasks from './pages/Tasks';
import VideoUpload from './pages/videoupload';
import Signin from './pages/signin';
import Signup from './pages/signup';
import VideoAnalysis from './pages/malysisfroted';



function App() {
  return (
    <Router>
      <div>
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: '#f2f2f2'}}>
          <Link to="/">Home</Link>
          <Link to="/tasks">Tasks</Link> {/* Create an About route or remove this */}
          <Link to="/profile">Profile</Link>
          <Link to="/video">Videoupload</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/signin">Signin</Link>
          <Link to="/videodescriptiom">Videoanalysis</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videodescriptiom" element={<VideoAnalysis />} />
          <Route path="/home" element={<Home />} />
         
          <Route path="/tasks" element={<DailyTasks />} />
          <Route path='/video' element={<VideoUpload/>}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        
          
          {/* Optional 404 Route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
