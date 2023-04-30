import { Link } from "react-router-dom";
import Book from "./Book.jsx";
import { v4 } from "uuid";

function TransactionDetails(props) {
    //Mati we zrób ³adnie
    return (
        <>
            <div>
                <Book variant="small" {...props.book} key={v4()}> </Book>
                <div>
                    {props.date}
                </div>
                <div>
                    {props.user}
                </div>
                <div>
                    {props.status}
                </div>
                <button className="btn btn-banana-primary col-10">Details</button>
            </div>
       </>
    );
}

export default TransactionDetails;
