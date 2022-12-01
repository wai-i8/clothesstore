import { useEffect, useRef, useState } from "react";

const Gallery = (props) => {
    const [indexOfCurrentImg, setindexOfCurrentImg] = useState(0);
    const imgUrl = [
        "https://www.gu-global.com/hk/images/banners/221128/221128_main_W_Bags.jpg",
        "https://www.gu-global.com/hk/images/banners/221114/221114_main_MW_Sweatshirt_feature.jpg",
        "https://www.gu-global.com/hk/images/banners/221125/221125_main_W_Outer_PM2.jpg",
        "https://www.gu-global.com/hk/images/banners/221121/221121_main_M_Baggy_Slacks.jpg",
    ]
    let ulStyle = {transform: `translateX(-${indexOfCurrentImg*(1/imgUrl.length)*100}%`, width: `${imgUrl.length*100}%`};
    const imgList = imgUrl.map( (x, index)=> {
        return (
            <li key={index} className="gallery_li">
                <img src={x} className="gallery_img" />
            </li>
        )
    })
    let useEffectB = true;
    let timeoutID = 0;
    useEffect(() => {
        if (useEffectB){
            setInterval(()=>{
                //console.log("indexOfCurrentImgInside: " + indexOfCurrentImg);
                rightClickHandler();
            }, 5000)     
        }
        useEffectB = false;
        console.log("indexOfCurrentImg: " + indexOfCurrentImg);
    },[])

    useEffect(() => {
        if(indexOfCurrentImg === imgUrl.length){
            setindexOfCurrentImg(0);
        }
    },[indexOfCurrentImg])

    const leftClickHandler = () => {
        if (indexOfCurrentImg === 0){
            return;
        }
        setindexOfCurrentImg((prev) => prev - 1)
    }

    const rightClickHandler = () => {
        if (indexOfCurrentImg >= imgUrl.length-1){
            return;
        }
        setindexOfCurrentImg((prev) => prev + 1)
    }

    const dotClickHandler = (index) => {
        setindexOfCurrentImg(index);
    }

    //function dotClickHandler(index){
    //    setindexOfCurrentImg(index);
    //}

    const indexDot = imgUrl.map((x, index) => {
        return(
            <button className={`gallery_index-dot ${index === indexOfCurrentImg && "gallery_index-dot_active"}`} 
            onClick={() => dotClickHandler(index)}>
                &nbsp;
            </button>
        )
    })

    return(
        <div className="gallery">
            <ul className="gallery_ul" style={ulStyle}>
                {imgList}
            </ul>
            <button className="gallery_left-button" onClick={leftClickHandler}>
                <span className="fa-solid fa-chevron-left"></span>
            </button>
            <button className="gallery_right-button" onClick={rightClickHandler}>
                <span className="fa-solid fa-chevron-right"></span>
            </button>
            <div className="gallery_index">
                    {indexDot}
            </div>
        </div>
    );
};

export default Gallery;