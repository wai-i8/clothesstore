import { Link } from "react-router-dom";

const Footer =(props) => {
    return(
        <div className="footer">
            <div className="footer_top">
                <div className="footer_top-about">
                <Link to="/">關於我們</Link>
                <a href="#">聯絡我們</a>
                <a href="#">退款和退貨政策</a>
                </div>
                <div className="footer_top-social">
                    <span className="footer_top-social-followus">追蹤我們</span>
                    <div className="footer_top-social-icon">
                        <a className="fa-brands fa-facebook white-font font-big" href="#" />
                        <a className="fa-brands fa-instagram white-font font-big" href="https://www.instagram.com/likes_168" />
                        <a className="fa-brands fa-youtube white-font font-big" href="#" />
                    </div>
                </div>
                <div className="footer_top-payment">
                    <span>支付方法</span>
                    <div className="footer_top-payment-icon">
                        <a className="fa-brands fa-cc-visa white-font font-big" href="#" />
                        <a className="fa-brands fa-cc-mastercard white-font font-big" href="#" />
                        <a className="fa-brands fa-cc-paypal  white-font font-big" href="#" />
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