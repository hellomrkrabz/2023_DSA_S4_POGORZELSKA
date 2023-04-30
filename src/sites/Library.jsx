import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "../components/Navbar";
import Book from "../components/Book";
import TextField from "@mui/material/TextField"
import { styled, alpha } from '@mui/material/styles';
import { v4 } from "uuid";
import InputBase from '@mui/material/InputBase';
import BookGrid from "../components/BookGrid";
import banana from "../media/banana.png";
import AddBookComponent from "../components/AddBookComponent";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

function Library(props) {

    const [addPersonalBook, setAddPersonalBook] = useState((props.mode==="add"|| props.mode==="addoffered") && props.type==="personal" ? true : false)
    const [addWantedBook, setAddWantedBook] = useState(props.mode==="add" && props.type==="wanted" ? true : false)
    const [offered, setOffered] = useState(props.mode==="offered" && props.type==="personal" ? true : false)
    const [isOffered, setIsOffered] = useState(props.mode==="addoffered" && props.type==="personal" ? true : false)
    const [filter, setFilter] = useState({title:"", author:"", language:"", publisher:"", ISBN:""})

    const [book, setBook] = useState({title:"Instytut", author:"Stephen King", isOffered:true, link:"https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", src:"https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg"})
    const testBook = {title:"test", author:"test1", isOffered:false, link:"https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", src:"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/banana.png"}
    const test2Book = {title:"test", author:"test2", isOffered:true, link:"https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", src:"https://static.vecteezy.com/system/resources/thumbnails/007/839/785/small/cute-monkey-holding-banana-cartoon-icon-illustration-animal-food-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg"}

    const [books,setBooks] = useState([book,book,book,book,book,testBook,book,book,book,book,book,book,book,book,book,book,book,book,book,book,book,testBook,book,book,book,book,book,book,book,testBook,book,testBook,book,book,book,book,book,book,book,testBook,testBook,test2Book,book,book,book,book,book,book,book,book,book,testBook,testBook,book,book,book,book,book,book,book,book,test2Book,book,testBook,book,book,book,book,book,book,book,testBook,book,book,book,testBook,book,book,book,book,book,testBook,book,book,book,book,book,book,book,testBook,test2Book,testBook,book,book,book,book,book,testBook,test2Book,testBook,book,book,book,testBook,test2Book])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [booksToDisplay, setBooksTodisplay] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        // axios.post("http://localhost:5000/user_validation/logout", {
        //     key: sessionUserKey,
        // })

        // if(props.type==="personal")
        //     console.log(personal)
        // else if(props.type==="wanted")
        //     console.log(wanted)

        filterBooks(books,filter)
    }, []);

    useEffect(() => {
        let noe=24;
        let offset=pageNumber*noe;
        setBooksTodisplay(filteredBooks.slice(offset,offset+noe))
    }, [filteredBooks,pageNumber]);

    function filterBooks(boo, f)
    {
        const titleFilter = new RegExp(f.title, 'i');
        const authorFilter = new RegExp(f.author, 'i');
        const languageFilter = new RegExp(f.language, 'i');
        const publisherFilter = new RegExp(f.publisher, 'i');
        const ISBNFilter = new RegExp(f.ISBN, 'i');
        const offeredFilter = new RegExp(offered, 'i');

        

        if(offered)
        {
            var result = boo
            .filter(b => titleFilter.exec(b.title))
            .filter(b => authorFilter.exec(b.author))
            .filter(b => languageFilter.exec(b.language))
            .filter(b => publisherFilter.exec(b.publisher))
            .filter(b => ISBNFilter.exec(b.ISBN))
            .filter(b => offeredFilter.exec(b.isOffered))
        }else{
            var result = boo
            .filter(b => titleFilter.exec(b.title))
            .filter(b => authorFilter.exec(b.author))
            .filter(b => languageFilter.exec(b.language))
            .filter(b => publisherFilter.exec(b.publisher))
            .filter(b => ISBNFilter.exec(b.ISBN))
        }
        setFilteredBooks(result)
        setPageNumber(0)
    }

    // useEffect(() => {
    //     console.log("o")
    //     console.log(offered)
    //     console.log("io")
    //     console.log(isOffered)
    // }, [offered,isOffered]);

    return (
        <>
            <Navbar site={props.site} username={props.username}></Navbar>
            
            <div className="container-fluid">
                {props.type==="personal" && addPersonalBook &&//personal
                    <AddBookComponent type="personal" offered={isOffered}/>
                }
                {props.type==="personal" && !addPersonalBook &&
                    <div className="row">
                        <div className="col-9 bg-light">
                            <p>Personal Library</p>
                            <div className="row">                                
                                <BookGrid books={booksToDisplay}></BookGrid>
                            </div>
                        </div>
                        <div className="col-3 bg-banana-blue bg-opacity-25">
                            <Search className="mt-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase 
                                placeholder="Find title" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"title":e.target.value})
                                } }}/>
                            </Search>
                            <Search className="mt-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase 
                                    placeholder="Author" 
                                    inputProps={{ 'onChange':(e)=>{
                                        setFilter({...filter,"author":e.target.value})
                                    } }}/>
                            </Search>
                            <Search className="mt-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase  
                                    placeholder="Language" 
                                    inputProps={{ 'onChange':(e)=>{
                                        setFilter({...filter,"language":e.target.value})
                                    } }}/>
                            </Search>
                            <Search className="mt-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase 
                                placeholder="Publisher" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"publisher":e.target.value})
                                } }}/>
                            </Search>
                            <Search className="mt-4 mb-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase  
                                placeholder="ISBN" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"ISBN":e.target.value})
                                } }}/>
                            </Search>
                        
                        <button className="col-12 btn btn-banana-primary-dark" onClick={()=>{ filterBooks(books,filter)  }}>Search</button>
                        <button className="btn btn-banana-primary-dark" onClick={()=>{
                            if(pageNumber>0)
                            {
                                setPageNumber(pageNumber-1)
                            }
                        }}>Prev</button>
                        <button className="btn btn-banana-primary-dark" onClick={()=>{
                            if(pageNumber < (filteredBooks.length/24) -1)
                            {
                                setPageNumber(pageNumber+1)
                            }
                        }}>Next</button>
                        </div>
                    </div>
                }

                {props.type==="wanted" && addWantedBook &&//wanted
                    <AddBookComponent type="wanted"/>
                }
                {props.type==="wanted" && !addWantedBook &&
                    <div className="row">
                    <div className="col-9 bg-light">
                        <p>Wanted Library</p>
                        <div className="row">                                
                            <BookGrid books={booksToDisplay}></BookGrid>
                        </div>
                    </div>
                    <div className="col-3 bg-primary">
                        <Search className="mt-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase 
                            placeholder="Find title" 
                            inputProps={{ 'onChange':(e)=>{
                                setFilter({...filter,"title":e.target.value})
                            } }}/>
                        </Search>
                        <Search className="mt-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase 
                                placeholder="Author" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"author":e.target.value})
                                } }}/>
                        </Search>
                        <Search className="mt-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase  
                                placeholder="Language" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"language":e.target.value})
                                } }}/>
                        </Search>
                        <Search className="mt-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase 
                            placeholder="Publisher" 
                            inputProps={{ 'onChange':(e)=>{
                                setFilter({...filter,"publisher":e.target.value})
                            } }}/>
                        </Search>
                        <Search className="mt-4 mb-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase  
                            placeholder="ISBN" 
                            inputProps={{ 'onChange':(e)=>{
                                setFilter({...filter,"ISBN":e.target.value})
                            } }}/>
                        </Search>
                    
                    <button className="col-12" onClick={()=>{ filterBooks(books,filter)  }}>Search</button>
                    <button onClick={()=>{
                        if(pageNumber>0)
                        {
                            setPageNumber(pageNumber-1)
                        }
                    }}>Prev</button>
                    <button onClick={()=>{
                        if(pageNumber < (filteredBooks.length/24) -1)
                        {
                            setPageNumber(pageNumber+1)
                        }
                    }}>Next</button>
                    </div>
                </div>
                }
            </div>
        </>
    );
}

export default Library;
