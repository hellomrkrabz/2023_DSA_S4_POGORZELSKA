import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Transaction from "./Transaction.jsx"
import { v4 } from "uuid";
import TransactionDetails from "./TransactionDetails.jsx";
import axios from 'axios'
import findCookie from "../scripts/findCookie.jsx";

function TransactionList(props) {

    const transactionID = window.location.pathname.split('/').pop();

  //temporary, books - taken from the db
    const [showDetails, setShowDetails] = useState(false);


    // for details page usage - gets set in Transaction when show details is clicked
    const [detailsKey, setDetailsKey] = useState(1);

    //All this gets updated from db whenever detailsKey changes
    var sessionUsername = findCookie("sessionUserUsername");

    const [transactions, setTransactions] = useState([]);

    const [detailsUsername, setDetailsUsername] = useState("");
    const [detailsOwnerName, setDetailsOwnerName] = useState("");
    const [detailsBook, setDetailsBook] = useState("");
    const [detailsOwnedBook, setDetailsOwnedBook] = useState("");
    const [detailsReservationDate, setDetailsReservationDate] = useState("");
    const [detailsRentDate, setDetailsRentDate] = useState("");
    const [detailsStatus, setDetailsStatus] = useState("");
    const [detailsReturnDate, setDetailsReturnDate] = useState("");
    const [detailsTitle, setDetailsTitle] = useState("");
    const [detailsAuthor, setDetailsAuthor] = useState("");
    const [detailsCoverPhoto, setDetailsCoverPhoto] = useState("");
    const [detailsIsbn, setDetailsIsbn] = useState("");
    const [detailsCondition, setDetailsCondition] = useState("");
    const [borrowerId, setBorrowerId] = useState();
    const [ownerId, setOwnerId] = useState();
    //const [detailsIsFinished, setDetailsIsFinished] = useState((props.status === "finished" || props.status === "failed") ? true : false); //finished/failed do zmiany na faktyczne statusy - �eby pokazywac guzik do recenzji

    function compareTransactions(a, b) {
        let aDate = new Date(a.rent_date)
        let bDate = new Date(b.rent_date)
        if (aDate < bDate) {
          return -1;
        }
        if (aDate > bDate) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }

    //Getting user's all transactions'
    useEffect(() => {

        if(window.location.pathname.split('/').length === 3 && transactionID)
        {
            setShowDetails(true);
            setDetailsKey(transactionID);
            setShowDetails
        }
        
        axios.get("http://localhost:5000/api/transactions/" + sessionUsername).then((response) => {
            var trans = response.data.transactions;
            trans.sort(compareTransactions)
            setTransactions(trans);
            //console.log(response.data.transactions)
            return trans;
        })
    }, [])

  

    //Updating data from db whenever detailsKey changes
    useEffect(() => {
        // Take all details for a transaction from db and assign them to appropriate hooks (axios)

        //po klikni�ciu show details detailskey == transaction.key
        axios.get("http://localhost:5000/api/transaction/" + detailsKey).then((response) => {
            
            var transactionJson = response.data; 
            if (transactionJson.msg === undefined) {
                //console.log(transactionJson.transaction)
                setDetailsUsername(transactionJson.transaction.borrower_username);
                setDetailsReservationDate(transactionJson.transaction.reservation_date ? (transactionJson.transaction.reservation_date).slice(0,-12) : "");
                setDetailsRentDate(transactionJson.transaction.rent_date ? (transactionJson.transaction.rent_date).slice(0,-12) : "");
                setDetailsReturnDate(transactionJson.transaction.return_date ? (transactionJson.transaction.return_date).slice(0,-12) : "");
                setDetailsStatus(transactionJson.transaction.state);
                setDetailsBook(transactionJson.transaction.book_id);
                setDetailsOwnedBook(transactionJson.transaction.owned_book_id);
                setBorrowerId(transactionJson.transaction.borrower_id);
                setOwnerId(transactionJson.transaction.owner_id)
                setDetailsCondition(transactionJson.transaction.condition);
                setDetailsOwnerName(transactionJson.transaction.owner_username)
                return(transactionJson.transaction.book_id)
                
            }
        }).then((book_id) => {
                axios.get("http://localhost:5000/api/book_info/" + book_id).then((response) => {

                    var book_json = response.data;
                    setDetailsTitle(book_json.title);
                    setDetailsAuthor(book_json.author);
                    setDetailsCoverPhoto(book_json.cover_photo);
                    setDetailsIsbn(book_json.isbn);                   
                })            
        })
    }, [detailsKey])

    return (
        <>
            {
                showDetails ?
                    <>
                        <TransactionDetails key={v4()} detailsKey={detailsKey} title={detailsTitle} author={detailsAuthor} coverPhoto={detailsCoverPhoto} isbn={detailsIsbn} condition={detailsCondition} user={detailsUsername} ownerName={detailsOwnerName} reservationDate={detailsReservationDate} rentDate={detailsRentDate} returnDate={detailsReturnDate} status={detailsStatus} book={detailsBook} ownedBook={detailsOwnedBook} updateShowDetailsFromChildren={setShowDetails} borrowerId={borrowerId} ownerId={ownerId}> </TransactionDetails >
                    </>
                    :
                    <>
                        {transactions.map((t) =>
                            <div key={t.id}>
                                <div>
                                    <br></br>
                                </div>
                                <Transaction user={t.borrower_username} ownerName={t.owner_username} detailsKey={detailsKey} reservationDate={t.reservation_date} updateShowDetailsFromChildren={setShowDetails} updateDetailsKey={setDetailsKey} status={t.state} transactionID={t.id} book={t.book_id} borrowerId={t.borrower_id}> </Transaction>
                            </div>
                        )}
                    </>
            }
        </>
  );
}

export default TransactionList;
