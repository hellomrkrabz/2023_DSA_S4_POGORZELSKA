import Book from "./Book.jsx";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios';
import Popup from 'reactjs-popup';
import SelectButBetter from 'react-select';
import fancyStatusTranslator from "../scripts/fancyStatusTranslator.js";
import findCookie from "../scripts/findCookie.jsx";


function TransactionDetails(props) {
    const [transactionId, setTransactionID] = useState(props.detailsKey);
    const [username, setUsername] = useState(props.user);
    const [ownerName, setOwnerName] = useState(props.ownerName);
    const [title, setTitle] = useState(props.title);
    const [author, setAuthor] = useState(props.author);
    const [isbn, setIsbn] = useState(props.isbn);
    const [reservationDate, setReservationDate] = useState(props.reservationDate);
    const [rentDate, setRentDate] = useState(props.rentDate);
    const [returnDate, setReturnDate] = useState(props.returnDate);
    const [condition, setCondition] = useState(props.condition);
    const [status, setStatus] = useState(props.status);
    const [book, setBook] = useState(props.book);
    const [ownedBook, setOwnedBook] = useState(props.ownedBook);
    const [coverPhoto, setCoverPhoto] = useState(props.coverPhoto);
    const [borrowerId, setBorrowerId] = useState(props.borrowerId);
    const [ownerId, setOwnerId] = useState(props.ownerId);
    const [displayAddOpinion, setDisplayAddOpinion] = useState(false);
    const [opinionContent, setOpinionContent] = useState("");
    const [opinionScore, setOpinionScore] = useState(0);

    const [convertedReturnDate, setConvertedReturnDate] = useState(new Date(props.returnDate))
    var currentDate = new Date();
    const [minDate, setMinDate] = useState(new Date())
    var sessionUserId = findCookie("sessionUserId")

    const reload = () => {
        window.location.replace("Transactions/"+ transactionId)
    }

    let opinionScoreOptions = [
        {
            value: 1,
            label: 1
        },
        {
            value: 2,
            label: 2
        },
        {
            value: 3,
            label: 3
        },
        {
            value: 4,
            label: 4
        },
        {
            value: 5,
            label: 5
        },
    ]
    

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
                            Username:   {borrowerId==sessionUserId ?
                                            <div>{ownerName}</div>
                                            :
                                            <div>{username}</div>
                                        }
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

                                    {fancyStatusTranslator(status)}
                                </div>
                            </div>
                        </div>

                        
                        {/* FIXME: remove d-none class from all divs, I added it only for development */}
{/* status = 1 (reservation) and user = book_owner =======================================================================================================================*/}
                        {status==="reservation" && sessionUserId == ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">

                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            reservation_date:null,
                                            rent_date:null,
                                            return_date:null,
                                            book_id:ownedBook,
                                            state:2,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Accept Reservation</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-outline-danger col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            reservation_date:null,
                                            rent_date:null,
                                            return_date:null,
                                            book_id:ownedBook,
                                            state:10,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Reject Reservation</button>
                                </div>
                            </div>
                        }
{/* =======================status = 3 (your_turn) user = borrower================================================================================================ */}
                        {status==="your_turn" && sessionUserId == borrowerId &&
                            <div className="col-12 mb-3 d-flex align-items-stretch mt-3 ">
                                <div className="row col-6 gy-3">
                                    <div className="col-4">
                                        From:
                                    </div>  
                                    <div className="col-6">
                                        <input type="date" id="" value={rentDate} onChange={(e)=>{
                                            setRentDate(e.target.value)

                                            let result = new Date(e.target.value);
                                            result.setDate(result.getDate() + 1);
                                            let year = result.getFullYear();
                                            let month = String(result.getMonth() + 1).padStart(2, '0');
                                            let day = String(result.getDate()).padStart(2, '0');

                                            let tmpDate = year + '-' + month + '-' + day;
                                            setMinDate(tmpDate)

                                        }} className="form-control"/>
                                    </div>
                                    <div className="col-4">
                                        To:
                                    </div>
                                    <div className="col-6">
                                        <input type="date" id="" min={minDate.toString()} value={returnDate} onChange={(e)=>{setReturnDate(e.target.value)}} className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-center align-items-stretch">
                                    <button className="btn btn-banana-primary col-6" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:4,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}
                                    >Submite rent period</button>
                                </div>
                            </div>
                        }
{/* status = 4 (rent_period_confirmation???) and user = book_owner =======================================================================================================================*/}
                        {status==="dates_chosen" && sessionUserId == ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:6,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Confirm reservation period</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-outline-danger col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:5,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Reject reservation period</button>
                                </div>
                            </div>
                        }
{/* =======================status = 5 (dates_rejected) user = borrower================================================================================================ */}
                        {status==="dates_rejected" && sessionUserId == borrowerId &&
                            <div className="col-12 mb-3 d-flex align-items-stretch mt-3 ">
                                <div className="row col-6 gy-3">
                                    <div className="col-4">
                                        From:
                                    </div>  
                                    <div className="col-6">
                                        <input type="date" id="" value={rentDate} onChange={(e)=>{setRentDate(e.target.value)}} className="form-control"/>
                                    </div>
                                    <div className="col-4">
                                        To:
                                    </div>
                                    <div className="col-6">
                                        <input type="date" id="" value={returnDate} onChange={(e)=>{setRentDate(e.target.value)}} className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-center align-items-stretch">
                                    <button className="btn btn-banana-primary col-6" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:4,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}
                                    >Submite new rent period</button>
                                </div>
                            </div>
                        }
{/* status = 6 (accepted_date)  and user = book_owner =======================================================================================================================*/}
                        {status==="accepted_date" && sessionUserId == ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:7,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Confirm book passing</button>
                                </div>
                            </div>  
                        }             
{/* status = 7 (passed_down)  and user = borrower =======================================================================================================================*/}
                        {status==="passed_down" && sessionUserId == borrowerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:8,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Confirm book receipt</button>
                                </div>
                            </div>   
                        } 
{/* status = 8 (lent)  and user = borrower =======================================================================================================================*/}
                        {status==="lent" && sessionUserId == borrowerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:9,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Book returned</button>
                                </div>
                            </div>   
                        }
{/* status = 8 (lent)  and user = book_owner and deadline overdue =======================================================================================================================*/}
                        {status==="lent" && currentDate > convertedReturnDate && sessionUserId == ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:12,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Book not returned</button>
                                </div>
                            </div>  
                        }
{/* status = 9 (returned)  and user = book_owner =======================================================================================================================*/}
                        {status==="returned" && sessionUserId == ownerId &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:11,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Confirm book receipt</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-outline-danger col-12" onClick={()=>{
                                        axios.post("http://localhost:5000/api/transaction/edit", {
                                            rent_date:rentDate,
                                            return_date:returnDate,
                                            book_id:ownedBook,
                                            state:12,
                                            borrower_id:borrowerId,
                                            id:transactionId,
                                        }).then(()=>{
                                            reload()
                                        })
                                    }}>Book not delivered</button>
                                </div>
                            </div>   
                        }
{/* status = 11 (successfully_finished)  and user = book_owner or borrower =======================================================================================================================*/}
                        {status==="successfully_finished" && 
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        setDisplayAddOpinion(true)
                                    }} >Review</button>
                                </div>
                            </div> 
                        }
{/* status = 12 (unsuccessfully_finished)  and user = book_owner or borrower =======================================================================================================================*/}
                        {status==="unsuccessfully_finished" &&
                            <div className="col-12 d-flex justify-content-around py-2 align-items-center">
                                <div className="col-3">
                                    <button className="btn btn-banana-primary col-12" onClick={()=>{
                                        setDisplayAddOpinion(true)
                                    }} >Review</button>
                                </div>
                            </div> 
                        }

                        <Popup id="popup" open={displayAddOpinion} position="bottom" onClose={()=>setDisplayAddOpinion(false)}>
                            <div className="d-flex justify-content-center row">
                                <div className="d-flex flex-column col-10">
                                    <h2 className="d-flex justify-content-start">Opinion content</h2>
                                    <TextField multiline
                                        rows={4}
                                        style={{backgroundColor:"white"}} 
                                        value={opinionContent} 
                                        onChange={(e)=>{setOpinionContent(e.target.value)}} 
                                    />
                                    <h2 className="d-flex justify-content-start">Opinion score</h2>
                                    <SelectButBetter
                                        value={opinionScore}
                                        options={opinionScoreOptions}
                                        onChange={setOpinionScore}
                                    />

                                </div>
                                <button className="btn btn-banana-primary col-3 mt-3" onClick={()=>{
                                    const date = new Date();
                                    if(sessionUserId == borrowerId){
                                        axios.post("http://localhost:5000/api/opinion/add", {
                                            rating: opinionScore.value,
                                            visible: true,
                                            content: opinionContent,
                                            borrower_id: ownerId,
                                            renter_id: borrowerId
                                        }).then(()=>{
                                            reload()
                                            setDisplayAddOpinion(false);
                                        })
                                    }else{
                                        axios.post("http://localhost:5000/api/opinion/add", {
                                            rating: opinionScore.value,
                                            visible: true,
                                            content: opinionContent,
                                            borrower_id: borrowerId,
                                            renter_id: ownerId
                                        }).then(()=>{
                                            setDisplayAddOpinion(false);
                                        })
                                    }
                                }}>Add opinion</button>
                            </div>
                        </Popup>

                        <hr className="mt-5"/>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-banana-primary col-12 col-lg-6 col-xl-4 p-2" onClick={() => 
                                {
                                    props.updateShowDetailsFromChildren(false) 
                                    if(window.location.pathname.split('/').length === 3)
                                    {
                                        //window.location.replace("/Transactions");
                                        history.pushState({}, null, "/Transactions");
                                    }
                                }}>Hide Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionDetails;
