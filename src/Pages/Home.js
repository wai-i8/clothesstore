import React, { useState } from "react";
import Gallery from "../Components/Gallery";
import Showcase from "../Components/Showcase";
//import TextInputWithFocusButton from "../Components/testing";

const Home = () => {

    const [showBotton, setShowBotton] = useState(0)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 1000){
            setShowBotton(true);
        } 
        else{
            setShowBotton(false);
        }
      };
      
      window.addEventListener('scroll', toggleVisible);
      
    
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      };

    return(
        <>
        <Gallery />
        <Showcase />
        {showBotton && <button className="topbtn fa-solid fa-arrow-up" onClick={scrollToTop}></button>}
        {/*TextInputWithFocusButton />*/}
        </>
    )
}

export default Home;