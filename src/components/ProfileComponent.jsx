import React, {useEffect} from "react";
import ProfileBookList from "./ProfileBookList";
import ProfileOpinionsList from "./ProfileOpinionsList";
import ProfileInfoComponent from "./ProfileInfoComponent";

function ProfileComponent(props) {

  return (
    <>
        <div className="container-fluid flex-grow-1 d-flex">
            <div className="row flex-grow-1">
                <div className="col-3 bg-banana-blue bg-opacity-25">
                    <ProfileInfoComponent {...props}></ProfileInfoComponent>
                </div>
                
                <div className="col-9 mt-5">

                    <ProfileBookList books={props.books} title={"Wanted Books"} moreLink={"/WantedLibrary"} addLink={"/WantedLibrary/Add"} isLoggedIn={props.isLoggedIn}></ProfileBookList>
                    <ProfileBookList books={props.books} title={"Offered Books"} moreLink={"/PersonalLibrary/Offered"} addLink={"/PersonalLibrary/AddOffered"} isLoggedIn={props.isLoggedIn}></ProfileBookList>
                    {props.isLoggedIn &&
                        <ProfileBookList books={props.books} title={"Personal Library"} moreLink={"/PersonalLibrary"} addLink={"/PersonalLibrary/Add"} isLoggedIn={props.isLoggedIn}></ProfileBookList>
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
