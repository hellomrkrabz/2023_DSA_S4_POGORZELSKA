import React, { useEffect, useState, useRef } from "react";
import './../style/bootstrap/css/main_style.css';
import { GoogleBooksAPI } from "google-books-js";

const BookViewer = () => {
    const googleBooksApi = new GoogleBooksAPI();



    async function fetchBooks() {
        const books = await googleBooksApi.search({
            filters: {
                author: "Urszula Stañczyk",
            },
        });

        console.log(books);
    }

    fetchBooks();

    return (
        <div>
            
        </div>
    );
}
        
export default BookViewer;