import React, { useEffect, useState, Component } from "react";
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

function changePassword() 
{
    axios.post("http://localhost:5000/profile/edit_profile", {
        "password":password.value,
        "newPassword":newPassword.value,
        "confirmPassword":confirmPassword.value
    }).then((response) => { if (response = "OK") { console.log("we happy") } else { console.log("we not happy") } });
}

function apply()
{
    axios.post("http://localhost:5000/profile/edit_profile", {
        "username":username,
        "address":address,
        "bio":bio,
        "contact":contact,
        "avatar":avatar
    }).then((response) => { if (response = "OK") { console.log("we happy") } else { console.log("we not happy") } });
}

function EditProfile(props) {

    const [username, setUsername] = useState(props.username)
    const [address, setAddress] = useState(props.address)
    const [contact, setContact] = useState(props.contact)
    const [bio, setBio] = useState(props.bio)
    const [avatar, setAvatar] = useState(props.avatar)


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
        <div>
            <div>
                <h2>Personal Information:</h2>
                <img src={avatar} width="200px"></img>

                <label className="custom-file-upload">
                    <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(e)=>{
                        
                        const fileReader = new FileReader()
                        fileReader.readAsDataURL(e.target.files[0])
                        fileReader.onload = function(e) {
                            setAvatar(e.target.result)
                        }  

                        }}/>
                    Upload Profile Picture
                </label>
            </div>
            <div>
                <TextField
                    id="username"
                    label="Username"
                    value={username}
                    onChange={()=>setUsername(e.target.value)}
                />

                <TextField
                    id="address"
                    label="Address"
                    value={address}
                    onChange={()=>setAddress(e.target.value)}
                />

                <TextField
                    id="contact"
                    label="Contact"
                    value={contact}
                    onChange={()=>setContact(e.target.value)}
                />
            </div>
            <div>
                <h2>Bio:</h2>
                <TextField
                    id="bio"
                    multiline
                    rows={6}
                    fullWidth
                    value={bio}
                    onChange={()=>setBio(e.target.value)}
                />
            </div>
            <div className="d-flex justify-content-center mt-2">
                <button id="apply" name="apply" className="btn btn-banana-primary col-4" onClick={() => { apply() }}>Apply</button>
            </div>
            <div>
                <h2>Password:</h2>
                <OutlinedInput
                    id="password"
                    placeholder="Password"
                    type={showPassword ? 'password' : 'text'}
                    value={password}
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

                <OutlinedInput
                    id="newPassword"
                    placeholder="New Password"
                    type={showNewPassword ? 'password' : 'text'}
                    value={newPassword}
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

                <OutlinedInput
                    id="confirmPassword"
                    placeholder="Confirm New Password"
                    type={showConfirmPassword ? 'password' : 'text'}
                    value={confirmPassword}
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
            <div className="d-flex justify-content-center mt-2">
                <button id="changePassword" name="changePassword" className="btn btn-banana-primary col-4" onClick={() => { changePassword() }}>Change Password</button>
            </div>
        </div>
    </>
  );
}

export default EditProfile;
