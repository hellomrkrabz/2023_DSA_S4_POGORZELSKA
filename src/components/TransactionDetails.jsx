import { Link } from "react-router-dom";
import Book from "./Book.jsx";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"



function TransactionDetails(props) {
    const [transactionId, setTransactionID] = useState(props.transactionID);
    const [username, setUsername] = useState(props.user);
    const [title, setTitle] = useState(props.title);
    const [author, setAuthor] = useState(props.author);
    const [isbn, setIsbn] = useState(props.isbn);
    const [reservationDate, setReservationDate] = useState(props.reservationDate);
    const [rentDate, setRentDate] = useState(props.rentDate);
    const [returnDate, setReturnDate] = useState(props.returnDate);
    const [condition, setCondition] = useState(props.condition);
    const [status, setStatus] = useState(props.status);
    const [book, setBook] = useState(props.book);
    const [coverPhoto, setCoverPhoto] = useState(props.coverPhoto);



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
                            Username: {username}
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-2">
                            <Book variant="transactionDetails" author={author} cover_photo={coverPhoto} title={title} key={book}> </Book>
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
                                    value={title}
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
                                    value={author}
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
                                    value={isbn}
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
                                    value={condition}
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
                                    value={reservationDate}
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
                                    value={rentDate}
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
                                    value={returnDate}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <div className="mb-2">
                                        Status:
                                    </div>
                                <div className="d-flex align-items-center justify-content-center bg-secondary text-black p-3 rounded">

                                    {status}
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
