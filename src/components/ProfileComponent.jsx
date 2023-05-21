import React, {useEffect, useState} from "react";
import ProfileBookList from "./ProfileBookList";
import ProfileOpinionsList from "./ProfileOpinionsList";
import ProfileInfoComponent from "./ProfileInfoComponent";
import loading from "../media/loading.gif"
import axios from "axios"


function ProfileComponent(props) {

    var emptyBook = {author: "Loading", book_id: -1, cover_photo: loading, google_book_id: "", isbn: "8375545252", title: "Zgorzkniala pizda"}

    const [personalBookIds, setPersonalBookIds] = useState([])
    const [wantedBookIds, setWantedBookIds] = useState([])
    const [offeredBookIds, setOfferedBookIds] = useState([])
    const [personalBooks, setPersonalBooks] = useState([emptyBook, emptyBook])
    const [wantedBooks, setWantedBooks] = useState([emptyBook, emptyBook])
    const [offeredBooks, setOfferedBooks] = useState([emptyBook, emptyBook])

    useEffect(()=>{
        axios.get("http://localhost:5000/api/owned_book_info").then((response) => {
            //console.log(response.data.books)
            setPersonalBookIds(response.data.books)
            let booksIdTMP = []
            for(let i=0;i<response.data.books.length;i++)
            {
                booksIdTMP.push(response.data.books[i].book_id)
            }
            //setBookIds(booksIdTMP)
        })

        axios.get("http://localhost:5000/api/wanted_book_info").then((response) => {
            //console.log(response.data.books)
            setWantedBookIds(response.data.books)
            let booksIdTMP = []
            for(let i=0;i<response.data.books.length;i++)
            {
                booksIdTMP.push(response.data.books[i].book_id)
            }
            //setBookIds(booksIdTMP)
        })
    },[])

    useEffect(()=>
    {
        if(personalBookIds.length>0)
        {
            let fetched = []
            let offeredTMP = []
            for (let i = 0; i < personalBookIds.length && i < 6; i++) {
                axios.get("http://localhost:5000/api/book_info/" + personalBookIds[i].book_id).then((response) => {
                    fetched.push(response.data)
                    if(personalBookIds[i].rentable===true)
                    {
                        offeredTMP.push(response.data)
                    }
                })
            }
            setTimeout(() => {
                setPersonalBooks(fetched)
                setOfferedBooks(offeredTMP)
            }, 2000);
        }
    },[personalBookIds])

    useEffect(()=>
    {
        
        if(wantedBookIds.length>0)
        {
            let fetched = []
            for (let i = 0; i < wantedBookIds.length && i < 6; i++) {
                axios.get("http://localhost:5000/api/book_info/" + wantedBookIds[i].book_id).then((response) => {
                    fetched.push(response.data)
                })
            }
            setTimeout(() => {setWantedBooks(fetched)}, 2000);
        }
    },[wantedBookIds])


  return (
    <>
        <div className="container-fluid flex-grow-1 d-flex">
            <div className="row flex-grow-1">
                <div className="col-3 bg-banana-blue bg-opacity-25">
                    <ProfileInfoComponent {...props}></ProfileInfoComponent>
                </div>
                
                <div className="col-9 mt-5">

                    <ProfileBookList books={wantedBooks} title={"Wanted Books"} moreLink={"/WantedLibrary"} addLink={"/WantedLibrary/Add"} isLoggedIn={props.isLoggedIn}></ProfileBookList>
                    <ProfileBookList books={offeredBooks} title={"Offered Books"} moreLink={"/PersonalLibrary/Offered"} addLink={"/PersonalLibrary/AddOffered"} isLoggedIn={props.isLoggedIn}></ProfileBookList>
                    {props.isLoggedIn &&
                        <ProfileBookList books={personalBooks} title={"Personal Library"} moreLink={"/PersonalLibrary"} addLink={"/PersonalLibrary/Add"} isLoggedIn={props.isLoggedIn}></ProfileBookList>
                    }
                    

                    <ProfileOpinionsList
                        sender1={"JustAnormalUser"} text1={"not gut"} moreLink={"/Opinions"}
                        sender2={"AdiffrentUser"} text2={"it was great 2/10"} addLink={"/AddOpinion"}>
                    </ProfileOpinionsList>
                 </div>
            </div>
        </div>
    </>
  );
}

export default ProfileComponent;
