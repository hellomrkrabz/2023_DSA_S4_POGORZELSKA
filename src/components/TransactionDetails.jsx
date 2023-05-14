import { Link } from "react-router-dom";
import Book from "./Book.jsx";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"


function TransactionDetails(props) {
    //Matix we� to wyd�u� i popraw ksi��ke �eby nie by�o tego widma pls <3
    return (
        <>  
            <br></br>
            <div className="container-fluid d-flex flex-column align-items-center">
                <div className="row col-10 border bg-banana-blue bg-opacity-25 border-dark justify-content-between card">
                    <div className="card-body align-items-center row">
                        <div className="fw-normal fs-3 text-shadow-light mb-2">
                            Transaction Details:
                        </div>
                        <div className="fw-normal fs-5 text-shadow-light mb-2">
                            Username: PLACEHOLDER
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-2">
                            <Book variant="transactionDetails" {...props.book} key={v4()}> </Book>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 fw-normal fs-5 text-shadow-light">
                            <div className="mb-2">
                                Title:
                            </div>
                            <div className="mb-2 col-12">
                                <TextField
                                    disabled
                                    id="title"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                            <div className="mb-2">
                                Author:                             
                            </div>
                            <div className="mb-2 col-12">
                                <TextField
                                    disabled
                                    id="author"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                            <div className="mb-2">
                                ISBN:                                 
                            </div>
                            <div className="mb-2 col-12">
                                <TextField
                                    disabled
                                    id="isbn"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>                         
                            <div className="mb-2">
                                Book Condition:                               
                            </div>
                            <div className="mb-2 col-12">
                                <TextField
                                    disabled
                                    id="bookCondition"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 fw-normal fs-5 text-shadow-light">
                            <div className="mb-2">
                                Reservation Date:
                            </div>
                            <div className="mb-2 col-12 ">
                                <TextField
                                    disabled
                                    id="reservationDate"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                            <div className="mb-2">
                                Rent Date:
                            </div>
                            <div className="mb-2 col-12 ">
                                <TextField
                                    disabled
                                    id="rentDate"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                            <div className="mb-2">
                                Return Date:
                            </div>
                            <div className="mb-2 col-12 ">
                                <TextField
                                    disabled
                                    id="returnDate"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <div className="mb-2">
                                        Status:
                                    </div>
                                <div className="d-flex align-items-center justify-content-center bg-secondary text-black p-3 rounded">

                                    PLACEHOLDER
                                </div>
                        </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-banana-primary col-12 col-lg-6 col-xl-4 p-2" onClick={() => { props.updateShowDetailsFromChildren(false) }}>Hide Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionDetails;
