import React from "react";
import { Link } from "react-router-dom";

const Footer =() => {
    return(
        <div className="footer">
            <div className="footer_top">
                <div className="footer_top-about">
                <Link to="#">關於我們</Link>
                <Link to="#">聯絡我們</Link>
                <Link to="#">退款和退貨政策</Link>
                </div>
                <div className="footer_top-social">
                    <span className="footer_top-social-followus">追蹤我們</span>
                    <div className="footer_top-social-icon">
                        <Link className="fa-brands fa-twitter" to="#" ></Link>
                        <a className="fa-brands fa-instagram" href="https://www.instagram.com/likes_168"></a>
                        <Link className="fa-brands fa-youtube" to="#"></Link>
                    </div>
                </div>
                <div className="footer_top-payment">
                    <span>支付方法</span>
                    <div className="footer_top-payment-icon">
                        <Link className="fa-brands fa-cc-visa" to="#"></Link>
                        <Link className="fa-brands fa-cc-mastercard" to="#"></Link>
                        <Link className="fa-brands fa-cc-paypal " to="#"></Link>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="footer_bottom-left">
                    <Link to="#">PRIVACY POLICY私隱權保護</Link>
                    <Link to="#">CUSTOMER ENQUIRY顧客意見及查詢</Link>
                </div>
                <div className="footer_bottom-right">
                    <span>COPYRIGHT © 蚊蚊 ALL RIGHTS RESERVED</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;