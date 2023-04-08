import React, { useEffect, useState } from "react";
import Navbar from './../components/Navbar'
import MyProfile from "../components/MyProfile";
import OthersProfile from "../components/OthersProfile";
import EditProfile from "../components/EditProfile";

function getUserNameFromLink()
{
    const pathParts = window.location.pathname.split('/')
    return pathParts.pop()
}

function Profile(props) {

    const user = {username: "zenek"}

    const [isEditing, setIsEditing] = useState(!true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    var params = {name : "test name"}

    useEffect(() => {
        /*
        axios.get("http://localhost:5000/api/user_info/"+userId).then((response) => {
            setEmail(response.email)
            setUserName(response.userName)
            setProfilePicture(response.avatar)
        });*/

        

        if(getUserNameFromLink()===user.username)
        {
            setIsLoggedIn(true)
        }

    }, []);


    return (
        <>
            <div>
                <Navbar site={"/Profile"} setIsEditing={setIsEditing} isEditing={isEditing}/>
            </div>

            <div className="d-flex flex-grow-1">
                {
                    isLoggedIn ?
                        isEditing ? 
                        <>{/* edition */}
                            <EditProfile {...params}></EditProfile>
                        </>
                        :
                        <>{/* displying */}
                            <MyProfile {...params}></MyProfile>
                        </>
                    :
                    <OthersProfile></OthersProfile>
                }
            </div>
        </>
    );
}

export default Profile;
