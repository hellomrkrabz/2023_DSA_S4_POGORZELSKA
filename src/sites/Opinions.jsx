import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import banana from "../media/banana.png";
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OpinionGrid from "../components/OpinionGrid";
import Popup from 'reactjs-popup';
import Textfield from '@mui/material/TextField'
import axios from "axios"
import findCookie from "../scripts/findCookie";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    //marginRight: theme.spacing(2),
    //marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      //marginLeft: theme.spacing(3),
      //width: 'auto',
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

const username = window.location.pathname.split('/').pop()
var sessionUsername= findCookie("sessionUserUsername")
var sessionUserKey= findCookie("sessionUserKey")

function Opinions(props) {

    const opinion1={user:"ziemniok",date:"30.02.2023",score:2,content:"not gut not bad", opinion_id:1}
    const opinion2={user:"Filip",date:"31.02.2023",score:2,content:"no ni ma tego Novi sadu :(", opinion_id:2}
    const opinion3={user:"Minion",date:"35.02.2023",score:5,content:"banana", opinion_id:3}
    const opinion4={user:"Katze",date:"36.02.2023",score:3,content:">:(", opinion_id:4}
    const opinion5={user:"Pflanze",date:"399.02.2023",score:4,content:"Chryzantemy złociste", opinion_id:5}

    const [opinions, setOpinions] = useState([])
    const [filteredOpinions, setFilteredOpinions] = useState([])
    const [opinionsToDisplay, setOpinionsToDisplay] = useState(opinions)
    const [filter, setFilter] = useState({user:"", sort:"newest"})
    const [pageNumber, setPageNumber] = useState(0)
    const [reportContent, setReportContent] = useState("")
    const [details ,setDetails] = useState({user:"", date:"", score:0, content:"", opinion_id:-1})
    const [displayDetails, setDisplayDetails] = useState(false)

    async function fetchOpinion()
    {
        const response = await axios.get("http://localhost:5000/api/opinions/" + window.location.pathname.split('/').pop())
        let fetchedOpinions = response.data.opinions

        setOpinions(fetchedOpinions)
        filterOpinions(fetchedOpinions, filter)
    }

    useEffect(() => {
        fetchOpinion()
    }, []);

    useEffect(() => {
        if(filteredOpinions!==undefined && filteredOpinions.length > 0)
        {
            let noe=20;
            let offset=pageNumber*noe;
            setOpinionsToDisplay(filteredOpinions.slice(offset,offset+noe))
        }
    }, [filteredOpinions,pageNumber]);

    function compareDates( a, b ) {
    if ( a.date < b.date ){
        return -1;
    }
    if ( a.date > b.date ){
        return 1;
    }
    return 0;
    }

    function compareScore( a, b ) {
    if ( a.score < b.score ){
        return -1;
    }
    if ( a.score > b.score ){
        return 1;
    }
    return 0;
    }

    function filterOpinions(op, f)
    {
        if(op.length>0)
        {
            const userFilter = new RegExp(f.user, 'i');

            var result = op
                .filter(b => userFilter.exec(b.user))

            if(f.sort==="newest")
            {
                result.sort(compareDates)
            }

            if(f.sort==="oldest")
            {
                result.sort(compareDates)
                result = result.reverse()
            }

            if(f.sort==="highest")
            {
                result.sort(compareScore)
                result = result.reverse()
            }

            if(f.sort==="lowest")
            {
                result.sort(compareScore)
            }

        }
        setFilteredOpinions(result)
        setPageNumber(0)
    }

    return (
        <>
            <div>
                <Navbar site={"/Opinions"} username={props.username}/>
            </div>
            <div className="container-fluid h-100">
                <div className="row h-100">
                        <div className="col-9">
                            <OpinionGrid opinions={opinionsToDisplay} setDetails={setDetails} setDisplayDetails={setDisplayDetails}/>
                        </div>
                        <div className="col-3 bg-banana-blue bg-opacity-25 d-flex flex-column h-100">
                            <h3>{username}'s opinions</h3>
                            <div className="d-flex flex-column flex-grow-1">
                                <Search>
                                    <SearchIconWrapper>
                                        <img src={banana} height="30px"/>
                                    </SearchIconWrapper>
                                    <StyledInputBase 
                                    placeholder="Find user" 
                                    inputProps={{ 'onChange':(e)=>{
                                        setFilter({...filter,"user":e.target.value})
                                    } }}/>
                                </Search>
                                <FormControl className="col-11 mt-3">
                                    <Select
                                        value={filter.sort}
                                        onChange={(e)=>{
                                            setFilter({...filter,"sort":e.target.value})
                                        }}
                                    >
                                        <MenuItem value={"newest"}>Newest</MenuItem>
                                        <MenuItem value={"oldest"}>Oldest</MenuItem>
                                        <MenuItem value={"highest"}>Highest</MenuItem>
                                        <MenuItem value={"lowest"}>Lowest</MenuItem>
                                    </Select>
                                </FormControl>

                                <div className="d-flex flex-column justify-content-between flex-grow-1 mb-4">
                                    <button className="col-12 btn btn-banana-primary-dark mt-3" onClick={()=>{ filterOpinions(opinions,filter)  }}>Search</button>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-banana-primary-dark col-5" onClick={()=>{
                                            if(pageNumber>0)
                                            {
                                                setPageNumber(pageNumber-1)
                                            }
                                        }}>Prev</button>
                                        <button className="btn btn-banana-primary-dark col-5" onClick={()=>{
                                            if(filteredOpinions!==undefined && pageNumber < (filteredOpinions.length/24) -1)
                                            {
                                                setPageNumber(pageNumber+1)
                                            }
                                        }}>Next</button>
                                    </div>
                                </div>

                                <Popup id="popup" open={displayDetails} position="bottom" onClose={()=>setDisplayDetails(false)}>
                                    <div className="d-flex justify-content-center row">
                                        <div className="d-flex flex-column col-10">
                                            <h2 className="d-flex justify-content-start">Report Content</h2>
                                            <Textfield multiline
                                            rows={4}
                                            style={{backgroundColor:"white"}} 
                                            value={reportContent} 
                                            onChange={(e)=>{setReportContent(e.target.value)}} 
                                            />
                                        </div>
                                        <button className="btn btn-banana-primary col-3 mt-3" onClick={()=>{
                                            const date = new Date();
                                            axios.post("http://localhost:5000/api/report/add", {
                                                content:reportContent,
                                                reporter:sessionUsername,
                                                reported:details.user,
                                                date: String(date.getFullYear()) + "-" + String(("0" + date.getMonth()).slice(-2)) + "-" + String(("0" + date.getDate()).slice(-2)),
                                                opinion_id:details.opinion_id,
                                                user_key:sessionUserKey,
                                            });
                                            setDisplayDetails(false)
                                            setDetails({user:"", date:"", score:0, content:"",opinion_id:-1})
                                            setReportContent("")
                                        }}>Report User</button>
                                    </div>
                                </Popup>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Opinions;
