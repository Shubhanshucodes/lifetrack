import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import VideoUpload from './pages/dailytasks';
import Signin from './pages/signin';
import Signup from './pages/signup';
import ProfilePage from './pages/profile';
import ChallengePage from './pages/challenge';
import ChallengePayment from './pages/paymet';




function App() {
  return (
    <Router>
      <div>
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'white'}}>
          <Link to="/"><img src="./src/assets/fef8830173b042d0a5e4fad025780433-free.png" style={{height:"60px"}} alt='Cartoon-style logo featuring a yellow pencil with a smiling face, set against a transparent background, conveying a friendly and creative atmosphere' /></Link>
          <div className='mavog'style={{display:"flex",gap:"1rem",paddingLeft:"4rem"}} >
          <Link to="/dailytask">Dailytask</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/signin">Signin</Link>
          <Link to="/challenge">Challenge</Link>
          </div>
          <Link to="/profile"><img style={{height:"40px",marginLeft:"1040px"}} src='https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg' alt='Simple circular profile icon with a generic person silhouette in white on a blue background, representing user account access in a neutral and welcoming style' /></Link>
          
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/dailytask' element={<VideoUpload/>}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/challenge" element={<ChallengePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payment" element={<ChallengePayment/>} />
        
        
          
          {/* Optional 404 Route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
