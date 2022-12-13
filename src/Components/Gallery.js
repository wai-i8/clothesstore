 import React, { useEffect, useReducer, useRef } from "react";

 const initialState = {count: 0};

 const reducer = (state,action) => {
    switch (action.type) {
        case "increment":
            return {count: state.count + 1};
        case "decrement":
            return {count: state.count - 1};
        case "reset":
            return {count: state.count = 0};
        case "set":
            return {count: action.value};
        default:
            return {count: state.count};
    }
 }

const Gallery = () => {
    const [indexOfCurrentImg, dispatch] = useReducer(reducer, initialState);
    const isFirstRender = useRef(true);
    const imgUrlLength = useRef(0);

    const imgUrl = [
        "https://www.gu-global.com/hk/images/banners/221128/221128_main_W_Bags.jpg",
        "https://www.gu-global.com/hk/images/banners/221114/221114_main_MW_Sweatshirt_feature.jpg",
        "https://www.gu-global.com/hk/images/banners/221125/221125_main_W_Outer_PM2.jpg",
        "https://www.gu-global.com/hk/images/banners/221121/221121_main_M_Baggy_Slacks.jpg",
    ]
    imgUrlLength.current = imgUrl.length;
    let ulStyle = {transform: `translateX(-${indexOfCurrentImg.count*(1/imgUrl.length)*100}%`, width: `${imgUrl.length*100}%`};
    const imgList = imgUrl.map( (x, index)=> {
        return (
            <li key={index} className="gallery_li">
                <img src={x} className="gallery_img" alt="" />
            </li>
        )
    })
    
    useEffect(() => {
        if (isFirstRender.current){
            setInterval(()=>{
                //console.log("indexOfCurrentImgInside: " + indexOfCurrentImg);
                dispatch({type : "increment"});
            }, 5000)     
        }
        isFirstRender.current = false;
    },[])
    
    useEffect(() => {
        if(indexOfCurrentImg.count === imgUrlLength.current){
            dispatch({type : "reset"});
        }
    },[indexOfCurrentImg.count])

    //const dotClickHandler = (index) => {
    //    setindexOfCurrentImg(index);
    //}

    //function dotClickHandler(index){
    //    setindexOfCurrentImg(index);
    //}

    const indexDot = imgUrl.map((x, index) => {
        return(
            <button key={index} className={`gallery_index-dot ${index === indexOfCurrentImg.count && "gallery_index-dot_active"}`} 
            onClick={() => dispatch({type : "set", value: index})}>
                &nbsp;
            </button>
        )
    })

    return(
        <div className="gallery">
            <ul className="gallery_ul" style={ulStyle}>
                {imgList}
            </ul>
            <button className="gallery_left-button" onClick={() => dispatch({type : "decrement"})}>
                <span className="fa-solid fa-chevron-left"></span>
            </button>
            <button className="gallery_right-button" onClick={() => dispatch({type : "increment"})}>
                <span className="fa-solid fa-chevron-right"></span>
            </button>
            <div className="gallery_index">
                    {indexDot}
            </div>
        </div>
    );
};

export default Gallery;