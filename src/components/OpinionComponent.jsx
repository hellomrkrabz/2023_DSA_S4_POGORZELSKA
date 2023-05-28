import React from "react";
import ScoreComponnent from "./ScoreComponent";
import reportWarning from "../media/reportWarning.png"
import IconButton from "@mui/material/IconButton"

function OpinionComponent(props) {

    return (
        <>
            <div className="bg-light rounded-3 d-flex flex-column">
                <div className="bg-banana-blue rounded-top d-flex justify-content-between align-items-center px-2 py-1 fw-semibold">
                    {props.details.user}
                    <div className="col-7">
                        <ScoreComponnent score={props.details.score}/>
                    </div>
                </div>
                <div className="flex-grow-1 d-flex px-3 pt-3">
                    <p className="col-9 overflow-hidden" style={{height: "70px",}}>{props.details.content}</p>
                    <div className="col-2 d-flex justify-content-end align-items-end align-self-bottom flex-grow-1">
                        <img className="mb-2 bg-banana-blue bg-opacity-25 p-1 me-2 rounded-1" src={reportWarning} onClick={()=>{
                            props.setDetails(props.details)
                            props.setDisplayDetails(true)
                            }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default OpinionComponent;
