import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/Navbar";
import popupStyle from "../style/popup_style.css"



function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [popupMessage, setPopupMessage] = useState("");


    function submit() {
        axios.post("http://localhost:5000/user_validation/register", {
            sentEmail: email,
            sentPassword: password,
            sentUsername: username,
            confirmPassword: confirmPassword
        }).then((response) => {
            console.log(response.data.msg);
            setOpenPopup(!openPopup);
            setPopupMessage(response.data.msg);
        });
    }

    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>

            <div className="d-flex flex-column align-items-center">
                <form>
                    <div> <label htmlFor="email">Email:</label> </div>
                    <div> <TextField margin='normal' name="email" id="email" type={'email'} variant='outlined' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} ></TextField></div>
                    <div> <label htmlFor="username">Username:</label> </div>
                    <div> <TextField margin='normal' name="username" id="username" type={'username'} variant='outlined' placeholder='Username' onChange={(e) => { setUsername(e.target.value) }} ></TextField></div>
                    <div> <label htmlFor="password">Password:</label> </div>
                    <div> <TextField margin='normal' name="password" id="password" type={'password'} variant='outlined' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} ></TextField></div>
                    <div> <label htmlFor="confirmPassword">Confirm password:</label> </div>
                    <div> <TextField margin='normal' name="confirmPassword" id="confirmPassword" type={'password'} variant='outlined' placeholder='Confirm password' onChange={(e) => { setConfirmPassword(e.target.value) }} ></TextField></div>
                </form>
                <div> <button onClick={() => { submit() }} id="submit" name="submit">Submit</button> </div>
                <Popup open={openPopup} position="right center" contentStyle={popupStyle} overlayStyle={popupStyle} arrowStyle={popupStyle} closeOnDocumentClick onClose={() => { setOpenPopup(false) } }>  <span> { popupMessage } </span></Popup>
            </div>
        </>
    );
}

export default Register;
