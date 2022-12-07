import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../img/dancing.gif';

const Header =() => {
    const [phoneList, setPhoneList] = useState(["none", "header_phoneicon_img fa-solid fa-bars"]);

    const headerClickHandler = () => {
        if (phoneList[0] === "none"){
            setPhoneList(["block", "header_phoneicon_img fa-solid fa-xmark"]);
        }else{
            setPhoneList(["none", "header_phoneicon_img fa-solid fa-bars"]);
        }
    }

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
                        <Link className="header_login" to="#">登入</Link >
                        <Link className="header_reg" to="signup">註冊</Link >
                        <Link className="header_cart fa-solid fa-cart-shopping" to="#"></Link >
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
                <Link to="#">女裝</Link>
                <Link to="#">童裝</Link>
                </div>
                <div className="header_phonelist" style={{display: phoneList[0]}}>
                     <ul className="header_phonelist_ul">
                        <li>購物車</li>
                        <li>登入</li>
                        <li>註冊</li>
                        <li>禮品卡</li>
                        <li>新品熱賣</li>
                        <li>男裝</li>
                        <li>女裝</li>
                        <li>童裝</li>
                     </ul>
                </div>
            </div>
            <div className="dummy"></div>
        </Fragment>
    );
}

export default Header;