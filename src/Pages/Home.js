import React, { useState } from "react";
import Gallery from "../Components/Gallery";
import Showcase from "../Components/Showcase";
import ToTopButton from "../Components/ToTopButton";
//import TextInputWithFocusButton from "../Components/testing";

const Home = () => { 
    return(
        <>
        <Gallery />
        <Showcase />
        <ToTopButton />
        {/*TextInputWithFocusButton />*/}
        </>
    )
}

export default Home;