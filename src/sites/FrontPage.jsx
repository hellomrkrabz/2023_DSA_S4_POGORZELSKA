import React, { useState } from "react";
import Navbar from "../components/Navbar";
import banana from "../media/banana.png"
import win31 from "../media/win31.png"
import korwin from "../media/korwin.png"
import pattern from "../media/datapattern.png"
import jojo from "../media/jojo.png"
import beer from "../media/beer.png"
import Textfield from "@mui/material/TextField"
import Book from "../components/Book";
import BookViewer from "../components/BookViewer";
import { Link } from "react-router-dom";

function FrontPage(props) {
    
    var book1={title:"Windows 3.1 PL", description:"'MS Windows 3.1 PL' to książka przeznaczona dla szerokiego kręgu odbiorców zainteresowanych", src:win31, link:"/XD"}
    var book2={title:"Niebezpieczne Ubezpieczenia", description:"'W czasach mody, czy wręcz manii ubezpieczeniowej, książka jest niezwykle cenną odtrutką na", src:korwin}
    var book3={title:"Feature Selection for Data and Pattern Recognition", description:"This book presents recent developments and research trends in the field' of feature selection for data and pattern recognition, highlighting a number of latest advances", src:pattern}
    var book4={title:"JOJO’s Bizzare Adventure", description:"A multigenerational tale of the heroic Joestar family and their never-ending battle against evil!", src:jojo}

    return (
        <>
            <div>
                <Navbar site={"/FrontPage"} isLoggedIn={props.isLoggedIn} username={props.username}/>
            </div>

            {props.isLoggedIn ? 
            <>
                <div className="container-fluid">
                    <div className="row">
                        <img src={beer} height="300px"/>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <Link to="/PersonalLibrary">
                                <button>My Library</button>
                            </Link>
                        </div>
                        <div className="col-2">
                            <button>Genre</button>
                        </div>
                        <div className="col-2">
                            <button>Location</button>
                        </div>
                        
                        <div className="col-3">
                            <Textfield id="searchBar" label="Outlined" variant="outlined" ><img src={banana} height="20px"/></Textfield>
                        </div>
                        <div className="col-2">
                            <button>Search</button>
                        </div>
                    </div>

                    <div className="row">
                        <Book variant="medium" {...book1}></Book>
                        <Book variant="medium" {...book2}></Book>
                        <Book variant="medium" {...book3}></Book>
                        <Book variant="medium" {...book4}></Book>

                    </div>
                    
                </div> 
            </>
            :
            <>
                <BookViewer></BookViewer>
                <div>xd</div>
                <div>not logged</div>   
            </>
            }
        </>
    );
}

export default FrontPage;
