import React, { useEffect, useState } from "react";
import Textfield from '@mui/material/TextField'
import popupStyle from "../style/popup_style.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function DetailedReportComponent(props) {
    const [openPopup, setOpenPopup] = useState(false);
    const [popupType, setPopupType] = useState("")


    // useEffect(() => {
    //     console.log(openPopup)
    //     console.log(popupType)
    // }, [openPopup,popupType]);
    return (
        <>
            <div className="row col-8 bg-light border border-dark mt-3 container-fluid d-flex flex-column align-items-center">
                <div className="col-10">
                    <h1>Report Details</h1>
                    <div className="row">
                        <div className="col-6">
                            <div>Reporting User</div>
                            <Textfield 
                                disabled
                                value={props.reporter}
                                />
                            <div>Report Date</div>
                            <Textfield 
                                disabled
                                value={props.reportDate}
                                />
                        </div>
                        <div className="col-6">
                        <div>Reported User</div>
                            <Textfield 
                                disabled
                                value={props.reported}
                                />
                            <div>Report Date</div>
                            <Textfield 
                                disabled
                                value={props.opinionDate}
                                />
                        </div>
                    </div>
                    <div className="row container-fluid d-flex flex-column align-items-center">
                        <h4 className="col-6">Report status</h4>
                        {props.status==="pending" &&
                            <div className="col-6 bg-warning">{props.status}</div>
                        }
                        {props.status==="resolved" &&
                            <div className="col-6 bg-success">{props.status}</div>
                        }
                    </div>
                    <div className="row container-fluid d-flex flex-column align-items-center">
                        <h4>Opinion Content</h4>
                        <Textfield 
                            disabled
                            multiline
                            rows={4}
                            value={props.opinionContent}
                            />
                    </div>
                    <div className="row container-fluid d-flex flex-column align-items-center">
                        <h4>Report Content</h4>
                        <Textfield 
                            disabled
                            multiline
                            rows={4}
                            value={props.reportContent}
                            />
                    </div>
                    <div className="row container-fluid d-flex justify-content-center">
                        <button className="col-3"
                            onClick={()=>{
                                setPopupType("warn")
                                setOpenPopup(true)
                            }}
                            >Warn User</button>
                        <button className="col-3 m-auto"
                            onClick={()=>{
                                setPopupType("ban")
                                setOpenPopup(true)
                            }}
                            >Ban User</button>{/*kek*/}
                        <button className="col-3"
                            onClick={()=>{
                                setPopupType("ignore")
                                setOpenPopup(true)
                            }}
                            >Ignore User</button>
                    </div>
                    <Popup open={openPopup} onClose={() => { setOpenPopup(false) }}>
                        <div>
                            {popupType==="warn" &&
                                <div>
                                    <p>Are you sure you want to warn {props.reported}?</p>
                                    <button
                                        onClick={()=>{
                                            console.log("canceled")
                                            setPopupType("")
                                            setOpenPopup(false)
                                        }}
                                        >Cancel</button>
                                    <button
                                        onClick={()=>{
                                            console.log("warned")
                                            setPopupType("")
                                            setOpenPopup(false)
                                            props.setDisplayDetails(false)
                                        }}
                                        >Continue</button>
                                </div>
                            }
                            {popupType==="ban" &&
                                <div>
                                    <p>Are you sure you want to ban {props.reported}?</p>
                                    <button
                                        onClick={()=>{
                                            console.log("canceled")
                                            setPopupType("")
                                            setOpenPopup(false)
                                        }}
                                        >Cancel</button>
                                    <button
                                        onClick={()=>{
                                            console.log("banned")
                                            setPopupType("")
                                            setOpenPopup(false)
                                            props.setDisplayDetails(false)
                                        }}
                                        >Continue</button>
                                </div>
                            }
                            {popupType==="ignore" &&
                                <div>
                                    <p>Are you sure you want to ignore {props.reported}?</p>
                                    <button
                                        onClick={()=>{
                                            console.log("canceled")
                                            setPopupType("")
                                            setOpenPopup(false)
                                        }}
                                        >Cancel</button>
                                    <button
                                        onClick={()=>{
                                            console.log("ignored")
                                            setPopupType("")
                                            setOpenPopup(false)
                                            props.setDisplayDetails(false)
                                        }}
                                        >Continue</button>
                                </div>
                            }
                        </div>
                    </Popup>
                </div>
            </div>
        </>
    );
}

export default DetailedReportComponent;
