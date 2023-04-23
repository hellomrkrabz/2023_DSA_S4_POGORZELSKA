import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "../components/Navbar";
import Book from "../components/Book";
import TextField from "@mui/material/TextField"
import { styled, alpha } from '@mui/material/styles';
import { v4 } from "uuid";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

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

    const [addPersonalBook, setAddPersonalBook] = useState(!true)
    const [addWantedBook, setAddWantedBook] = useState(!true)

    const book = {title:"Instytut", author:"Stephen King", link:"https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", src:"https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg"}

    const books = [book,book,book,book,book,book,book,book,book,book,book,book,book,book,book,book,book,book,book,book,book]

    /*useEffect(() => {
        axios.post("http://localhost:5000/user_validation/logout", {
            key: sessionUserKey,
        })

        if(props.type==="personal")
            console.log(personal)
        else if(props.type==="wanted")
            console.log(wanted)

    }, []);*/

    console.log(props)

    return (
        <>
            <Navbar site={props.site}></Navbar>
            <div className="container-fluid">
                {props.type==="personal" && addPersonalBook &&//personal
                    <div>
                        add personal book
                    </div>
                }
                {props.type==="personal" && !addPersonalBook &&
                    <div className="row">
                        <div className="col-9 bg-light">
                            <p>Personal Library</p>
                            <div className="row">                                
                                {books.map((b)=>
                                    <Book variant="block" {...b} key={v4()}></Book>
                            )}
                            </div>
                        </div>
                        <div className="col-3 bg-primary">
                            <div className="row">{/* xd */}
                                <Search className="col-10">
                                    <SearchIconWrapper>
                                    <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                                <button className="col-3">Search</button>
                            </div>
                        <TextField
                            id="language"
                            label="language"
                            fullWidth
                            value="xd"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            id="Publisher"
                            label="Publisher"
                            fullWidth
                            value="xd"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            id="isbn"
                            label="ISBN"
                            fullWidth
                            value="xd"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button>Prev</button>
                        <button>Next</button>
                        </div>
                    </div>
                }

                {props.type==="wanted" && addWantedBook &&//wanted
                    <div>
                        add wanted book
                    </div>
                }
                {props.type==="wanted" && !addWantedBook &&
                    <div>
                        display wanted book
                    </div>
                }
            </div>
        </>
    );
}

export default Library;
