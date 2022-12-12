import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../img/dancing.gif';
import Backdrop from "./Backdrop";
import Signin from './Signin';
import Cart from "./Cart";
import { useSelector } from "react-redux"

const Header =() => {
    const [phoneList, setPhoneList] = useState(["none", "header_phoneicon_img fa-solid fa-bars"]);
    const [showSignin, setShowSignin] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const state = useSelector(state => state.cart);

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
                        <span className="header_login" onClick={() => setShowSignin(true)}>登入</span >
                        <Link className="header_reg" to="signup">註冊</Link >
                        <div className="header_cart">
                            <i className="header_cart_icon fa-solid fa-cart-shopping" onClick={() => showCart? setShowCart(false) : setShowCart(true)}></i>
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
                <Link to="#">禮品卡</Link>
                <div className="header_bottom-newitem">
                    <div className="header_bottom-newitem-title"><span>新品熱賣</span></div>
                    <div className="header_bottom-newitem-cat">
                        <Link to="#">男裝</Link>
                        <Link to="#">女裝</Link>
                    </div>
                </div>
                <Link to="#">男裝</Link>
                <Link to="woman">女裝</Link>
                <Link to="#">童裝</Link>
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
        </Fragment>
    );
}

export default Header;