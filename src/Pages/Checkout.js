import React, { useRef, useState } from "react";
import { useSelector , useDispatch } from "react-redux"
import { cartAction } from "../Store/cart-Slice";
import { authAction } from "../Store/auth-Slice";
import { useNavigate } from "react-router-dom";
import Backdrop from "../Components/Backdrop";
import Confirm from "../Components/Confirm";
import Signin from "../Components/Signin";

const Checkout = () => {
    //const state = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const state = useSelector(state => state.cart);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.auth.isLogin);
    const user_id = useSelector(state => state.auth.id);
    const token = useSelector(state => state.auth.token);
    const paymentMsg = useRef("");
    const [showSignin, setShowSignin] = useState(false);
    
    let total = 0;
    state.map( x => total = total + x.price * x.qty)
  //console.log("state.length: ", state.length)
    const listItem = state.map( (x, index) =>{
            //console.log("x: ", x);

            return(
                <div key={x.name} className="checkout_item">
                    <img src={x.img} />
                    <div className="checkout_item_details">
                        <div className="checkout_item_details_left">
                            <span className="checkout_item_details_left_title">{x.name}</span>
                            <div className="checkout_item_details_left_qty">
                                <span>qty: {x.qty}</span>
                                <i className="checkout_item_details_left_qty_icon fa-solid fa-plus" onClick={() => dispatch(cartAction.increaseItem(index))}></i>
                                <i className="checkout_item_details_left_qty_icon fa-solid fa-minus" onClick={() => dispatch(cartAction.decreaseItem(index))}></i>
                            </div>

                        </div>
                        <div className="checkout_item_details_right">
                            <span>$ {x.price * x.qty}</span>
                        </div>
                        
                    </div>
                </div>
            )
    });
    const payHandler = () => {
        let bodyItem = "[";
        //{id: x.id, name: x.name, img: x.img, price: x.price, qty: x.qty}
        state.map((x,index) => {
            if(index !== 0 ){ bodyItem += ","}
            bodyItem += "{\"item_id\": "+x.id+", \"name\": \""+x.name+"\", \"price\": "+x.price+", \"imgurl\": \""+x.img+"\", \"qty\": "+x.qty+"}"
        });
        bodyItem += "]"
        let body = {"user_id":user_id ,"items": bodyItem, "amount": total};

        fetch("http://101.78.209.214:8080/commitorder", {method: "POST", 
        headers: {"content-type": "application/json", authorization: `Bearer ${token}`},
        body: JSON.stringify(body)})
        .then(res => res.json())
        .then(
            (result) => {
               //console.log("result: ", result);
                if(result.status === "1"){
                    paymentMsg.current = "付款成功 稍後請於訂單查詢";
                    setShowSuccess(true);
                    return;
                }else{
                    paymentMsg.current = "付款失敗 請重新登入";
                    setShowFailed(true);
                }
            }
        )
    }
    //console.log("state.length: ", state.length);
    let cartEmpty = state.length === 0 ? true : false;
    return(
        <div className="checkout" onClick={(e) => e.stopPropagation()}>
            {cartEmpty && <div className="checkout_alert">購物車還沒有物品,趕快去購物吧!</div>}
            {listItem}
            {!cartEmpty && 
            <div className="checkout_buttom" onClick={() => setShowConfirm(true)}>
                <div className="checkout_buttom_checkout">
                    <span>結帳</span>
                </div>
                <div><span>${total}</span></div>
            </div>
            }
            {showConfirm && isLogin &&
            <Backdrop close={() => setShowConfirm(false)} transpanent={0.6}>
                <Confirm close={() => setShowConfirm(false)} confirm={() => {setShowConfirm(false);payHandler()}}>確認付款?</Confirm>
            </Backdrop>}
            {showConfirm && !isLogin &&
            <Backdrop close={() => setShowConfirm(false)} transpanent={0.6}>
                <Confirm close={() => setShowConfirm(false)} isOnlyConfirm="true" 
                confirm={() => {setShowConfirm(false);setShowSignin(true)}}>請先登入</Confirm>
            </Backdrop> }



            {showSuccess &&  
            <Backdrop close={() => {setShowSuccess(false);dispatch(cartAction.deleteAllItem());;navigate("/")}} transpanent={0.6}>
                <Confirm close={() => {setShowSuccess(false);dispatch(cartAction.deleteAllItem());;navigate("/")}} isOnlyConfirm="true" 
                confirm={() => {setShowSuccess(false);dispatch(cartAction.deleteAllItem());;navigate("/")}}>{paymentMsg.current}</Confirm>
            </Backdrop> }
            {showFailed &&  
            <Backdrop close={() => {dispatch(authAction.logout());setShowFailed(false);setShowSignin(true)}} transpanent={0.6}>
                <Confirm close={() => {dispatch(authAction.logout());setShowFailed(false);setShowSignin(true)}} isOnlyConfirm="true" 
                confirm={() => {dispatch(authAction.logout());setShowFailed(false);setShowSignin(true)}}>{paymentMsg.current}</Confirm>
            </Backdrop> }




            {showSignin &&  
            <Backdrop close={() => setShowSignin(false)}  transpanent={0.6}>
                <Signin close={() => setShowSignin(false)} />
            </Backdrop> }
        </div>
    )
}

export default Checkout;