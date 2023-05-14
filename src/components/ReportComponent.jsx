import React from "react";

function ReportComponent(props) {
    return (
        <>
            <div className="row col-11 bg-banana-blue bg-opacity-25 border border-dark mt-3 rounded py-3">
                <div className="col-3 fs-3 fw-semibold">{props.report.reportDate}</div>
                <div className="col-3 fs-3 fw-semibold">{props.report.reporter}</div>
                <div className="col-3 fs-3 fw-semibold">{props.report.reported}</div>
                <div className="col-3 d-flex justify-content-start">
                    {props.report.status==="resolved" &&
                    <>
                        <span className="bg-success col-5 d-flex justify-content-center rounded py-3 fs-5">
                            {props.report.status}
                        </span>
                        <button className="col-5 btn btn-banana-primary ms-3 align-self-center" onClick={()=>{
                            props.setReport(props.report)
                            props.setDisplayDetails(true)
                            }}>Details</button>
                    </>
                    }
                    {props.report.status==="pending" &&
                    <>
                        <span className="bg-warning col-5 d-flex justify-content-center rounded py-3 fs-5">
                            {props.report.status}
                        </span>
                        <button className="col-5 btn btn-banana-primary ms-3 align-self-center" onClick={()=>{
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
