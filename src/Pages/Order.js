import React, { useState, useEffect } from "react";
import { useSelector , useDispatch } from "react-redux"
import ToTopButton from "../Components/ToTopButton";

const Order = () => {
    //const state = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const state = useSelector(state => state.cart);
    const token = useSelector(state => state.auth.token);
    const [listItem,setListItem] = useState();
    const user_id = useSelector(state => state.auth.id);
    let total = 0;
    state.map( x => total = total + x.price * x.qty)
  //console.log("state.length: ", state.length)

    useEffect(()=>{    
       //console.log("token: ",token);
    if (user_id === -1){
        return;
    }
    fetch("http://192.168.88.53:8080/orders?user_id="+user_id, {method: "GET",
        headers: {authorization: `Bearer ${token}`,},})
    .then(res => res.json())
    .then(
        (result) => {
                setListItem(result.slice(0).reverse().map((x) => {
                   //console.log("setListItem:", x.id);
                   //console.log("x.item:", x.items);
                   //console.log("JSON.parse x.item:", JSON.parse(x.items));
                    let json = JSON.parse(x.items);
                   //console.log("JSON.parse x.item.imgurl:", json[0].imgurl);
                    const listProduct = json.map((jsonItem,index) => {
                        return(
                            <div key={index} className="order_item_details_product">
                                <div className="order_item_details_product_left">
                                    <div className="order_item_details_product_left_img">
                                        <img src={jsonItem.imgurl}/>
                                    </div>
                                </div>
                                <div className="order_item_details_product_right">
                                    <div className="order_item_details_product_right_content">
                                        <div><span>{jsonItem.name}</span></div>
                                        <div><span>${jsonItem.price} <span className="smallfont">數量:</span> {jsonItem.qty}</span></div>
                                        <div><span className="smallfont">總額:</span><span> {jsonItem.price*jsonItem.qty}</span></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    return(
                        <div key={x.id} className="order_item">
                            <div className="order_item_header">
                                <div className="order_item_header_date">
                                    <span>下單日期</span>
                                    <span>{x.time.substring(0, 10)}</span>
                                </div>
                                <div className="order_item_header_amount">
                                    <span>總額</span>
                                    <span>${x.amount}</span>
                                </div>
                                <div className="order_item_header_id">
                                    <span>訂單 #{x.id}</span>
                                </div>
                            </div>
                            <div className="order_item_details">
                                <span>{listProduct}</span>
                            </div>
                        </div>  
                    )
            }))
        }
    )
    },[user_id]);

        let orderEmpty = listItem == "" ? true : false;
    return(
        <div className="order">
            {orderEmpty && <div className="order_alert">還沒有訂單,趕快去購物吧!</div>}
            {listItem}
            <ToTopButton />
        </div>
    )
}

export default Order;