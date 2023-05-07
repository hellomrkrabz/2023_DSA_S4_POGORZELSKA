import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar"
import ProfileComponent from "../components/ProfileComponent";
import EditProfile from "../components/EditProfile";
import axios from "axios"
import fetchBooksById from "../scripts/fetchBooksById";
import loading from "../media/loading.gif"

function getUserNameFromLink()
{
    const pathParts = window.location.pathname.split('/')
    return pathParts.pop()
}

function Profile(props) {

    const [isEditing, setIsEditing] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({username:"", rating:0, bio:"",adress:"", src:""})

    var emptyBook = {title:"title", authors:["author"], imageLinks:{smallThumbnail: loading}}

    const [bookIds, setBookIds] = useState(["_ojXNuzgHRcC","SDepCQAAQBAJ","xOFLAAAAcAAJ","c3tZAAAAMAAJ","Z7GfEAAAQBAJ","zYx2PQAACAAJ",])
    const [books, setBooks] = useState([emptyBook,emptyBook,emptyBook,emptyBook,emptyBook,emptyBook])
    var fetchedBooks=[];

    var sessionUserUsername = sessionStorage.getItem("sessionUserUsername")
    var sessionUserKey= sessionStorage.getItem("sessionUserKey")

    useEffect(() => {
        
        axios.get("http://localhost:5000/api/user_info/" + getUserNameFromLink()).then((response) => {
            
            let tmp= response.data.user.avatar
            tmp = tmp.substring(2,tmp.length-1)
            response.data.user.avatar = "data:image/png;base64, " + tmp; 

            setUser(response.data.user)
            //set bookIds here
            if(sessionUserUsername===response.data.user.username)
            {
                setIsLoggedIn(true)
            }

        }).then(()=>{
            for (let i = 0; i < bookIds.length; i++) {
                setTimeout(() => {
                    fetchBooksById(bookIds[i]).then((r)=>{
                        fetchedBooks.push(r.volumeInfo)
                    })
                }, 300 * i);
            }
            setTimeout(() => {setBooks(fetchedBooks)}, 400 * bookIds.length+2);
        });
    }, []);

    return (
        <>
            <div>
                <Navbar site={"/Profile"} setIsEditing={setIsEditing} isEditing={isEditing} isLoggedIn={isLoggedIn} username={sessionUserUsername}/>
            </div>

            <div className="d-flex flex-grow-1 justify-content-center">
                {
                    isLoggedIn ?
                        isEditing ? 
                        <>{/* edition */}
                            <EditProfile {...user}></EditProfile>
                        </>
                        :
                        <>{/* displying */}
                            <ProfileComponent isLoggedIn={isLoggedIn} {...user} books={books}></ProfileComponent>
                        </>
                    :
                    <ProfileComponent isLoggedIn={isLoggedIn} {...user}></ProfileComponent>
                }
            </div>
        </>
    );
}

export default Profile;
