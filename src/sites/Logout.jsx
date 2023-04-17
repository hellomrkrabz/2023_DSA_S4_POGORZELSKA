import React, { useEffect, useState } from "react";
import axios from 'axios'

var sessionUserKey= sessionStorage.getItem("sessionUserKey")

function Logout() {

    useEffect(() => {
        axios.post("http://localhost:5000/user_validation/logout", {
            key: sessionUserKey,
        })
        sessionStorage.removeItem("sessionUserUsername")
        sessionStorage.removeItem("sessionUserKey")
        window.location.replace("/")
    }, []);
}

export default Logout;
