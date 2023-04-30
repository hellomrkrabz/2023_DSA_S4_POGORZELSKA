import { Link } from "react-router-dom";
import Book from "./Book.jsx";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

function Transaction(props) {
    const [showDetails, setShowDetails] = useState(false);
    const [username, setUsername] = useState(props.user);
    const [title, setTitle] = useState("Titel");
    const [author, setAuthor] = useState("Writer");
    const [isbn, setIsbn] = useState(props.isbn);
    const [bookCondition, setBookCondition] = useState(props.bookCondition);
    const [reservationDate, setReservationDate] = useState(props.reservationDate);
    const [rentDate, setRentDate] = useState(props.rentDate);
    const [status, setStatus] = useState(props.status);
    const [isFinished, setIsFinished] = useState((props.status === "finished" || props.status === "failed") ? true : false); //do zmiany na faktyczne statusy
    const [returnDate, setReturnDate] = useState(props.returnDate);
    const [book, setBook] = useState(props.book);

    useEffect(
        () => {
            setTitle(book.title);
            setAuthor(book.author);
        }
    );

    return (
        <>
            {showDetails ?
                <>
                    <div>
                    <button className="btn btn-banana-primary col-2" onClick={() => { setShowDetails(!showDetails) }}>Hide Details</button>
                    </div>
                </>
                :
                <>
                    <div class="container-fluid d-flex flex-column align-items-center">
                        <div class="row col-10 border bg-banana-blue bg-opacity-25 border-dark justify-content-between card">  
                            <div className="card-body justify-content-between align-items-center row">
                                    <div className="col-2">
                                        <Book variant="small" {...props.book} key={v4()}> </Book>
                                    </div>
                                    <div className="col-6 fw-normal fs-4 text-shadow-light">
                                        <div>
                                            {reservationDate}
                                        </div>
                                        <div className="fs-6">
                                            {title}
                                        </div>
                                        <div>
                                            <br></br>
                                        </div>
                                        <div>
                                            {username}
                                        </div>
                                    </div>
                                    <div className="col-4 row h-25">
                                    <div className="col-6 d-flex align-items-center justify-content-center bg-secondary text-black">
                                            {status}
                                        </div>    
                                        <button className="btn btn-banana-primary col-6" onClick={() => { setShowDetails(!showDetails) }}>Details</button>
                                    </div>
                            </div>                                              
                        </div>
                    </div>
                </>
            }
       </>
    );
}

export default Transaction;
