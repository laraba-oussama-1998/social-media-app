
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register'; 
import Profile from './pages/Profile';
import ProfileUpdate from './pages/Profile-update';
import Resetpassword from './pages/Resetpassword';


function App() {
  return (
    
    <BrowserRouter>
      
        <Routes>
          <Route exact path="/" element={ <Home />} />
          <Route  exact path="/login" element = {<Login />} />
          <Route  exact path="/reset-password" element = {<Resetpassword />} />
          <Route  exact path="/reset-password/:token" element = {<Resetpassword />} />
          <Route  exact path="/register" element = {<Register />} />
          <Route exact path="/profile/:id" element={
                <div>
                  <Profile/>
                  
                </div>} />
          <Route exact path="/profile-update/:id" element={
                <div>
                  <ProfileUpdate/>
                  
                </div>} />
        </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
