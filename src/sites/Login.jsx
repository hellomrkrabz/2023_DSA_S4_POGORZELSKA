import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/Navbar";
import popupStyle from "../style/popup_style.css"

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
        });
    }

    return (
        <>
            <div>
                <Navbar site={"Login"}/>
            </div>

            <div className="d-flex flex-column align-items-center">
                <div className="fs-1">Login</div>
                <form className="col-2">
                    <div> <label htmlFor="email">Email:</label> </div>
                    <div> <TextField fullWidth margin='normal' name="email" id="email" type={'email'} variant='outlined' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} ></TextField></div>
                    <div> <label htmlFor="password">Password:</label> </div>
                    <div> <TextField fullWidth margin='normal' name="password" id="password" type={'password'} variant='outlined' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} ></TextField></div>
                </form>
                <div className="col-2"> <button id="submit" name="submit" className="btn btn-banana-primary col-12" onClick={() => { submit() }}>Login</button></div>
                <Popup open={openPopup} position="right center" contentStyle={popupStyle} overlayStyle={popupStyle} arrowStyle={popupStyle} closeOnDocumentClick onClose={() => { setOpenPopup(false) }}>  <span> { popupMessage }</span></Popup>
            </div>
        </>
    );
}

export default Login;
