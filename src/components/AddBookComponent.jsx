import { useEffect, useState } from "react";
import banana from "../media/banana.png";
import notFound from "../media/notFound.png"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Textfield from '@mui/material/TextField';
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem'
import Popup from 'reactjs-popup';
import { v4 } from "uuid";
import axios from "axios"
import Book from "./Book";
import SelectButBetter from 'react-select';

var sessionUserKey= sessionStorage.getItem("sessionUserKey")
var sessionUsername= sessionStorage.getItem("sessionUserUsername")

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

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
zIndex: "10",
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
    zIndex: "1",
    backgroundColor: "white",
    borderRadius: "3px",
    border: "1px solid lightGrey ",
    },
},
}));

const theme = createTheme({
    palette: {
      bananaBlueSwitch: {
        main: "#24A08B",
      }
    }
  });



function AddBookComponent(props)
{
const [filter, setFilter] = useState("")
const [condition, setCondition] = useState("good")
const [isOffered, setIsOffered] = useState(props.offered)
const [foundBooks, setFoundBooks] = useState([])
const [book, setBook] = useState({title:"", author:"", src:"", description:"", googleId:""})
const [hasSearched, setHasSearched] = useState(false)
const [rooms, setRooms] = useState([])
const [roomsOptions, setRoomsOptions] = useState([])
const [shelfs, setShelfs] = useState([])
const [shelfsToList, setShelfsToList] = useState([])
const [selectedRoom, setSelectedRoom] = useState(0)
const [selectedShelf, setSelectedShelf] = useState(0)
const [bookSrc, setBookSrc] = useState(banana)
const [displayAddShelf, setDisplayAddShelf] = useState(false)
const [displayAddRoom, setDisplayAddRoom] = useState(false)
const [newRoomName, setNewRoomName] = useState("")
const [newshelfName, setNewShelfName] = useState("")
const [selectedRoomForShelf, setSelectedRoomForShelf] = useState(0)

useEffect(()=>{
    axios.get("http://localhost:5000/api/owned_shelves/" + sessionUsername).then((response) => {
        if(response.data.msg!=="No shelves?:(")
        {
            setShelfs(response.data.shelves)
            setSelectedShelf(response.data.shelves[0].id)
        }//else
        // {
        //     let shelfsTmp=[{name:"szelf1",id:1},{name:"pułkanabułka",id:2}]
        //     setShelfs(shelfsTmp)
        //     setSelectedShelf(shelfsTmp[0].id)
        // }
    })
    axios.get("http://localhost:5000/api/owned_rooms/" + sessionUsername).then((response) => {
        if(response.data.msg!=="No rooms?:(")
        {
            let roomOptionsTmp = []
            response.data.rooms.forEach(e => roomOptionsTmp.push({label: e.name, id: e.id}))
            setRooms(response.data.rooms)
            setRoomsOptions(roomOptionsTmp)
            setSelectedRoomForShelf(roomOptionsTmp[0])
            setSelectedRoom(response.data.rooms[0].id)
        }//else
        // {
        //     let roomsTmp=[{name:"rum1",id:1},{name:"room2",id:2}]
        //     let roomOptionsTmp=[{label:"rum1",id:1},{label:"room2",id:2}]
        //     setRoomsOptions(roomOptionsTmp)
        //     setRooms(roomsTmp)
        //     setSelectedRoomForShelf(roomOptionsTmp[0])
        //     setSelectedRoom(roomsTmp[0].id)
        // }
    })
},[])

useEffect(()=>{

    if(rooms.length!==0)
    {
        let shelfsToListTmp =[]
        for(let i=0; i<shelfs.length; i++)
        {
            if(shelfs[i].room===selectedRoom)
            {
                shelfsToListTmp.push(shelfs[i])
            }
        }

        if(shelfsToListTmp.length > 0)
        {
            setSelectedShelf(shelfsToListTmp[0].id)
        }

        setShelfsToList(shelfsToListTmp)
        }
},[selectedRoom, shelfs])

var runFetch = async (filter) => {

    const rawResponse = await axios.get("https://www.googleapis.com/books/v1/volumes?q="+filter+"&maxResults=5")

    if(rawResponse.data.items.length!==0)
    {
        setFoundBooks(rawResponse.data.items)
        setHasSearched(true)
    }else
    {
        console.log("we didn't find enyfin")
    }
} 

    return(
        <>
            <div className="container-fluid d-flex col-6 bg-banana-blue bg-opacity-25 border border-1 border-dark rounded-2 mt-3 p-5 pb-4 justify-content-center">
                <div className="col-10 d-flex flex-column align-items-center">
                    <div className="row">
                        {props.type==="personal" &&
                            <p className="fs-2 fw-semibold">Add to personal library</p>
                        }
                        {props.type==="wanted" &&
                            <p className="fs-2 fw-semibold">Add to wanted books:</p>
                        }
                        <div className="d-flex justify-content-center">
                        <Search>
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase 
                            placeholder="Find title" 
                            inputProps={{ 'onChange':(e)=>{
                                setFilter(e.target.value)
                            } }}/>
                        </Search>
                        
                        <button className="btn btn-banana-primary" onClick={()=>{
                                runFetch(filter)
                            }}>Search</button>
                            
                        <Popup id="popup" open={hasSearched} position="bottom" onClose={()=>setHasSearched(false)}>
                            <div className="d-flex flex-column align-items-center" onClick={(e)=>{
                                let value = e.target.getAttribute('value')
                                let bookTmp = foundBooks.find(element => element.volumeInfo.industryIdentifiers!==undefined ? element.volumeInfo.industryIdentifiers[0].identifier === value:"");//i have no idea if this can stay like this
                                setBookSrc(bookTmp.volumeInfo.imageLinks? bookTmp.volumeInfo.imageLinks.smallThumbnail : notFound)
                                setBook({
                                    title: bookTmp.volumeInfo.title,
                                    author: bookTmp.volumeInfo.authors!==undefined ? bookTmp.volumeInfo.authors[0]: "No Authors",
                                    src: bookTmp.volumeInfo.imageLinks!==undefined ? bookTmp.volumeInfo.imageLinks.smallThumbnail : "notFound",
                                    description: bookTmp.volumeInfo.description!==undefined ? bookTmp.volumeInfo.description : "No Description",
                                    googleId: bookTmp.id})
                                setHasSearched(false)
                                }}>
                                <div className="row col-11">
                                    <div className="col-4">
                                        <div className="d-flex align-items-start">
                                            <h2>Title</h2>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="d-flex align-items-start">
                                            <h2>Authors</h2>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="d-flex align-items-start">
                                            <h2>ISBN</h2>
                                        </div>
                                    </div>
                                </div>
                                {foundBooks.map((b)=>
                                    <Book variant="list" key={v4()} {...b.volumeInfo}></Book>
                                )}
                            </div>
                        </Popup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <img src={bookSrc} style={{width: "100%",height:"100%", objectFit: "cover"}} />
                        </div>

                        <div className="col-7 ms-2 mt-5 row">
                            <label className="d-block">Author</label>
                            <Textfield 
                                size="small"
                                disabled
                                className="col-10"
                                value={book.author}/>
                            <label className="d-block mt-2">Title</label>
                            <Textfield 
                                size="small"
                                disabled
                                className="col-10"
                                value={book.title}/>

                            <label className="d-block mt-2">Room</label>
                            <FormControl className="col-8" size="small">
                                <Select
                                    displayEmpty
                                    required
                                    id="roomSelect"
                                    value={selectedRoom}
                                    size="small"
                                    onChange={(e)=>{
                                        setSelectedRoom(e.target.value)
                                    }} >
                                    {
                                        Array.from(rooms).map((r)=><MenuItem key={v4()} value={r.id}>{r.name}</MenuItem>)
                                    }                                    
                                </Select>
                            </FormControl>
                            <Popup id="popupRoom" open={displayAddRoom} position="bottom" onClose={()=>setDisplayAddRoom(false)}>
                                <div>
                                    <h2>Room Name</h2>
                                    <Textfield 
                                        required
                                        label="Name"
                                        value={newRoomName}
                                        onChange={(e)=>{
                                            setNewRoomName(e.target.value)
                                        }}
                                    />
                                    <button onClick={()=>{
                                        let roomsTmp = rooms
                                        axios.post("http://localhost:5000/api/room/add", {
                                            user_key:sessionUserKey,
                                            room_name:newRoomName,
                                        }).then((response) => {
                                            if(response.msg!=="success")
                                            {
                                                roomsTmp.push({name:newRoomName, id:response.id})
                                                let roomsOptionsTmp = roomsOptions
                                                roomsOptionsTmp.push({id: response.id, label: newRoomName})
                                                setRoomsOptions(roomsOptionsTmp)
                                                setRooms(roomsTmp)
                                            }
                                            setDisplayAddRoom(false)
                                            setNewRoomName("")
                                        })
                                    }
                                    }>Add Room</button>
                                </div>
                            </Popup>
                            <div className="col-4 pe-0">
                                <button className="col-12 btn btn-banana-primary h-100" onClick={()=>setDisplayAddRoom(true)}>Add New</button>
                            </div>

                            <label className="d-block mt-2">Shelf</label>                    
                            <FormControl className="col-8" size="small">
                            <Select
                                    displayEmpty
                                    required
                                    id="shelfSelect"
                                    value={selectedShelf}
                                    size="small"
                                    onChange={(e)=>{
                                        setSelectedShelf(e.target.value)
                                    }} >
                                    {
                                        Array.from(shelfsToList).map((s)=><MenuItem key={v4()} value={s.id}>{s.name}</MenuItem>)
                                    }                                    
                                </Select>
                            </FormControl>
                            <Popup id="popupShelf" open={displayAddShelf} position="bottom" onClose={(e)=>{setDisplayAddShelf(false)
                                }}>
                                <h2>Room Name</h2>
                                <SelectButBetter
                                    value={selectedRoomForShelf}
                                    options={roomsOptions}
                                    onChange={setSelectedRoomForShelf}
                                />
                                <h2>Shelf Name</h2>
                                    <Textfield 
                                        required
                                        onChange={(e)=>{
                                            setNewShelfName(e.target.value)
                                        }}
                                    />
                                <button onClick={()=>{
                                        axios.post("http://localhost:5000/api/shelf/add", {
                                            user_key:sessionUserKey,
                                            shelf_name:newshelfName,
                                            room_id:selectedRoomForShelf.id
                                        }).then((response) => {
                                            if(response.data.msg==="success")
                                            {
                                                let shelfsTmp = shelfs
                                                shelfsTmp.push({id:response.data.id, name:newshelfName, room: selectedRoomForShelf.id})
                                                setShelfs(shelfsTmp)
                                                setSelectedRoomForShelf(rooms[0].id)
                                                setSelectedRoom(rooms[0].id)
                                            }
                                            setDisplayAddShelf(false)
                                            setNewShelfName("")
                                        })
                                    }
                                    }>Add shelf</button>
                            </Popup>
                            <div className="col-4 pe-0">
                                    <button className="col-12 btn btn-banana-primary h-100" onClick={()=>setDisplayAddShelf(true)}>Add New</button>
                            </div>
                        </div>
                    </div>
                    <div className="row col-12 d-flex justify-content-center">
                        <label>Description</label>
                        <Textfield 
                            disabled
                            value={book.description}
                            multiline
                            rows={5}
                            />
                    </div>
                    {props.type==="personal" &&
                        <div className="row col-10 align-items-end ">
                            <div className="col">
                                <label>Condition</label>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={condition}
                                        size="small"
                                        onChange={(e)=>{
                                        setCondition(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={"good"}>Good</MenuItem>
                                        <MenuItem value={"bad"}>Bad</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col d-flex">
                                <ThemeProvider theme={theme}>
                                    <Switch  color="bananaBlueSwitch" checked={isOffered? true:false} value={isOffered} onChange={()=>setIsOffered(!isOffered)}/>
                                </ThemeProvider>
                                <label className="fs-5">Available for renting</label>
                            </div>
                        </div>
                    }
                    
                    <div className="row col-12 d-flex justify-content-center mt-4">
                        {props.type==="personal" &&
                            <button className="col-3 btn btn-banana-primary" onClick={()=>window.location.href="/PersonalLibrary"}>Cancel</button>
                        }
                        {props.type==="wanted" &&
                            <button className="col-3 btn btn-banana-primary" onClick={()=>window.location.href="/WantedLibrary"}>Cancel</button>
                        }
                        <button className="col-3 ms-2 btn btn-banana-primary" onClick={()=>{
                            if(props.type==="personal")
                            {
                                axios.post("http://localhost:5000/api/owned_book/add", {
                                    user_key:sessionUserKey,
                                    book:book,
                                    shelf_id:selectedShelf,
                                    room:selectedRoom,
                                    rentable:isOffered,
                                    book_state:condition
                                })
                                props.setAddPersonalBook(false)
                            }else if(props.type==="wanted")
                            {
                                axios.post("http://localhost:5000/api/wanted_book/add", {
                                    user_key:sessionUserKey,
                                    book:book,
                                    shelf_id:selectedShelf,
                                    room:selectedRoom,
                                    rentable:isOffered,
                                    book_state:condition
                                })
                                props.setAddWantedBook(false)
                            }
                        }}>Add Book</button>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default AddBookComponent;