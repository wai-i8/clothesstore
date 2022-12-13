import React, { useState } from "react";
import { useSelector , useDispatch } from "react-redux"
import { cartAction } from "../Store/cart-Slice";
import Backdrop from "./Backdrop";
import Confirm from "./Confirm";

const Cart = () => {
    //const state = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const state = useSelector(state => state.cart);
    const [showConfirm, setShowConfirm] = useState(false);
    
    let total = 0;
    state.map( x => total = total + x.price * x.qty)
    console.log("state.length: ", state.length)
    const listItem = state.map( (x, index) =>{
            console.log("x: ", x);
            return(
                <div key={x.name} className="cart_item">
                    <img src={x.img} />
                    <div className="cart_item_details">
                        <div className="cart_item_details_left">
                            <span className="cart_item_details_left_title">{x.name}</span>
                            <div className="cart_item_details_left_qty">
                                <span>qty: {x.qty}</span>
                                <i className="cart_item_details_left_qty_icon fa-solid fa-plus" onClick={() => dispatch(cartAction.increaseItem(index))}></i>
                                <i className="cart_item_details_left_qty_icon fa-solid fa-minus" onClick={() => dispatch(cartAction.decreaseItem(index))}></i>
                            </div>

                        </div>
                        <div className="cart_item_details_right">
                            <span>$ {x.price * x.qty}</span>
                        </div>
                        
                    </div>
                </div>
            )
        })
        console.log("state.length: ", state.length);
        let cartEmpty = state.length === 0 ? true : false;
    return(
        <div className="cart" onClick={(e) => e.stopPropagation()}>
            {cartEmpty && <div className="cart_alert">購物車還沒有物品,趕快去購物吧!</div>}
            {listItem}
            {!cartEmpty && 
            <div className="cart_buttom">
                <div className="cart_buttom_clear">
                    <span onClick={() => setShowConfirm(true)}>清空購物車</span>
                </div>
                <div className="cart_buttom_total">
                    <span onClick={() => dispatch(cartAction.addItem())}>${total}</span>
                </div>
            </div>
            }
            {showConfirm &&  
            <Backdrop close={() => setShowConfirm(false)} transpanent={0.6}>
                <Confirm close={() => setShowConfirm(false)} clear={() => dispatch(cartAction.deleteAllItem())} >要清空購物車?</Confirm>
            </Backdrop> }
        </div>
    )
}

export default Cart;