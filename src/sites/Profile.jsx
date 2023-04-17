import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar"
import ProfileComponent from "../components/ProfileComponent";
import EditProfile from "../components/EditProfile";
import axios from "axios"

function getUserNameFromLink()
{
    const pathParts = window.location.pathname.split('/')
    return pathParts.pop()
}

function Profile(props) {


    const [isEditing, setIsEditing] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({username:"", rating:0, bio:"",adress:"", src:""})

    var sessionUserUsername = sessionStorage.getItem("sessionUserUsername")
    var sessionUserKey= sessionStorage.getItem("sessionUserKey")

    useEffect(() => {
        
        axios.get("http://localhost:5000/api/user_info/" + getUserNameFromLink()).then((response) => {
            setUser(response.data.user)
            if(sessionUserUsername===response.data.user.username)
            {
                setIsLoggedIn(true)
            }
        });
    }, []);


    return (
        <>
            <div>
                <Navbar site={"/Profile"} setIsEditing={setIsEditing} isEditing={isEditing} isLoggedIn={isLoggedIn}/>
            </div>

            <div className="d-flex flex-grow-1">
                {
                    isLoggedIn ?
                        isEditing ? 
                        <>{/* edition */}
                            <EditProfile {...user}></EditProfile>
                        </>
                        :
                        <>{/* displying */}
                            <ProfileComponent isLoggedIn={isLoggedIn} {...user}></ProfileComponent>
                        </>
                    :
                    <ProfileComponent isLoggedIn={isLoggedIn} {...user}></ProfileComponent>
                }
            </div>
        </>
    );
}

export default Profile;
