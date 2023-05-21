import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Transaction from "./Transaction.jsx"
import { v4 } from "uuid";
import TransactionDetails from "./TransactionDetails.jsx";
import axios from 'axios'

function TransactionList(props) {
  //temporary, books - taken from the db
    const [showDetails, setShowDetails] = useState(false);


    // for details page usage - gets set in Transaction when show details is clicked
    const [detailsKey, setDetailsKey] = useState(1);

    //All this gets updated from db whenever detailsKey changes
    var sessionUsername = sessionStorage.getItem("sessionUserUsername");


    const [transactions, setTransactions] = useState([]);

    const [detailsUsername, setDetailsUsername] = useState("k");
    const [detailsBook, setDetailsBook] = useState("1");
    const [detailsReservationDate, setDetailsReservationDate] = useState("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    const [detailsRentDate, setDetailsRentDate] = useState("k");
    const [detailsStatus, setDetailsStatus] = useState("k");
    const [detailsReturnDate, setDetailsReturnDate] = useState("k");
    const [detailsTitle, setDetailsTitle] = useState("k");
    const [detailsAuthor, setDetailsAuthor] = useState("k");
    const [detailsCoverPhoto, setDetailsCoverPhoto] = useState("k");
    const [detailsIsbn, setDetailsIsbn] = useState("k");
    const [detailsCondition, setDetailsCondition] = useState("k");
    //const [detailsIsFinished, setDetailsIsFinished] = useState((props.status === "finished" || props.status === "failed") ? true : false); //finished/failed do zmiany na faktyczne statusy - ¿eby pokazywac guzik do recenzji

    //Getting user's all transactions'
    useEffect(() => {
        
        axios.get("http://localhost:5000/api/transactions/" + sessionUsername).then((response) => {
            var trans = response.data.transactions;
            setTransactions(trans);
            //console.log(trans)
            return trans;
        })
    }, [])

  

    //Updating data from db whenever detailsKey changes
    useEffect(() => {
        //console.log("GOT HERE!!!!!!")
        // Take all details for a transaction from db and assign them to appropriate hooks (axios)

        //po klikniêciu show details detailskey == transaction.key
        axios.get("http://localhost:5000/api/transaction/" + sessionUsername + "/" + detailsKey).then((response) => {
            
            var transactionJson = response.data; 
            //console.log(transactionJson);
            if (transactionJson.msg === undefined) {

                setDetailsUsername(transactionJson.transaction.borrower_username);
                setDetailsReservationDate((transactionJson.transaction.reservation_date).slice(0,-12));
                setDetailsRentDate((transactionJson.transaction.rent_date).slice(0, -12));
                setDetailsReturnDate((transactionJson.transaction.return_date).slice(0, -12));
                setDetailsStatus(transactionJson.transaction.state);
                setDetailsBook(transactionJson.transaction.book_id);
                
            }
        }).then(() => {
                axios.get("http://localhost:5000/api/book_info/" + detailsBook).then((response) => {
                    //console.log(response.data);

                    var book_json = response.data;
                    setDetailsTitle(book_json.title);
                    setDetailsAuthor(book_json.author);
                    setDetailsCoverPhoto(book_json.cover_photo);
                    setDetailsIsbn(book_json.isbn);
                    setDetailsCondition(book_json.condition);                    
                })            
        })


    }, [detailsKey])


    return (
        <>
            {
                showDetails ?
                    <>
                        <TransactionDetails key={v4()} detailsKey={detailsKey} title={detailsTitle} author={detailsAuthor} coverPhoto={detailsCoverPhoto} isbn={detailsIsbn} condition={detailsCondition} user={detailsUsername} reservationDate={detailsReservationDate} rentDate={detailsRentDate} returnDate={detailsReturnDate} status={detailsStatus} book={detailsBook} updateShowDetailsFromChildren={setShowDetails}> </TransactionDetails >
                    </>
                    :
                    <>
                        {transactions.map((t) =>
                            <div key={t.id}>
                                <div>
                                    <br></br>
                                </div>
                                <Transaction user={t.borrower_username} detailsKey={detailsKey} reservationDate={t.reservation_date} updateShowDetailsFromChildren={setShowDetails} updateDetailsKey={setDetailsKey} status={t.state} transactionID={t.id}  book={t.book_id}> </Transaction>
                            </div>
                        )}
                    </>
            }
        </>
  );
}

export default TransactionList;
