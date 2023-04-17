import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/Navbar";
import popupStyle from "../style/popup_style.css"
import BetterTextField from "../components/BetterTextField";
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
                sessionStorage.setItem("sessionUserUsername", response.data.username);
                sessionStorage.setItem("sessionUserKey", response.data.key);
                window.location.replace("/Profile/"+response.data.username)
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
                <div className="col-2">
                    <div><BetterTextField label={"Email"} type={'email'} onChange={(e) => { setEmail(e.target.value) }} ></BetterTextField></div>
                    <div><BetterTextField label={"Password"} type={'password'} onChange={(e) => { setPassword(e.target.value) }} ></BetterTextField></div>
                </div>
                <div className="col-2"> <button id="submit" name="submit" className="btn btn-banana-primary col-12" onClick={() => { submit() }}>Login</button></div>
                <Popup open={openPopup} position="right center" contentStyle={popupStyle} overlayStyle={popupStyle} arrowStyle={popupStyle} closeOnDocumentClick onClose={() => { setOpenPopup(false) }}>  <span> { popupMessage }</span></Popup>
            </div>
        </>
    );
}

export default Login;
