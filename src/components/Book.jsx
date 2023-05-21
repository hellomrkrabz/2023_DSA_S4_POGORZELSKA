import React from "react";
import { Link } from "react-router-dom";
import banana from "./../media/banana.png"
import './../style/bootstrap/css/main_style.css'

function Book(props) {
    return(
        <>
        {props.variant==="small" &&
        <>
            <div className="col">
                <div key={props.book_id} className="d-flex flex-column align-items-center">
                    <div >
                        <div className="book-title">
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
            <div className={`col-12 flex-grow-1 ${props.border ? "border":""}` }>
                <img src={props.src} style={{width: '100%',}}/>
                <p>{props.title}</p>

                {props.description}<br />

                <Link to={props.link}>
                    <button className="btn btn-banana-primary-dark ms-2 mt-4">Details</button>
                </Link>
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
