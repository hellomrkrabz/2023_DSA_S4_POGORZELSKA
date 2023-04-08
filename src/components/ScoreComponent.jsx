import React from "react";
//★☆

//var [score, setScore] = useState("kurwa")
var score=""

function ScoreComponnent(props) {

    score=""
    for(var i = 0; i < 5; i++)
    {
        if(i < Math.round(props.score))
        {
            score += '★'
        }
        else
        {
            score += '☆'
        }
    }       

    return(
        <div>
            {score}
        </div>
    );
}

export default ScoreComponnent;
