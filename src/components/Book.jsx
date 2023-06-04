import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import banana from "./../media/banana.png"
import './../style/bootstrap/css/main_style.css'
import Popup from 'reactjs-popup';
import popupStyle from "../style/popup_style.css"
import TextField from "@mui/material/TextField"
import axios from 'axios'

function Book(props) {

    var sessionUserKey= sessionStorage.getItem("sessionUserKey")

    const [displayDetails, setDisplayDetails] = useState(false)
    const [displayReserve, setDisplayReserve] = useState(true)
    const [ownerInfo, setOwnerInfo] = useState({ avatar: "",  email: "", id: -666,  key: "",  password: "", username: "" })

    // useEffect(()=>{
    //     console.log(displayDetails)
    // },[displayDetails])

    useEffect(()=>{
        if(props.owner_id!==undefined)
        {
            axios.get("http://localhost:5000/api/user/" + props.owner_id).then((response) => {
                setOwnerInfo(response.data.user)
            })
        }
    },[])

    return(
        <>
        {props.variant==="small" &&
        <>
            <div className="col" onClick={()=>setDisplayDetails(!displayDetails)}>
                <div key={props.book_id} className="d-flex flex-column align-items-center">
                    <div >
                        <div className="book-title">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <i>{props.title}</i><br/>
                                {props.author ?? "No author :("}
                            </div>
                        </div>
                        {props.cover_photo!=="notFound" ?
                            <img src={props.cover_photo} alt="book" height="200" width="130"/>
                            :
                            <img src={banana} alt="book" height="200" width="130"/>
                        }

                        <Popup 
                            open={displayDetails} 
                            position="right center" 
                            contentStyle={popupStyle} 
                            overlayStyle={popupStyle} 
                            arrowStyle={popupStyle} 
                            closeOnDocumentClick onClose={() => { setDisplayDetails(false) }}>  
                            <div>
                                <div className="row pt-4">
                                    <div className="col-5 mb-4 justify-content-center">
                                        {props.cover_photo!=="notFound" ?
                                            <img src={props.cover_photo} alt="book" height="340" width="230"/>
                                            :
                                            <img src={banana} alt="book" height="200" width="130"/>
                                        }
                                    </div>
                                    <div className="col-6 d-flex flex-column align-items-start ml-5">
                                        <label>Title</label>
                                        <TextField
                                            disabled
                                            value={props.title}
                                            className="bg-light col-12"
                                        />

                                        <label>Author</label>
                                        <TextField
                                            disabled
                                            value={props.author ?? "No author :("}
                                            className="bg-light col-12"
                                        />

                                        <label>ISBN</label>
                                        <TextField
                                            disabled
                                            value={props.isbn}
                                            className="bg-light col-12"
                                        />

                                        
                                        <Link to={"/Opinions/"+ownerInfo.username}>
                                            <label>Owner</label>
                                        </Link>
                                            <TextField
                                                disabled
                                                value={ownerInfo.username}
                                                className="bg-light col-12"
                                            />
                                        
                                        
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-2">
                                        {displayReserve===true ?
                                            <>
                                                <button className="btn btn-banana-primary col-4"
                                                onClick={()=>{
                                                    const date = new Date();
                                                    axios.post("http://localhost:5000/api/transaction/add", {
                                                        reservation_date: String(date.getFullYear()) + "-" + String(("0" + date.getMonth()).slice(-2)) + "-" + String(("0" + date.getDate()).slice(-2)),
                                                        rent_date:String(date.getFullYear()) + "-" + String(("0" + date.getMonth()).slice(-2)) + "-" + String(("0" + date.getDate()).slice(-2)),
                                                        return_date:String(date.getFullYear()) + "-" + String(("0" + date.getMonth()).slice(-2)) + "-" + String(("0" + date.getDate()).slice(-2)),
                                                        book_id:props.book_id,
                                                        state:"reservation",
                                                        borrower_key: sessionUserKey,
                                                    }).then(()=>{
                                                        setDisplayReserve(false)
                                                    })  
                                                }}>Borrow</button>
                                            </>
                                            :
                                            <>
                                                <div>Succesfully borrowed :)</div>
                                            </>
                                        }
                                </div>
                            </div>
                        </Popup>
                        
                    </div> 
                </div>
            </div>
        </>
        }

        {props.variant==="deprecatedSmall" &&
        <>
            <div className="col">
                <div key={props.book_id} className="d-flex flex-column align-items-center">
                    <div >
                        <div className={props.overlay===false ? "" : "book-title"}>
                            <div className="d-flex flex-column justify-content-center h-100">
                                {props.title}<br/>
                                {props.author?? "No author :("}
                            </div>
                        </div>
                        {props.cover_photo!=="notFound" ?
                            <img src={props.cover_photo} alt="book" height="200" width="130"/>
                            :
                            <img src={banana} alt="book" height="200" width="130"/>
                        }

                        {/* {props.imageLinks==="notFound" &&
                            <img src={banana} alt="book" height="200" width="130"/>
                        } */}
                        
                    </div> 
                </div>
            </div>
        </>
        }

        {props.variant==="medium" &&
        <>
            <div className={`col-12 d-flex flex-column justify-content-start align-items-center ${props.border ? "border":""}` }>
                <div className="col-12" style={{aspectRatio: "1/1"}}>
                    {props.cover_photo!=="notFound" ?
                        <img src={props.cover_photo} alt="book" style={{width: "100%",height:"100%", objectFit: "cover"}}/>
                        :
                        <img src={banana} alt="book" style={{width: "100%",height:"100%", objectFit: "cover"}}/>
                    }
                </div>

                <div className="col-12 d-flex flex-column justify-content-end align-items-center flex-grow-1 mb-3 px-3">
                    <div className="col-12 flex-grow-1 mb-2 text-break d-flex justify-content-center">{props.title}</div>
                    {props.description}
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <button className="btn btn-banana-primary-dark col-12 col-md-8 col-lg-7 col-xxl-4"
                            onClick={()=>{
                                setDisplayDetails(true)
                            }}
                        >Details</button>
                    </div>

                </div>

                <Popup 
                    open={displayDetails} 
                    position="right center" 
                    contentStyle={popupStyle} 
                    overlayStyle={popupStyle} 
                    arrowStyle={popupStyle} 
                    closeOnDocumentClick onClose={() => { setDisplayDetails(false) }}>  
                    <div>
                        <div className="row pt-4">
                            <div className="col-5 mb-4 justify-content-center">
                                {props.cover_photo!=="notFound" ?
                                    <img src={props.cover_photo} alt="book" height="340" width="230"/>
                                    :
                                    <img src={banana} alt="book" height="200" width="130"/>
                                }
                            </div>
                            <div className="col-6 d-flex flex-column align-items-start ml-5">
                                <label>Title</label>
                                <TextField
                                    disabled
                                    value={props.title}
                                    className="bg-light col-12"
                                />

                                <label>Author</label>
                                <TextField
                                    disabled
                                    value={props.author ?? "No author :("}
                                    className="bg-light col-12"
                                />

                                <label>ISBN</label>
                                <TextField
                                    disabled
                                    value={props.isbn}
                                    className="bg-light col-12"
                                />

                                <label>Owner</label>
                                <TextField
                                    disabled
                                    value={ownerInfo.username}
                                    className="bg-light col-12"
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center mb-2">
                                {displayReserve===true ?
                                    <>
                                        <button className="btn btn-banana-primary col-4"
                                        onClick={()=>{
                                            const date = new Date();
                                            axios.post("http://localhost:5000/api/transaction/add", {
                                                reservation_date: String(date.getFullYear()) + "-" + String(("0" + date.getMonth()).slice(-2)) + "-" + String(("0" + date.getDate()).slice(-2)),
                                                rent_date:String(date.getFullYear()) + "-" + String(("0" + date.getMonth()).slice(-2)) + "-" + String(("0" + date.getDate()).slice(-2)),
                                                return_date:String(date.getFullYear()) + "-" + String(("0" + date.getMonth()).slice(-2)) + "-" + String(("0" + date.getDate()).slice(-2)),
                                                book_id:props.book_id,
                                                state:"reservation",
                                                borrower_key: sessionUserKey,
                                            }).then(()=>{
                                                setDisplayReserve(false)
                                            })  
                                        }}>Borrow</button>
                                    </>
                                    :
                                    <>
                                        <div>Succesfully borrowed :)</div>
                                    </>
                                }
                        </div>
                    </div>
                </Popup>
            </div>
        </>
        }

        {props.variant === "transactionDetails" &&
            <>
                <div className="col">
                    <div key={props.id} className="d-flex flex-column align-items-center">
                        <Link to={props.link}>
                            <div >
                                {props.imageLinks !== undefined && props.imageLinks.smallThumbnail !== undefined &&
                                    <img src={props.imageLinks.smallThumbnail} alt="book" style={{width: "100%",height:"100%", objectFit: "cover"}}/>
                                }                               

                                {props.cover_photo !== "notFound" ?
                                    <img src={props.cover_photo} alt="book" height="200" width="130" />
                                    :
                                    <img src={banana} alt="book" height="500" width="325" />
                                }

                            </div>
                        </Link>
                    </div>
                </div>
            </>
        }

        {props.variant==="list" && props.industryIdentifiers!==undefined &&
        <>
            <div className="row col-11 justify-content-around mb-2 mt-2" value={props.industryIdentifiers[0].identifier}>
                <div className="col-4" value={props.industryIdentifiers[0].identifier}>
                    <div className="text-truncate bg-light rounded-2" value={props.industryIdentifiers[0].identifier} title={props.title}>
                        {props.title}
                    </div>
                </div>
                <div className="col-4" value={props.industryIdentifiers[0].identifier}>
                    <div className="text-truncate bg-light rounded-2" value={props.industryIdentifiers[0].identifier} title={props.authors? props.authors[0] : "No Authors"}>
                        {props.authors? props.authors[0] : "No Authors"}
                    </div>
                </div>
                <div className="col-4" value={props.industryIdentifiers[0].identifier}>
                    <div className="text-truncate bg-light rounded-2" value={props.industryIdentifiers[0].identifier} title={props.industryIdentifiers[0].identifier}>
                        {props.industryIdentifiers[0].identifier}
                    </div>
                </div>
            </div>
        </>
        }
        </>
    );
}

export default Book;
