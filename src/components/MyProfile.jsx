import React, { useEffect, useState, Component } from "react";

function myProfile(props) {

  return (
    <>
        <div>
            my profile
        </div>
        <div>
            {props.name}
        </div>
    </>
  );
}

export default myProfile;
