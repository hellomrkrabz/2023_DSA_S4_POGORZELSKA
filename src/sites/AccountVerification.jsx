import React, { useEffect, useState } from "react";
import axios from 'axios'
import { v4 } from 'uuid';
import Navbar from './../components/Navbar'

function AccountVerification() {

    const [verification, setVerification] = useState(false)
    const [verificationString, setVerificationString] = useState("")


    useEffect(() => {
        const pathParts = window.location.pathname.split('/')
        setVerificationString(pathParts.pop())
        axios.post("http://localhost:5000/account_verification", {
            sentVerificationString: verificationString
        }).then((response) => {
            if (response.data.msg == "true") {
                setVerification(true)
            }
        });
       
    }, []);

    
    return (
        <>
            <div>
                <Navbar site={"/"} />
            </div>

            Account {verification ? "verified" : "not verified" }.

        </>
    );
}

export default AccountVerification;