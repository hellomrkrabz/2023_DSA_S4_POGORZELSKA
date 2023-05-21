import { Link } from "react-router-dom";
import ScoreComponent from "./ScoreComponent";

function ProfileOpinionsList(props) {

  return (
    <>
        <div className="mt-5 row">
            <p>Opinions</p>
            <div className="col-9 col-xl-10">
                <div className="row row-cols-1 row-cols-lg-2 gx-5 gy-2">
                    <div className="col">
                        <div className="card text-center ">
                            <div className="card-header">
                                {props.sender1} 
                                <ScoreComponent score={1.4}></ScoreComponent>
                            </div>
                            <div className="card-body">
                                {props.text1}
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card text-center ">
                            <div className="card-header">
                                {props.sender2} 
                                <ScoreComponent score={1.8}></ScoreComponent>
                            </div>
                            <div className="card-body">
                                {props.text2}
                            </div>
                        </div>  
                    </div>
        
                </div>
            </div>


            <div className="align-self-center col-3 col-xl-2">
                <Link to={props.moreLink}>
                    <button className="btn btn-banana-primary col-12">See more</button>
                </Link>
            </div>
        </div>
    </>
  );
}

export default ProfileOpinionsList;
