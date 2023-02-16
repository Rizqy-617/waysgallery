import { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { API, setAuthToken } from './config/api';
import { AppContext } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  // const [state, dispatch] = useContext(AppContext);

  // useEffect(() => {
  //   if (localStorage.token) {
  //     const checkAuth = async () => {
  //       try {
  //         setAuthToken(localStorage.token);
  //         const response = await API.get("/check-auth");
  //         let payload = response.data.data.user;
  //         payload.token = localStorage.token;
  //         dispatch({
  //           type: "USER_SUCCESS",
  //           payload,
  //         })
  //       } catch (error) {
  //         dispatch({
  //           type: "AUTH_ERROR",
  //         });
  //         console.log(error)
  //       }
  //     };
  //     checkAuth()
  //     return;
  //   }
  // }, [dispatch])

  return (
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
  )
}
