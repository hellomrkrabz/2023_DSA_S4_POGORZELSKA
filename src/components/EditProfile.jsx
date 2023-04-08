import React, { useEffect, useState, Component } from "react";

function submit() 
    {
        axios.post("http://localhost:5000/nwm/XD", {
            //sentEmail: newEmail,
        }).then((response) => { if (response = "OK") { console.log("we happy") } else { console.log("we not happy") } });
    }

function EditProfile(props) {

  return (
    <>
        <div>
            edit
        </div>
        <div>
            {props.name}
        </div>
    </>
  );
}

export default EditProfile;
