import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from './../components/Navbar'
import TransactionList from "../components/TransactionList";

function Transactions(props) {


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
