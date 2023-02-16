import { useContext, useEffect, useState } from 'react'
import './App.css'
import { setAuthToken } from './config/api';
import { AppContext } from './context/AppContext';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state])

  return (
    
  )
}

export default App
