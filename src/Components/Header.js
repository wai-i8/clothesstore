import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../img/dancing.gif';
import Backdrop from "./Backdrop";
import Signin from './Signin';
import Cart from "./Cart";
import { useSelector , useDispatch } from "react-redux"
import { cartAction } from "../Store/cart-Slice";
import { authAction } from "../Store/auth-Slice";
import Confirm from "./Confirm";

const Header =() => {
    const [phoneList, setPhoneList] = useState(["none", "header_phoneicon_img fa-solid fa-bars"]);
    const [showSignin, setShowSignin] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showConfirm, setShowConfirm] =useState(false);
    
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(cartAction.refreshAllItem());},[]);
    const state = useSelector(state => state.cart);
    //const state = JSON.parse(localStorage.getItem("cart"));
    useEffect(()=>{dispatch(authAction.loadLogin());},[]);
    const isLogin = useSelector(state => state.auth.isLogin);
    //const isLogin = JSON.parse(localStorage.getItem("auth")).isLogin;
    console.log(isLogin);

    const headerClickHandler = () => {
        if (phoneList[0] === "none"){
            setPhoneList(["block", "header_phoneicon_img fa-solid fa-xmark"]);
        }else{
            setPhoneList(["none", "header_phoneicon_img fa-solid fa-bars"]);
        }
    }

    let cartItem = false;
    state.map (x => {
        cartItem += x.qty;
    });

    return(
        <Fragment>
            <div className="header">
                <div className="header_top">
                    <div className="header_phoneicon"> 
                        <i className={phoneList[1]} onClick={headerClickHandler}></i>
                    </div>
                    <div className="header_logo">
                        <Link to="/">
                            <img className="header_img" src={logo} alt="" />
                        </Link >
                        <Link className="header_tittle" to="/">蚊蚊時裝</Link >
                    </div>
                    <div className="header_userinfo">
                        {!isLogin && <span className="header_login" onClick={() => setShowSignin(true)}>登入</span >}
                        {!isLogin && <Link className="header_reg" to="signup">註冊</Link >}
                        
                        {isLogin && <div className="header_userinfo_welcome">
                            <span>歡迎你! 蚊蚊 </span>
                            <i className="fa-solid fa-chevron-down"></i>
                            <div className="header_userinfo_welcome_list">
                                <span onClick={() => setShowConfirm(true)}>登出</span>
                            </div>
                        </div>}
                        <div className="header_cart" onClick={() => showCart? setShowCart(false) : setShowCart(true)}>
                            <i className="header_cart_icon fa-solid fa-cart-shopping"></i>
                            {cartItem && <div className="header_cart_no">{cartItem}</div>}
                            {showCart &&  
                            <Backdrop close={() => setShowCart(false)} transpanent={0}>
                                <Cart/> 
                            </Backdrop>    
                            }
                        </div>
                    </div>
                </div>
                <div className="header_bottom">
                <div className="header_bottom-newitem">
                    <div className="header_bottom-newitem-title"><span>新品熱賣</span></div>
                    <div className="header_bottom-newitem-cat">
                        <Link to="man">男裝</Link>
                        <Link to="woman">女裝</Link>
                    </div>
                </div>
                <Link to="man">男裝</Link>
                <Link to="woman">女裝</Link>
                <Link to="child">童裝</Link>
                </div>
                <div className="header_phonelist" style={{display: phoneList[0]}}>
                     <ul className="header_phonelist_ul">
                        <li>購物車</li>
                        <li onClick={() => (setShowSignin(true), setPhoneList(["none", "header_phoneicon_img fa-solid fa-bars"]))}>登入</li>
                        <Link to="signup" onClick={() => (setPhoneList(["none", "header_phoneicon_img fa-solid fa-bars"]))}>註冊</Link >
                        <li>禮品卡</li>
                        <li>新品熱賣</li>
                        <li>男裝</li>
                        <li>女裝</li>
                        <li>童裝</li>
                     </ul>
                </div>
            </div>
            <div className="dummy"></div>
            {showSignin &&  
            <Backdrop close={() => setShowSignin(false)}  transpanent={0.6}>
                <Signin close={() => setShowSignin(false)} />
            </Backdrop> }
            {showConfirm &&  
            <Backdrop close={() => setShowConfirm(false)} transpanent={0.6}>
                <Confirm close={() => setShowConfirm(false)} clear={() => dispatch(authAction.logout())} >確認登出?</Confirm>
            </Backdrop> }
        </Fragment>
    );
}

export default Header;