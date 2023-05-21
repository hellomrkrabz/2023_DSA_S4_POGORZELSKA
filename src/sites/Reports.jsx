import React, { useState,useEffect } from "react";
import axios from 'axios'
import Navbar from "../components/Navbar";
import ReportComponent from "../components/ReportComponent";
import {v4} from 'uuid'
import DetailedReportComponent from "../components/DetailedReportComponent";

function Reports(props) {

    const [reports, setReports] = useState([])
    const [displayDetails, setDisplayDetails] = useState(false)
    const [report, setReport] = useState()

    useEffect(() => {
        
        axios.get("http://localhost:5000/Reports/Where?")
        .then((response) => {
           //setReports(response.data.reports)
        });
        let report1={reportDate:"25.04.2023",reporter:"Butters1",reported:"cartman1", status:"pending",opinionDate:"20.04.2023",opinionContent:"2/10", reportContent:">:("}
        let report2={reportDate:"26.04.2023",reporter:"Butters2",reported:"cartman2", status:"resolved",opinionDate:"21.04.2023",opinionContent:"1/10", reportContent:">>:("}
        let report3={reportDate:"27.04.2023",reporter:"Butters3",reported:"cartman3", status:"pending",opinionDate:"22.04.2023",opinionContent:"-2/10", reportContent:">>>:("}
        setReports([report1,report2,report3,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1,report1])
    }, []);

    // useEffect(() => {
    //     console.log(report)
    // }, [report]);

    return (
        <>
            <div>
                <Navbar site={"/Reports"} isLoggedIn={true} username={props.username}/>
            </div>
            {!displayDetails ?
            <>
                <div className="container-fluid d-flex flex-column align-items-center">
                    <div className="row row col-11 py-3">
                        <div className="col-3 fs-2">Date of report</div>
                        <div className="col-3 fs-2">Reporter</div>
                        <div className="col-3 fs-2">Date of report</div>
                        <div className="col-3 fs-2">Status</div>
                    </div>

                    {reports.map((r)=><ReportComponent report={{...r}} setDisplayDetails={setDisplayDetails} setReport={setReport} key={v4()}/>)}
                </div>
            </>
            :
            <>
                <div className="container-fluid d-flex flex-column align-items-center">
                    <DetailedReportComponent setDisplayDetails={setDisplayDetails} {...report}/>
                </div>
            </>
            }
           
        </>
    );
}

export default Reports;
