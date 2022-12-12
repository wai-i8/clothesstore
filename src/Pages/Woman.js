import React from "react";
import w1 from '../img/product/w1.jpg';
import w2 from '../img/product/w2.jpg';
import w3 from '../img/product/w3.jpg';
import { cartAction } from "../Store/cart-Slice";
import { useDispatch } from "react-redux"

const Woman = () => {
    const dispatch = useDispatch();

    return(
        <div className="woman">
            <div className="woman_product">
                <div className="woman_product_item">
                        <img src={w1} alt="" />
                        <div className="woman_product_item_details">
                            <span className="woman_product_item_details_title">W's mountain parka</span>
                            <span className="woman_product_item_details_price">$249</span>
                        </div>
                        <div className="woman_product_item_cart">
                            <span onClick={() => dispatch(cartAction.addItem({id: 1, name: "W's mountain parka", img: w1, price: 249, qty: 1}))}><i className="fa-solid fa-cart-arrow-down" />加入購物車</span>
                        </div>
                    </div>
                    <div className="woman_product_item">
                        <img src={w2} alt="" />
                        <div className="woman_product_item_details">
                            <span className="woman_product_item_details_title">Knit melton tailored coat</span>
                            <span className="woman_product_item_details_price">$299</span>
                        </div>
                        <div className="woman_product_item_cart">
                            <span onClick={() => dispatch(cartAction.addItem({id: 2, name: "Knit melton tailored coat", img: w2, price: 299, qty: 1}))}><i className="fa-solid fa-cart-arrow-down" />加入購物車</span>
                        </div>
                    </div>
                    <div className="woman_product_item">
                        <img src={w3} alt="" />
                        <div className="woman_product_item_details">
                            <span className="woman_product_item_details_title">Color block cardigan</span>
                            <span className="woman_product_item_details_price">$199</span>
                        </div>
                        <div className="woman_product_item_cart">
                            <span onClick={() => dispatch(cartAction.addItem({id: 3, name: "Color block cardigan", img: w3, price: 199, qty: 1}))}><i className="fa-solid fa-cart-arrow-down" />加入購物車</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Woman;