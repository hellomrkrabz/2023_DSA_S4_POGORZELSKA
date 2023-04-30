import React from "react";

function ReportComponent(props) {
    return (
        <>
            <div className="row col-11 bg-light border border-dark mt-3">
                <div className="col-3">{props.report.reportDate}</div>
                <div className="col-3">{props.report.reporter}</div>
                <div className="col-3">{props.report.reported}</div>
                <div className="col-3 d-flex justify-content-center">
                    {props.report.status==="resolved" &&
                    <>
                        <span className="bg-success col-5 d-flex justify-content-center">
                            {props.report.status}
                        </span>
                        <button className="col-5" onClick={()=>{
                            props.setReport(props.report)
                            props.setDisplayDetails(true)
                            }}>Details</button>
                    </>
                    }
                    {props.report.status==="pending" &&
                    <>
                        <span className="bg-warning col-5 d-flex justify-content-center">
                            {props.report.status}
                        </span>
                        <button className="col-5" onClick={()=>{
                            props.setReport(props.report)
                            props.setDisplayDetails(true)
                            }}>Details</button>
                    </>
                        
                    }
                    
                </div>
            </div>
        </>
    );
}

export default ReportComponent;
