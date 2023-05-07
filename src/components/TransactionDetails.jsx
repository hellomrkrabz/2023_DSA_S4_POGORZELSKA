import { Link } from "react-router-dom";
import Book from "./Book.jsx";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";

function TransactionDetails(props) {
    //const [showDetails, setShowDetails] = useState(props.updateShowDetailsFromChildren);
    return (
        <>  
            <br></br>
            <div class="container-fluid d-flex flex-column align-items-center">
                <div class="row col-10 border bg-banana-blue bg-opacity-25 border-dark justify-content-between card">
                    <div className="card-body justify-content-between align-items-center row">
                        <div className="col-2">
                            <Book variant="small" {...props.book} key={v4()}> </Book>
                        </div>
                        <div className="col-6 fw-normal fs-4 text-shadow-light">
                            <div>

                            </div>
                            <div className="fs-6">

                            </div>
                            <div>
                                <br></br>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="col-4 row h-25">
                            <div className="col-6 d-flex align-items-center justify-content-center bg-secondary text-black">

                            </div>
                            <button className="btn btn-banana-primary col-6" onClick={() => { props.updateShowDetailsFromChildren(false) }}>Hide Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionDetails;
