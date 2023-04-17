import React, { useEffect, useState } from "react";
import axios from 'axios'
import { v4 } from 'uuid';
import Navbar from './../components/Navbar'
import bookshelf from './../media/bookshelf.png'

function AccountVerification() {

    const [verification, setVerification] = useState(false)

    useEffect(() => {
        const pathParts = window.location.pathname.split('/')
        axios.post("http://localhost:5000/user_validation/account_verification", {
            sentVerificationString: pathParts.pop()
        }).then((response) => {
            console.log(response)
            if (response.data.msg == "true") {
                setVerification(true)
            }
        });
       
    }, []);

    
    return (
        <>

            {verification ? <div className="col-6 align-self-center bg-banana-blue bg-opacity-25 d-flex flex-column align-items-center mt-5 border border-1 border-banana-blue rounded-2 ">
                <div className="mt-5 fs-3 fw-bold">Success, your account has been activated!</div>
                <div className="fs-5">You can log in to your account and start sharing!</div>
                <img src={bookshelf} width="400px"></img>
                <button className="btn btn-banana-primary col-3 mb-5 mt-3" onClick={() => {window.location.replace("/Login")}}>Login</button>
            </div> : <div className="col-6 align-self-center bg-banana-blue bg-opacity-25 d-flex flex-column align-items-center mt-5 border border-1 border-banana-blue rounded-2 ">
                <div className="mt-5">Your account has not been activated yet</div>
                <div>Please wait</div>
                <div href="https://www.youtube.com/watch?v=sVjk5nrb_lI" onClick={() => { document.getElementById('music_frame').src += '&autoplay=1'}}>
                    <img src="https://imgflip.com/s/meme/Waiting-Skeleton.jpg" width="200px"></img>
                </div>

                <iframe id="music_frame"width="420" height="1000" style={{display: "none"}}
                    src="https://www.youtube.com/embed/sVjk5nrb_lI?autoplay=1&playlist=sVjk5nrb_lI&loop=1&controls=0&showinfo=0">
                </iframe> 

                <button className="btn btn-banana-primary col-3 mb-5 mt-3 disabled">
                    <span class="spinner-border text-white spinner-border-sm" role="status" aria-hidden="true"></span>
                Login</button>
            </div> }




        </>
    );
}

export default AccountVerification;