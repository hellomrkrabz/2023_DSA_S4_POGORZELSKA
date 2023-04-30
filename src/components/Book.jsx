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
                <div key={props.id} className="d-flex flex-column align-items-center">
                    <Link to={props.link}>
                        <div >
                            <div className="book-title">
                                <div className="d-flex flex-column justify-content-center h-100">
                                    {props.title}<br/>
                                    {props.author}
                                </div>
                            </div>
                            {props.src !== undefined &&
                                <img src={props.src} alt="book" height="200" width="130"/>
                            }

                            {props.src === undefined &&
                                <img src={banana} alt="book" height="200" width="130"/>
                            }
                            
                        </div> 
                    </Link>
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
        </>
    );
}

export default Book;
