import { Fragment, useState, useRef } from "react";
import { Link } from "react-router-dom";




const Header =(props) => {
    return(
        <Fragment>
            <div className="header">
                <div className="header_top">
                    <div className="header_logo">
                        <a href="#">
                            <img className="header_img" src="https://www.pngitem.com/pimgs/m/331-3312863_clothes-logo-icon-png-transparent-png.png" />
                        </a>
                        <a className="header_tittle" href="#">蚊蚊時裝</a>
                    </div>
                    <div className="header_userinfo">
                        <a className="header_login" href="#">登入</a>
                        <a className="header_reg" href="#">註冊</a>
                        <img className="header_cart" src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" />
                    </div>
                </div>
                <div className="header_bottom">
                <Link to="/">禮品卡</Link>
                <div className="header_bottom-newitem">
                    <span>新品熱賣</span>
                    <div className="header_bottom-newitem-cat">
                        <Link to="/">男裝</Link>
                        <Link to="/">女裝</Link>
                    </div>
                </div>
                <Link to="/">男裝</Link>
                <Link to="/">女裝</Link>
                <Link to="/">童裝</Link>
                </div>
            </div>
            <div className="dummy"></div>
        </Fragment>
    );
}

export default Header;