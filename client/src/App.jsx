import { useContext, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { API, setAuthToken } from './config/api';
import { AppContext } from './context/AppContext';
import HomePage from './pages/Home';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './PrivateRoute';

export default function App() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(AppContext);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
      if (state.isLogin === false) {
          navigate("/landing");
      } else {
          navigate("/");
      }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
          return dispatch({
              type: "AUTH_ERROR",
          });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
          type: "USER_SUCCESS",
          payload,
      });
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
        checkUser();
    }
  }, []);


  return (
      <Routes>
        <Route path="/landing" element={<LandingPage />} />

        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<HomePage />} />
        </Route>
      </Routes>
  )
}
