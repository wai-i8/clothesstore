import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../img/dancing.gif';
import Backdrop from "./Backdrop";
import Signin from './Signin';
import ModifyPwd from "./ModifyPwd";
import Cart from "./Cart";
import { useSelector , useDispatch } from "react-redux"
import { cartAction } from "../Store/cart-Slice";
import { authAction } from "../Store/auth-Slice";
import Confirm from "./Confirm";

const Header =() => {
    const phoneOn = ["block", "header_phoneicon_img fa-solid fa-xmark"];
    const phoneOff = ["none", "header_phoneicon_img fa-solid fa-bars"];
    const [phoneList, setPhoneList] = useState(phoneOff);
    const [phoneListAc, setPhoneListAc] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const [showModifyPwd, setShowModifyPwd] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showConfirm, setShowConfirm] =useState(false);
    const [showModifyPwdSuccess, setShowModifyPwdSuccess] = useState(false);
    const [phoneWindow, setPhoneWindow] = useState(false);
    const userName = useSelector(state => state.auth.name);
    const token = useSelector(state => state.auth.token);
    
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(cartAction.refreshAllItem());},[dispatch]);
    const state = useSelector(state => state.cart);
    //const state = JSON.parse(localStorage.getItem("cart"));
    useEffect(()=>{dispatch(authAction.loadLogin());},[dispatch]);
    const isLogin = useSelector(state => state.auth.isLogin);
    const navigate = useNavigate();

    const cartItem = useRef(0);
    //const isLogin = JSON.parse(localStorage.getItem("auth")).isLogin;
  //console.log(isLogin);

    const headerClickHandler = () => {
        if (phoneList[0] === "none"){
            setPhoneList(phoneOn);
        }else{
            setPhoneList(phoneOff);
            setPhoneListAc(false);
        }
    }
    const closeAllPhone = () => {
        setPhoneList(phoneOff);
        setPhoneListAc(false);
    }


    cartItem.current = 0;
    state.forEach (x => {
        cartItem.current += x.qty;
    });

    const handleWindowResize = () => {
        if (window.innerWidth <= 600){
            setPhoneWindow(true);
           //console.log("1Window.innerWidth: ", window.innerWidth, "/phoneWindow: ", phoneWindow);
        }else if (window.innerWidth > 600){
            setPhoneWindow(false);
           //console.log("2Window.innerWidth: ", window.innerWidth, "/phoneWindow: ", phoneWindow);
        }
        
    }
    useEffect(() => {
        handleWindowResize();
    },[]);

    window.addEventListener('resize', handleWindowResize);


    return(
        <Fragment>
            <div className="header">
                <div className="header_top">
                    <div className="header_phoneicon"> 
                        <i className={phoneList[1]} onClick={headerClickHandler}></i>
                    </div>
                    <div className="header_logo">
                        <Link to="/">
                            <img className="header_img" src={logo} alt="" onClick={closeAllPhone}/>
                        </Link >
                        <Link className="header_tittle" to="/">VF</Link >
                    </div>
                    <div className="header_userinfo">
                        {!isLogin && <span className="header_userinfo_login" onClick={() => setShowSignin(true)}>登入</span >}
                        {!isLogin && <Link className="header_userinfo_reg" to="signup">註冊</Link >}
                        
                        {isLogin && <div className="header_userinfo_welcome">
                            <span>歡迎你! {userName} </span>
                            <i className="fa-solid fa-chevron-down"></i>
                            <div className="header_userinfo_welcome_list">
                                <Link to="order">訂單</Link>
                                <span onClick={() => setShowModifyPwd(true)}>修改密碼</span>
                                <span onClick={() => setShowConfirm(true)}>登出</span>
                            </div>
                        </div>}
                        <div className="header_userinfo_cart" onClick={() => phoneWindow? closeAllPhone() || navigate("checkout") : (showCart? setShowCart(false) : setShowCart(true))}>
                            <i className="header_userinfo_cart_icon fa-solid fa-cart-shopping"></i>
                            {cartItem && <div className="header_userinfo_cart_no">{cartItem.current}</div>}
                            {showCart &&  
                            <Backdrop close={() => setShowCart(false)} transpanent={0}>
                                <Cart close={() => setShowCart(false)}/> 
                            </Backdrop>    
                            }
                        </div>
                    </div>
                </div>
                <div className="header_bottom">
                <div className="header_bottom_newitem">
                    <div className="header_bottom_newitem_title">
                        <span>新品熱賣</span>
                    </div>
                    <div className="header_bottom_newitem_cat">
                        <Link to="coats">大衣</Link>
                        <Link to="blazers">西裝 / 外套</Link>
                        <Link to="down">羽絨</Link>
                        <Link to="t-shirts">短袖T恤 / 背心</Link>
                        <Link to="shirts">休閒恤衫</Link>
                        <Link to="long">長袖 / 7分袖T恤</Link>
                    </div>
                </div>
                <Link to="man">男裝</Link>
                <Link to="woman">女裝</Link>
                <Link to="child">童裝</Link>
                </div>
                <div className="header_phonelist" style={{display: phoneList[0]}}>
                     <ul className="header_phonelist_ul">
                        {isLogin && <li onClick={() => setPhoneListAc(true)}>我的帳號</li>}
                        {phoneListAc && <Link className="header_phonelist_ul_ac" 
                        to="order" onClick={closeAllPhone}>訂單</Link>}
                        {phoneListAc && <li className="header_phonelist_ul_ac" 
                        onClick={() => {closeAllPhone();setShowModifyPwd(true)}}>修改密碼</li>}
                        {phoneListAc && <li className="header_phonelist_ul_ac" 
                        onClick={() => {closeAllPhone();setShowConfirm(true)}}>登出</li>}
                        {!isLogin && <li onClick={() => {setShowSignin(true); setPhoneList(phoneOff)}}>登入</li>}
                        {!isLogin && <Link to="signup" onClick={closeAllPhone}>註冊</Link >}
                        <Link to="man" onClick={closeAllPhone}>男裝</Link>
                        <Link to="woman" onClick={closeAllPhone}>女裝</Link>
                        <Link to="child" onClick={closeAllPhone}>童裝</Link>
                     </ul>
                </div>
            </div>
            <div className="dummy"></div>
            {showSignin &&  
            <Backdrop close={() => setShowSignin(false)}  transpanent={0.6}>
                <Signin close={() => setShowSignin(false)} />
            </Backdrop>}
            {showModifyPwd &&  
            <Backdrop close={() => setShowModifyPwd(false)}  transpanent={0.6}>
                <ModifyPwd close={() => setShowModifyPwd(false)} success={()=> {setShowModifyPwd(false);setShowModifyPwdSuccess(true)}}/>
            </Backdrop>}
            {showModifyPwdSuccess &&  
            <Backdrop close={() => setShowModifyPwdSuccess(false)}  transpanent={0.6}>
                <Confirm close={() => setShowModifyPwdSuccess(false)} confirm={() => {dispatch(authAction.logout());navigate("/")}} isOnlyConfirm="true"> 
                修改密碼成功 請重新登入</Confirm>
            </Backdrop>}
            {showConfirm &&  
            <Backdrop close={() => setShowConfirm(false)} transpanent={0.6}>
                <Confirm close={() => setShowConfirm(false)} confirm={() => {dispatch(authAction.logout());navigate("/")}} >確認登出?</Confirm>
            </Backdrop>}
        </Fragment>
    );
}

export default Header;