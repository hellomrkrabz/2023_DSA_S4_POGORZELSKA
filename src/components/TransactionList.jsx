import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Transaction from "./Transaction.jsx"
import { v4 } from "uuid";
import TransactionDetails from "./TransactionDetails.jsx";

function TransactionList(props) {
  //temporary, books - taken from the db
    const [showDetails, setShowDetails] = useState(false);
    const [book, setBook] = useState({ title: "Instytut", author: "Stephen King", link: "https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", src: "https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" })
    const [books, setBooks] = useState([book, book, book, book, book, book, book])  

    // for details page usage - gets set in Transaction when show details is clicked
    const [detailsKey, setDetailsKey] = useState(0);
    const [detailsUsername, setDetailsUsername] = useState("");
    const [detailsBook, setDetailsBook] = useState({ title: "Instytut", author: "Stephen King", link: "https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", src: "https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" })
    const [detailsTitle, setDetailsTitle] = useState("");
    const [detailsAuthor, setDetailsAuthor] = useState("");
    const [detailsIsbn, setDetailsIsbn] = useState("");
    const [detailsCondition, setDetailsCondition] = useState("");
    const [detailsReservationDate, setDetailsReservationDate] = useState("");
    const [detailsRentDate, setDetailsRentDate] = useState("");
    const [detailsStatus, setDetailsStatus] = useState("");
    const [detailsReturnDate, setDetailsReturnDate] = useState("");
    const [detailsIsFinished, setDetailsIsFinished] = useState((props.status === "finished" || props.status === "failed") ? true : false); //finished/failed do zmiany na faktyczne statusy - ¿eby pokazywac guzik do recenzji

    //As far as I know, we will have to do the same for every component we want to show in details. If you have a better idea, let me know.
   /* const showDetailsFromChildren = () => {
        if (showDetails === false) {
            //setShowDetails(true);
        }
    }

    const hideDetailsFromChildren = () => {
        if (showDetails === true) {
            //setShowDetails(false);
        }
    }
    */

    return (
        <>
            {
                showDetails ?
                    <>
                        <TransactionDetails key={detailsKey} updateShowDetailsFromChildren={setShowDetails}> </TransactionDetails >
                    </>
                    :
                    <>
                        {books.map((b) =>
                            <div>
                                <div>
                                    <br></br>
                                </div>
                                <Transaction key={v4()} user="debil" detailsKey={detailsKey} reservationDate="21.03.07" updateShowDetailsFromChildren = {setShowDetails} status="gites majonez" book={b}> </Transaction>
                            </div>
                        )}
                    </>
            }
        </>
  );
}

export default TransactionList;
