import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from './../components/Navbar'
import TransactionList from "../components/TransactionList";
import findCookie from "../scripts/findCookie";

var sessionUserKey = findCookie("sessionUserKey")

function Transactions(props) {
    const [reservation, setReservation] = useState("lent");

    //do wywalenia, na testy
    useEffect(() => {
        /*
        axios.post("http://localhost:5000/api/transaction/add", {
            user_key: sessionUserKey,
            reservation_date: "09.09.0909",
            rent_date: "10.10.1010",
            return_date: "11.11.1111",
            state: reservation,
            book_id: "2",
            borrower_id: 1        
        }).then((response) => {
            if (response.msg !== "success") {
                //console.log("dodane");
            }
        })
        */

    }, [])

  return (
    <>
      <div>
              <Navbar site={props.site} username={props.username}></Navbar>
      </div>
      <div>
          <TransactionList></TransactionList>
      </div>
      

    </>
  );
}

export default Transactions;
