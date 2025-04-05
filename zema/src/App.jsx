import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scanner from './pages/scanner'
import { Route, Routes } from "react-router-dom"
import Dashboard from './pages/dashboard'
import Welcome from './pages/welcome'
import { Navigate } from 'react-router-dom'
import About from './pages/about_us'
import Login from './pages/login'
import { auth} from './utils/firebase';
import Signup from './pages/signup'
import Layout from './layout'
function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Mark loading as complete
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Prevents flickering between Welcome/Dashboard
  }
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={user ? <Dashboard /> : <Welcome />} />
          <Route path="/scanner" element={user ? <Scanner/> : <Navigate to="/" />}/>
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/welcome" element={<Navigate to="/" />} />
          <Route path="/about_us" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
