import React, { useEffect, useState } from "react";
import { cartAction } from "../Store/cart-Slice";
import { useDispatch } from "react-redux"
import ToTopButton from "../Components/ToTopButton";
import sha256 from 'js-sha256';

const Woman = (props) => {
    const dispatch = useDispatch();
    const [listItem,setListItem] = useState([]);

    //console.log("sha256: ",sha256("hello"))

    useEffect(()=>{   
        fetch("http://192.168.88.53:8080/clothes", {method: "GET"}).
        then(res => {console.log("res: ",res); return res.json()})
        .then(
            (result) => {
                    //console.log("result: ",result);
                    result = result.filter((x) => x.type ===props.children)
                    setListItem(result.map((x) => {
                        return(
                            <div key={x.id} className="woman_product_item">
                                <img src={x.imgurl} alt="" />
                                <div className="woman_product_item_details">
                                    <span className="woman_product_item_details_title">{x.name}</span>
                                    <span className="woman_product_item_details_price">${x.price}</span>
                                </div>
                                <div className="woman_product_item_cart">
                                    <span onClick={() => dispatch(cartAction.addItem({id: x.id, name: x.name, img: x.imgurl, price: x.price, qty: 1}))}><i className="fa-solid fa-cart-arrow-down" />加入購物車</span>
                                </div>
                            </div>  
                        )
                }))
            }
        )
    },[props.children]);

    //useEffect(()=>{console.log("testing useEffect");});
  //console.log("testing rerender");
    return(
        <div className="woman">
            <div className="woman_product">
                {listItem}
            </div>
            <ToTopButton />
        </div>
    )
}

export default Woman;