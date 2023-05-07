import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import banana from "../media/banana.png";
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OpinionGrid from "../components/OpinionGrid";

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

function Opinions(props) {
    
    const username = window.location.pathname.split('/').pop()

    const opinion1={user:"zenek",date:"30.02.2023",score:2,content:"not gut not bad"}
    const opinion2={user:"Filip",date:"31.02.2023",score:2,content:"no ni ma tego Novi sadu :("}
    const opinion3={user:"Minion",date:"35.02.2023",score:5,content:"banana"}
    const opinion4={user:"Katze",date:"36.02.2023",score:3,content:">:("}
    const opinion5={user:"Pflanze",date:"399.02.2023",score:4,content:"Chryzantemy złociste"}

    const [opinions, setOpinions] = useState([opinion1,opinion2,opinion3,opinion4,opinion5,opinion1,opinion2,opinion3,opinion4,opinion5,opinion1,opinion2,opinion3,opinion4,opinion5,opinion1,opinion2,opinion3,opinion4,opinion5,opinion1,opinion2,opinion3,opinion4,opinion5,opinion1,opinion2,opinion3,opinion4,opinion5,opinion1,opinion2,opinion3,opinion4,opinion5,opinion1,opinion2,opinion3,opinion4,opinion5,opinion1,opinion2,opinion3,opinion4,opinion5])
    const [filteredOpinions, setFilteredOpinions] = useState([])
    const [opinionsToDisplay, setOpinionsToDisplay] = useState(opinions)
    const [filter, setFilter] = useState({user:"", sort:"newest"})
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        // axios.post("http://localhost:5000/user_validation/logout", {
        //     key: sessionUserKey,
        // })

        filterOpinions(opinions,filter)
    }, []);

    useEffect(() => {
        let noe=24;
        let offset=pageNumber*noe;
        setOpinionsToDisplay(filteredOpinions.slice(offset,offset+noe))
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

        setFilteredOpinions(result)
        setPageNumber(0)
    }

    return (
        <>
            <div>
                <Navbar site={"/Opinions"} username={props.username}/>
            </div>
            <div className="container-fluid bg-primary">
                <div className="row">
                    <div className="col-9 bg-warning">
                        <OpinionGrid opinions={opinionsToDisplay}/>
                    </div>
                    <div className="col-3 bg-success">
                        <h3>{username}'s opinions</h3>
                        <div>
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
                            <FormControl className="col-11">
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
                            
                            <button className="col-12 btn btn-banana-primary-dark" onClick={()=>{ filterOpinions(opinions,filter)  }}>Search</button>
                            <button className="btn btn-banana-primary-dark" onClick={()=>{
                                if(pageNumber>0)
                                {
                                    setPageNumber(pageNumber-1)
                                }
                            }}>Prev</button>
                            <button className="btn btn-banana-primary-dark" onClick={()=>{
                                if(pageNumber < (filteredOpinions.length/24) -1)
                                {
                                    setPageNumber(pageNumber+1)
                                }
                            }}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Opinions;
