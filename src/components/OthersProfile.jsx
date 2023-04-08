import React, { useEffect, useState, Component } from "react";
import ProfileBookList from "./ProfileBookList";
import ProfileOpinionsList from "./ProfileOpinionsList";
import ScoreComponnent from "./ScoreComponent";
import TextField from "@mui/material/TextField"

function OthersProfile(props) {

  return (
    <>
        <div className="container-fluid flex-grow-1 d-flex">
            <div className="row flex-grow-1">
                <div className="col-2 bg-banana-blue bg-opacity-25">
                    <div>
                        <img className="circle col-12 border border-5 border-banana-blue mt-1"src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/01/14/12/monkey-bananav3.jpg?width=1200" height="300px" alt="monke"/> 
                    </div>
                    <div className="fw-normal fs-3 text-shadow-light">Twoja stara mara lalala bala</div>
                    <div className="mt-3">
                        <div className="fw-bold">User rating</div>
                        <div className="ms-5">
                            <ScoreComponnent score={3}></ScoreComponnent>
                        </div>
                    </div>

                    <div className="mt-3">&#128205;South Park</div>

                    <div className="mt-5 d-flex justify-content-center ms-3 me-3">
                        <TextField
                            id="outlined-multiline-static"
                            label="Bio"
                            multiline
                            rows={6}
                            fullWidth
                        />
                    </div>
                </div>
                
                <div className="col-10 mt-5">

                    <ProfileBookList title={"Wanted Books"} moreLink={"/WantedBooks"}></ProfileBookList>

                    <ProfileBookList title={"Offered Books"} moreLink={"/OfferedBooks"} addLink={"/OfferedBooks"}></ProfileBookList>

                    <ProfileOpinionsList 
                        sender1={"idiot1"} text1={"not gut"} moreLink={"/Opinions"}
                        sender2={"idiot2"} text2={"it was great 2/10"}>
                    </ProfileOpinionsList>
                 </div>
            </div>
        </div>
    </>
  );
}

export default OthersProfile;
