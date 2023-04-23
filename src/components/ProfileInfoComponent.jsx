import React from "react";
import ScoreComponnent from "./ScoreComponent";
import TextField from "@mui/material/TextField"

function ProfileInfoComponent(props) {

  return (
    <>
        <div>
            <img className="circle col-12 border border-5 border-banana-blue mt-1"src={props.avatar} height="300px" alt="monke"/> 
        </div>
        <div className="fw-normal fs-3 text-shadow-light">{props.username}</div>
        <div className="mt-3">
            <div className="fw-bold">User rating</div>
            <div className="ms-5">
                <ScoreComponnent score={props.rating}></ScoreComponnent>
            </div>
        </div>

        <div className="mt-3">&#128205; {props.city}</div>

        <div className="mt-5 d-flex justify-content-center ms-3 me-3">
            <TextField
                disabled
                id="bio"
                label="Bio"
                value={props.details}
                multiline
                rows={6}
                fullWidth
            />
        </div>
    </>
  );
}

export default ProfileInfoComponent;
