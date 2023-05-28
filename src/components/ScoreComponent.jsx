import React from "react";
import starts_5 from "../media/5na5.png"
import starts_4 from "../media/4na5.png"
import starts_3 from "../media/3na5.png"
import starts_2 from "../media/2na5.png"
import starts_1 from "../media/1na5.png"
//★☆

//var [score, setScore] = useState("kurwa")
var score

function ScoreComponnent(props) {
    var score_src
    
    switch(Math.round(props.score)){
        case 1:
            score_src = starts_1
        break;

        case 2:
            score_src = starts_2
        break;

        case 3:
            score_src = starts_3
        break;

        case 4:
            score_src = starts_4
        break;

        case 5:
            score_src = starts_5
        break;

        default:
            score_src = starts_5
        break;
    }   

    return(
        <>
            <img src={score_src}  style={{width: "100%",height:"100%", objectFit: "cover"}} />
        </>
    );
}

export default ScoreComponnent;
