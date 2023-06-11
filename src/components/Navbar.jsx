import React, { useEffect, useState } from "react";
import banana from './../media/banana.png'



function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-banana-blue">
        <div className="container-fluid">
            <a className="navbar-brand btn fidget-spinner" href="/">
                Banana Books
                <img src={banana} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            </a>

            <div className="d-flex flex-end">
            {props.site == "Register" && 
                <a className="btn btn-banana-white-outline" href="/Login">Login</a>
            }
            {props.site == "Login" && 
                <a className="btn btn-banana-white-outline" href="/Register">Sign Up</a>
            }
            {props.site == "/" && 
                <>
                    <a className="btn btn-banana-white-outline" href="/Login">Login</a>
                    <a className="btn btn-banana-white-outline" href="/Register">Sign Up</a>
                </>
            }
            {props.site == "/Library" && 
                <>
                    <a className="btn btn-banana-white-outline" href={"/Transactions"}>Transactions</a>
                    <a className="btn btn-banana-white-outline" href={"/Profile/"+props.username}>My Profile</a>
                    <a className="btn btn-banana-white-outline" href="/Logout">Logout</a>
                </>
            }
            {props.site == "/Profile" && 
                <>
                    <a className="btn btn-banana-white-outline" href={"/Transactions"}>Transactions</a>
                    {props.isLoggedIn ?
                        props.isEditing ? 
                            <a className="btn btn-banana-white-outline" onClick={()=>props.setIsEditing(false)}>Profile</a>
                        :
                            <a className="btn btn-banana-white-outline" onClick={()=>props.setIsEditing(true)}>Edit Profile</a>
                    :
                        <a className="btn btn-banana-white-outline" href={"/Profile/"+props.username}>My Profile</a>
                      }
                      <a className="btn btn-banana-white-outline" href="/Logout">Logout</a>
                </>
            }
            {props.site == "/Transactions" &&
                <>
                    <a className="btn btn-banana-white-outline" href={"/Profile/" + props.username}>My Profile</a>
                    <a className="btn btn-banana-white-outline" href="/Logout">Logout</a>
                </>
            }
            {props.site == "/Reports" &&
                <>
                    {/* <a className="btn btn-banana-white-outline" href={"/Transactions"}>Transactions</a> */}
                    {/* <a className="btn btn-banana-white-outline" href={"/Profile/" + props.username}>My Profile</a> */}
                    <a className="btn btn-banana-white-outline" href={"/UserManagment"}>User managment</a>
                    <a className="btn btn-banana-white-outline" href="/Logout">Logout</a>
                </>
            }
            {props.site == "/UserManagment" &&
                <>
                    <a className="btn btn-banana-white-outline" href={"/Reports"}>Reports</a>
                    <a className="btn btn-banana-white-outline" href="/Logout">Logout</a>
                </>
            }
            {props.site == "/Opinions" &&
                <>
                    <a className="btn btn-banana-white-outline" href={"/Profile/" + props.username}>My Profile</a>
                    <a className="btn btn-banana-white-outline" href="/Logout">Logout</a>
                </>
            }
            {props.site == "/FrontPage" && 
                <>
                {props.isLoggedIn ?
                <>
                    <a className="btn btn-banana-white-outline" href={"/Transactions"}>Transactions</a>
                    <a className="btn btn-banana-white-outline" href={"/Profile/" + props.username}>My Profile</a>
                    <a className="btn btn-banana-white-outline" href="/Logout">Logout</a>
                </>
                :
                <>
                    <a className="btn btn-banana-white-outline" href="/Login">Login</a>
                    <a className="btn btn-banana-white-outline" href="/Register">Sign Up</a>
                </>
                }
                
             </>
            }
            {props.site == "/Help" && 
                <>
                {props.isLoggedIn ?
                <>
                    <a className="btn btn-banana-white-outline" href={"/Transactions"}>Transactions</a>
                    <a className="btn btn-banana-white-outline" href={"/Profile/" + props.username}>My Profile</a>
                    <a className="btn btn-banana-white-outline" href="/Logout">Logout</a>
                </>
                :
                <>
                    <a className="btn btn-banana-white-outline" href="/Login">Login</a>
                    <a className="btn btn-banana-white-outline" href="/Register">Sign Up</a>
                </>
                }
                
             </>
            }
            </div>

        </div>
    </nav>
  );
}

export default Navbar;
