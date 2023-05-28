import { Link } from "react-router-dom";
import Book from "./Book";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import loading from "../media/loading.gif"


function ProfileBookList(props) {

    var emptyBook = {title:"title", authors:["author"], imageLinks:{smallThumbnail: loading}}
    
    const [books, setBooks] = useState([emptyBook])

    useEffect(() => {
        if(props.books!==undefined)
            setBooks(props.books)
    }, [props.books]);

    // useEffect(() => {
    //     fetchBooksById(bookIds[0]).then((r)=>{
    //         booksXD.push(r.volumeInfo)
    //         fetchBooksById(bookIds[1]).then((r)=>{
    //             booksXD.push(r.volumeInfo)
    //             fetchBooksById(bookIds[2]).then((r)=>{
    //                 booksXD.push(r.volumeInfo)
    //                 fetchBooksById(bookIds[3]).then((r)=>{
    //                     booksXD.push(r.volumeInfo)
    //                     fetchBooksById(bookIds[4]).then((r)=>{
    //                         booksXD.push(r.volumeInfo)
    //                         fetchBooksById(bookIds[5]).then((r)=>{
    //                             booksXD.push(r.volumeInfo)
    //                             setBooks(booksXD);
    // })})})})})})},[]);

    return (
    <>
        <div className="row">
            <p className="fs-5 fw-semibold">{props.title}</p>
            <div className="d-flex justify-content-around col-9 col-xl-10">
                <div className="row row-cols-sm-2 row-cols-xxl-6 row-cols-xl-3 gy-2 gx-2 row-cols-1 col-12">

                    {books.map((b)=><Book variant="deprecatedSmall" key={v4()} {...b}/>)}
                </div>
            </div>

            <div className="align-self-center col-3 col-xl-2">
                    {props.isLoggedIn &&
                        props.addLink !== undefined &&
                            <Link to={props.addLink}>
                                <button className="btn btn-banana-primary col-12">Add new</button>
                            </Link>
                    }
                    <Link to={props.moreLink}>
                        <button className="btn btn-banana-primary col-12 mt-2">See more</button>
                    </Link>
            </div>
        </div>
    </>
  );
}

export default ProfileBookList;
