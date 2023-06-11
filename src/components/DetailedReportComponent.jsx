import React, { useEffect, useState } from "react";
import Textfield from '@mui/material/TextField'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';

function DetailedReportComponent(props) {
    const [openPopup, setOpenPopup] = useState(false);
    const [popupType, setPopupType] = useState("")

    return (
        <>
            <div className="row col-8 bg-banana-blue bg-opacity-25 border border-dark mt-3 container-fluid d-flex flex-column align-items-center rounded p-5 pb-4">
                <div className="col-10 fw-semibold">
                    <h1 className="fw-semibold">Report Details:</h1>
                    <div className="row">
                        <div className="col-6">
                            <div>Reporting User</div>
                            <Textfield 
                                disabled
                                fullWidth
                                value={props.reporter_username}
                                />
                            <div>Report Date</div>
                            <Textfield 
                                disabled
                                fullWidth
                                value={props.reportDate}
                                />
                        </div>
                        <div className="col-6">
                        <div>Reported User</div>
                            <Textfield 
                                disabled
                                fullWidth
                                value={props.reported_username}
                                />
                            <div>Opinion Date</div>
                            <Textfield 
                                disabled
                                fullWidth
                                value={props.opinionDate}
                                />
                        </div>
                    </div>
                    <div className="row container-fluid d-flex flex-column align-items-center">
                        <h4 className="col-6 fw-semibold">Report status</h4>
                        {!props.status &&
                            <div className="col-6 bg-warning rounded p-2 text-center fs-3">Pending</div>
                        }
                        {props.status &&
                            <div className="col-6 bg-success rounded p-2 text-center fs-3">Resolved</div>
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
                    
                        <div className="row container-fluid d-flex justify-content-center mt-3">
                        {!props.status &&
                            <>
                            <button className="col-3 btn btn-banana-primary"
                                onClick={()=>{
                                    setPopupType("warn")
                                    setOpenPopup(true)
                                }}
                                >Warn User</button>
                            <button className="col-3 m-auto btn btn-banana-primary"
                                onClick={()=>{
                                    setPopupType("ban")
                                    setOpenPopup(true)
                                }}
                                >Ban User</button>{/*kek*/}
                            <button className="col-3 btn btn-banana-primary"
                                onClick={()=>{
                                    setPopupType("ignore")
                                    setOpenPopup(true)
                                }}
                                >Ignore User</button>
                            </>
                        }
                            <button className="col-5 btn btn-banana-primary ms-3 align-self-center mt-3" onClick={()=>{
                                props.setDisplayDetails(false)
                                }}>Back</button>
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
                                            axios.post("http://localhost:5000/user_validation/change_user/"+props.reported_username, {
                                                permissions: "warned",
                                            })
                                            axios.post("http://localhost:5000/api/report/edit", {
                                                content : props.opinionContent,
                                                date : props.reportDate,
                                                opinion_id : props.opinion_id,
                                                reporter : props.reporter_username,
                                                reported : props.reported,
                                                id: props.report_id,
                                                state: true
                                            })
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
                                            axios.post("http://localhost:5000/user_validation/change_user/"+props.reported_username, {
                                                permissions: "banned",
                                            })
                                            axios.post("http://localhost:5000/api/report/edit", {
                                                content : props.opinionContent,
                                                date : props.reportDate,
                                                opinion_id : props.opinion_id,
                                                reporter : props.reporter_username,
                                                reported : props.reported,
                                                id: props.report_id,
                                                state: true
                                            })
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
                                            axios.post("http://localhost:5000/api/report/edit", {
                                                content : props.opinionContent,
                                                date : props.reportDate,
                                                opinion_id : props.opinion_id,
                                                reporter : props.reporter_username,
                                                reported : props.reported,
                                                id: props.report_id,
                                                state: true
                                            })
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
