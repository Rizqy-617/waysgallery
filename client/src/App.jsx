import { useContext, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { API, setAuthToken } from './config/api';
import { AppContext } from './context/AppContext';
import DetailPost from './pages/DetailPost';
import HomePage from './pages/Home';
import LandingPage from './pages/LandingPage';
import DetailsUser from './pages/DetailUser';
import PrivateRoute from './PrivateRoute';
import UploadPage from './pages/upload';
import ProfilePage from './pages/Profile';
import EditPage from './pages/EditProfile';

export default function App() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
    } catch (error) {
        console.log(error);
        setIsLoading(false)
    }
  };

  useEffect(() => {
    if (localStorage.token) {
        checkUser();
    }
    setIsLoading(false)
  }, []);


  return (
    <>
    {isLoading ? (
      <>
        <h1>Lagi Loading</h1>
      </>
    ) : (
      <Routes>
        <Route path="/landing" element={<LandingPage />} />

        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/detail/:id" element={<DetailPost />} />
          <Route exact path="/details-user/:id" element={<DetailsUser />} />
          <Route exact path="/uploads" element={<UploadPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/edit-profile" element={<EditPage />} />
        </Route>
      </Routes>
    )}
    </> 
  )
}
