import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/Navbar";
import popupStyle from "../style/popup_style.css"
import Logo from "../components/Logo";

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [openPopup, setOpenPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    function submit() {
        axios.post("http://localhost:5000/user_validation/login", {
            sentEmail: email,
            sentPassword: password
        }).then((response) => {
            setPopupMessage(response.data.msg);
            setOpenPopup(true);
            console.log(response.data)
            if(response.data.msg==="Logged in")
            {
                // sessionStorage.setItem("sessionUserUsername", response.data.username);
                // sessionStorage.setItem("sessionUserKey", response.data.key);
                // sessionStorage.setItem("sessionPermissions", response.data.permissions);
                // sessionStorage.setItem("sessionUserId", response.data.user_id);
                document.cookie = "sessionUserUsername="+response.data.username+"; SameSite=None; Secure";
                document.cookie = "sessionUserKey="+response.data.key+"; SameSite=None; Secure";
                document.cookie = "sessionPermissions="+response.data.permissions+"; SameSite=None; Secure";
                document.cookie = "sessionUserId="+response.data.user_id+"; SameSite=None; Secure";
                //window.location.replace("/Profile/"+response.data.username)
                window.location.replace("/")
            }
        });
    }

    return (
        <>
            <div>
                <Navbar site={"Login"}/>
            </div>

            <div className="d-flex flex-column align-items-center">
                <Logo></Logo>
                <div className="fs-1 mb-4">Login</div>
                <div className="col-2 row gy-2">
                    <div><TextField
                            id="email"
                            label="email"
                            type="email"
                            fullWidth
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div><TextField
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <div>
                         <button id="submit" name="submit" className="btn btn-banana-primary col-12" onClick={() => { submit() }}>Login</button>
                    </div>
                    <Popup open={openPopup} position="right center" contentStyle={popupStyle} overlayStyle={popupStyle} arrowStyle={popupStyle} closeOnDocumentClick onClose={() => { setOpenPopup(false) }}>  <span> { popupMessage }</span></Popup>
                </div>
            </div>
        </>
    );
}

export default Login;
