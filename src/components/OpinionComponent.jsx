import React from "react";
import ScoreComponnent from "./ScoreComponent";

function OpinionComponent(props) {

    return (
        <>
            <div className="bg-light rounded-3">
                <div className="bg-banana-blue row rounded-top">{props.user}<ScoreComponnent score={props.score}/></div>
                <div>
                    <p>{props.content}</p>
                </div>
            </div>
        </>
    );
}

export default OpinionComponent;
