import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";


function Home({SignIn, SignUp, Userprofile}){
    return (
        <div>
            <h1>Testing Home</h1>
            <div>
          <SignIn />
          <SignUp/>
          </div>
        </div>
      );
}

