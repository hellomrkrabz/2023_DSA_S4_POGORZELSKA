import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banana from "./../media/banana.png"
import './../style/bootstrap/css/main_style.css'

function Book(props) {
    return(
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
                        <img src={props.src} alt="book" height="200"/>
                    }

                    {props.src === undefined &&
                        <img src={banana} alt="book" height="200"/>
                    }
                    
                </div> 
            </Link>
        </div>
    );
}

export default Book;
