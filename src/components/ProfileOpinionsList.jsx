import { Link } from "react-router-dom";
import ScoreComponnent from "./ScoreComponent";

function ProfileOpinionsList(props) {

  return (
    <>
        <div className="mt-5 row">
            <p>Opinions</p>
            <div className="d-flex col-10 justify-content-around">
                <div className="card text-center col-4">
                    <div className="card-header">
                        {props.sender1} 
                        <ScoreComponnent score={1.4}></ScoreComponnent>
                    </div>
                    <div className="card-body">
                        {props.text1}
                    </div>
                </div>

                <div className="card text-center col-4">
                    <div className="card-header">
                        {props.sender2} 
                        <ScoreComponnent score={1.8}></ScoreComponnent>
                    </div>
                    <div className="card-body">
                        {props.text2}
                    </div>
                </div>      
            </div>

            <div className="align-self-center col-2">
                <Link to={props.moreLink}>
                    <button className="btn btn-banana-primary col-10">See more 3</button>
                </Link>
            </div>
        </div>
    </>
  );
}

export default ProfileOpinionsList;
