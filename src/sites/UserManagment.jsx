import React, { useState } from "react";
import TextField from "@mui/material/TextField"
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/Navbar";
import axios from 'axios';

function UserManagment(props) {

    const [username, setUsername] = useState("")
    

    return (
        <>
            <div>
                <Navbar site={"/UserManagment"} isLoggedIn={true} username={props.username}/>
            </div>
        
            <div className="container-fluid h-100">
                <div className="row d-flex justify-content-center h-100">
                    <div className="col-8 mt-4 mb-4 border border-dark rounded-3 d-flex flex-column align-items-center justify-content-center"
                        style={{backgroundColor:"lightgrey"}}>
                        <TextField 
                            label={"username"}
                            value={username}
                            onChange={(e)=>{
                                setUsername(e.target.value)
                            }}
                            style={{backgroundColor:"white"}}
                            className="rounded-2"
                        />
                        <br/>
                        <button className="btn btn-banana-primary" onClick={()=>{
                            axios.post("http://localhost:5000/user_validation/change_user/"+username, {
                                permissions: "admin"
                            }).then(()=>{
                                alert("ok")
                            })
                        }}>Change user to admin</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserManagment;
