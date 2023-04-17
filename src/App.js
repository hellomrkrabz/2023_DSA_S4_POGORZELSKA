import React from "react";
import Router from "react-easy-router";
import Register from "./sites/Register.jsx";
import BookInfo from "./sites/BooksInfo.jsx";
import Login from "./sites/Login.jsx"
import Profile from "./sites/Profile.jsx";
import AccountVerification from "./sites/AccountVerification.jsx";
import Logout from "./sites/Logout.jsx";
import { BrowserRouter } from 'react-router-dom';

var sessionUserKey= sessionStorage.getItem("sessionUserKey")

function App() {

  if(sessionUserKey!==null)
  {
    var routes = [
      {
        path: '/',
        element: <BookInfo />,
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
        path: '*',
        navigate: "/",
      },
    ];
  }else
  {
    var routes = [
      {
        path: '/',
        element: <BookInfo />,
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
