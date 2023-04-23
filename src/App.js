import React from "react";
import Router from "react-easy-router";
import Register from "./sites/Register.jsx";
import Login from "./sites/Login.jsx"
import Profile from "./sites/Profile.jsx";
import AccountVerification from "./sites/AccountVerification.jsx";
import Logout from "./sites/Logout.jsx";
import { BrowserRouter } from 'react-router-dom';
import FrontPage from "./sites/FrontPage.jsx";
import Library from "./sites/Library.jsx";

var sessionUserKey= sessionStorage.getItem("sessionUserKey")
var sessionUsername= sessionStorage.getItem("sessionUserUsername")

function App() {

  if(sessionUserKey!==null)
  {//logged in
    var routes = [
      {
        path: '/',
        element: <FrontPage isLoggedIn={true} username={sessionUsername}/>,
      },
      {
        path: '/Profile/:username',
        element: <Profile />,
      },
      {
        path: '/Logout',
        element: <Logout />,
      },
      {
        path: '/PersonalLibrary',
        element: <Library type="personal" site="/Library"/>,
      },
      {
        path: '/WantedLibrary',
        element: <Library type="wanted" site="/Library"/>,
      },
      {
        path: '*',
        navigate: "/",
      },
    ];
  }else
  {//not logged in
    var routes = [
      {
        path: '/',
        element: <FrontPage isLoggedIn={false}/>,
      },
      {
        path: '/Register',
        element: <Register />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
          path: '/AccountVerification/:generatedstring',
          element: <AccountVerification />,
      },
      {
        path: '*',
        navigate: "/",
      },
    ];
  }

  return(
    <BrowserRouter>
      <Router routes={routes} />
    </BrowserRouter>
  );
}

export default App;
