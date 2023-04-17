import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/Navbar";
import popupStyle from "../style/popup_style.css"
import BetterTextField from "../components/BetterTextField";
import Logo from "../components/Logo";



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
                <div className="col-2">
                        <Logo></Logo>
                        <div className="fs-1 text-center mb-4">Sing Up</div>
                        <div><BetterTextField label={"Email"} type={'email'} onChange={(e) => { setEmail(e.target.value) }} ></BetterTextField></div>
                        <div><BetterTextField label={"Username"} type={'text'} onChange={(e) => { setUsername(e.target.value) }} ></BetterTextField></div>
                        <div><BetterTextField label={"Password"} type={'password'} onChange={(e) => { setPassword(e.target.value) }} ></BetterTextField></div>
                        <div><BetterTextField label={"Confirm password"} type={'password'} onChange={(e) => { setConfirmPassword(e.target.value) }} ></BetterTextField></div>
                        <div> <button className="btn btn-banana-primary col-12" onClick={() => { submit() }} id="submit" name="submit">Submit</button> </div>
                        <Popup open={openPopup} position="right center" contentStyle={popupStyle} overlayStyle={popupStyle} arrowStyle={popupStyle} closeOnDocumentClick onClose={() => { setOpenPopup(false) } }>  <span> { popupMessage } </span></Popup>
                </div>
            </div>
        </>
    );
}

export default Register;
