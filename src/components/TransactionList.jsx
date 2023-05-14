import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Transaction from "./Transaction.jsx"
import { v4 } from "uuid";
import TransactionDetails from "./TransactionDetails.jsx";

function TransactionList(props) {
  //temporary, books - taken from the db
    const [showDetails, setShowDetails] = useState(false);
    const [book, setBook] = useState({ title: "Instytut", author: "Stephen King", link: "https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", imageLinks: {smallThumbnail:"https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg"} })
    const [books, setBooks] = useState([book, book, book, book, book, book, book])  
    const [transactionIDs, setTransactionIDs] = useState([]);

    // for details page usage - gets set in Transaction when show details is clicked
    const [detailsKey, setDetailsKey] = useState(0);

    //All this gets updated from db whenever detailsKey changes

    const [detailsUsername, setDetailsUsername] = useState("");
    const [detailsBook, setDetailsBook] = useState({ title: "Instytut", author: "Stephen King", link: "https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", imageLinks: { smallThumbnail: "https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" } })
    const [detailsTitle, setDetailsTitle] = useState("");
    const [detailsAuthor, setDetailsAuthor] = useState("");
    const [detailsIsbn, setDetailsIsbn] = useState("");
    const [detailsCondition, setDetailsCondition] = useState("");
    const [detailsReservationDate, setDetailsReservationDate] = useState("");
    const [detailsRentDate, setDetailsRentDate] = useState("");
    const [detailsStatus, setDetailsStatus] = useState("");
    const [detailsReturnDate, setDetailsReturnDate] = useState("");
    const [detailsIsFinished, setDetailsIsFinished] = useState((props.status === "finished" || props.status === "failed") ? true : false); //finished/failed do zmiany na faktyczne statusy - ¿eby pokazywac guzik do recenzji

    //Updating data from db whenever detailsKey changes
    useEffect(() => {
        //placeholder until backend is ready 
        // Take all details for a transaction from db and assign them to appropriate hooks (axios)
        console.log(detailsKey);
    }, [detailsKey])


    //Axios - get all transaction ids

    return (
        <>
            {
                showDetails ?
                    <>
                        <TransactionDetails key={v4()} detailsKey={detailsKey} bookID="2137" book={detailsBook} updateShowDetailsFromChildren={setShowDetails}> </TransactionDetails >
                    </>
                    :
                    <>
                        {books.map((b) =>
                            <div key={v4()}>
                                <div>
                                    <br></br>
                                </div>
                                <Transaction user="Example" detailsKey={detailsKey} reservationDate="21.03.2007" updateShowDetailsFromChildren={setShowDetails} updateDetailsKey={setDetailsKey} status="pending" transactionID="2137"  book={b}> </Transaction>
                            </div>
                        )}
                    </>
            }
        </>
  );
}

export default TransactionList;
