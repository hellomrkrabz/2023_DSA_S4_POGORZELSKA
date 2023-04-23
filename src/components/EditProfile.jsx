import React, { useState } from "react";
import axios from "axios"
import TextField from "@mui/material/TextField"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

function EditProfile(props) {

    const [username, setUsername] = useState(props.username ?? "")
    const [address, setAddress] = useState(props.city ?? "")
    const [contact, setContact] = useState(props.phone_number ?? "")
    const [bio, setBio] = useState(props.details ?? "")
    const [avatar, setAvatar] = useState(props.avatar ?? "")


    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showPassword, setShowPassword] = useState(true)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const [showNewPassword, setShowNewPassword] = useState(true)
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)

  return (
    <>
        <div className="d-flex justify-content-center border mt-3 mb-5 align-item-center rounded-2 bg-banana-blue bg-opacity-25 col-8">
            <div className="col-10">
                <h2>Personal Information:</h2>
                <div>
                    <div className="d-flex mb-3 justify-content-center">
                        <div>
                            <img src={avatar} width="200px"></img>
                        </div>
                        <div className="align-self-center col-3">
                            <label className="ms-3 col-12 btn btn-banana-primary" >
                                <input type="file" className="visually-hidden" accept="image/png, image/gif, image/jpeg" 
                                onChange={(e)=>{
                                    const fileReader = new FileReader()
                                    fileReader.readAsDataURL(e.target.files[0])
                                    fileReader.onload = function(e) {
                                        setAvatar(e.target.result)
                                    }  

                                    }}/>
                                Upload Profile Picture
                            </label>
                        </div>
                    </div>
                </div> 
                <div className="row gx-5">
                    <div className="col-4">
                        <TextField
                            id="username"
                            label="Username"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="col-4">
                        <TextField
                            id="address"
                            label="Address"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="col-4">
                        <TextField
                            id="contact"
                            label="Contact"
                            fullWidth
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <h2>Bio:</h2>
                    <TextField
                        id="bio"
                        multiline
                        rows={6}
                        fullWidth 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div className="row gx-5 d-flex justify-content-center">
                    <div className="d-flex justify-content-center mt-2 col-4">
                        <button id="apply" name="apply" className="btn btn-banana-primary col-12" onClick={() => {
                            axios.post("http://localhost:5000/profile/edit_details", {
                                "email":props.email,
                                "username":username,
                                "address":address,
                                "bio":bio,
                                "contact":contact,
                                "avatar":avatar
                            }).then((response) => { if (response = "OK") { console.log("we happy") } else { console.log("we not happy") } });                     
                        }}>Apply</button>
                    </div>         
                </div>
                <div>
                    <h2>Password:</h2>
                    <div className="row gx-5">
                        <div className="col-4">
                            <OutlinedInput
                                id="password"
                                placeholder="Password"
                                type={showPassword ? 'password' : 'text'}
                                value={password}
                                fullWidth
                                onChange={(e) => { setPassword(e.target.value) }} 
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </div>
                        <div className="col-4">
                            <OutlinedInput
                                id="newPassword"
                                placeholder="New Password"
                                type={showNewPassword ? 'password' : 'text'}
                                value={newPassword}
                                fullWidth
                                onChange={(e) => { setNewPassword(e.target.value) }}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </div>
                        <div className="col-4">
                            <OutlinedInput
                                id="confirmPassword"
                                placeholder="Confirm New Password"
                                type={showConfirmPassword ? 'password' : 'text'}
                                value={confirmPassword}
                                fullWidth
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </div>
                    </div>
                    <div className="row gx-5 d-flex justify-content-center">
                        <div className="mt-2 col-4">
                            <button id="changePassword" name="changePassword" className="btn btn-banana-primary col-12" onClick={() => {
                                axios.post("http://localhost:5000/profile/edit_password", {
                                    "email":props.email,
                                    "password":password,
                                    "newPassword":newPassword,
                                    "confirmPassword":confirmPassword
                                }).then((response) => { if (response = "OK") { console.log("we happy") } else { console.log("we not happy") } });
                            }}>Change Password</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
  );
}

export default EditProfile;
