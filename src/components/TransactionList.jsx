import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Transaction from "./Transaction.jsx"
import { v4 } from "uuid";

function TransactionList(props) {
  //tymczasowe, trzeba bêdzie podjebaæ z bazy
  const [book, setBook] = useState({ title: "Instytut", author: "Stephen King", link: "https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", src: "https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" })
  const [books, setBooks] = useState([book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book])  
  return (
    <>
          {books.map((b) => 
              <div>
                  <div>
                      <br></br>
                  </div>
                  <Transaction key={v4()} user="debil" reservationDate="21.03.07" status="gites majonez" returnDate="nigdy" rentDate="jutro" bookCondition="veeeri goode" isbn="123456789" book={b}> </Transaction>
              </div>
        )}
    </>
  );
}

export default TransactionList;
