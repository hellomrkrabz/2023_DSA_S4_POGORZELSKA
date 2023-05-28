import { Link } from "react-router-dom";
import ScoreComponent from "./ScoreComponent";

function ProfileOpinionsList(props) {

  return (
    <>
        <div className="mt-5 row mb-5">
            <p className="fs-5 fw-semibold">Opinions</p>
            <div className="col-9 col-xl-10">
                <div className="row row-cols-1 row-cols-lg-2 gx-5 gy-2">
                    <div className="col">
                        <div className="card text-center ">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="fs-5 fw-semibold">
                                    {props.sender1}
                                </div>
                                <div className="col-4">
                                    <ScoreComponent score={1.4}></ScoreComponent>
                                </div>
                            </div>
                            <div className="card-body">
                                {props.text1}
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card text-center ">
                        <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="fs-5 fw-semibold">
                                    {props.sender2}
                                </div>
                                <div className="col-4">
                                    <ScoreComponent score={2.8}></ScoreComponent>
                                </div>
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
