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
import Transactions from './sites/Transactions.jsx';
import Reports from './sites/Reports.jsx'
import Opinions from "./sites/Opinions.jsx";
import Help from "./sites/Help.jsx";
import Offers from "./sites/Offers.jsx";

var sessionUsername = sessionStorage.getItem("sessionUserUsername")
var sessionUserPermissions = sessionStorage.getItem("sessionPermissions")
var sessionUserKey = sessionStorage.getItem("sessionUserKey")
var sessionUserId = sessionStorage.getItem("sessionUserId")

function App() {


  if(sessionUserKey!==undefined && (sessionUserPermissions === "2" || sessionUserPermissions === "4"))
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
        element: <Library type="personal" site="/Library" username={sessionUsername}/>,
      },
      {
        path: '/PersonalLibrary/Add',
        element: <Library type="personal" mode="add" site="/Library" username={sessionUsername}/>,
      },
      {
        path: '/PersonalLibrary/AddOffered',
        element: <Library type="personal" mode="addoffered" site="/Library" username={sessionUsername}/>,
      },
      {
        path: '/PersonalLibrary/Offered',
        element: <Library type="personal" mode="offered" site="/Library" username={sessionUsername}/>,
      },
      {
        path: '/WantedLibrary',
        element: <Library type="wanted" site="/Library" username={sessionUsername}/>,
      },
      {
        path: '/WantedLibrary/Add',
        element: <Library type="wanted" mode="add" site="/Library" username={sessionUsername}/>,
      },
      {
        path: '/Offers',
        element: <Offers type="personal" site="/Library" username={sessionUsername}/>,
      },
      {
        path: '/Transactions',
        element: <Transactions site="/Transactions" username={sessionUsername} />,
      },
      {
        path: '/Transactions/:t_id',
        element: <Transactions site="/Transactions" username={sessionUsername} />,
      },
      {
        path: '/Reports',
        element: <Reports username={sessionUsername}/>,
      },
      {
        path: '/Opinions/:username',
        element: <Opinions username={sessionUsername}/>,
      },
      {
        path: '/Help',
        element: <Help isLoggedIn={true} username={sessionUsername}/>,
      },
      {
        path: '*',
        navigate: "/",
      },
    ];
  }else if(sessionUserKey!==null && sessionUserPermissions === "3")
  {//logged in admin
    var routes = [
      // {
      //   path: '/',
      //   element: <FrontPage isLoggedIn={true} username={sessionUsername}/>,
      // },
      {
        path: '*',
        navigate: "/Reports",
      },
      {
        path: '/Logout',
        element: <Logout />,
      },
      {
        path: '/Reports',
        element: <Reports username={sessionUsername}/>,
      },
      {
        path: '/Opinions/:username',
        element: <Opinions username={sessionUsername}/>,
      },
      {
        path: '*',
        navigate: "/Reports",
      },
    ];
  }
  else
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
