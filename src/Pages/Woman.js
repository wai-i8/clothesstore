import React, { Fragment, useEffect, useState } from "react";
import { cartAction } from "../Store/cart-Slice";
import { useDispatch } from "react-redux"
import ToTopButton from "../Components/ToTopButton";

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

const Woman = (props) => {
    const dispatch = useDispatch();
    const [listItem,setListItem] = useState([]);
    const [snackBar, setSnackBar] = useState(false);

    //console.log("sha256: ",sha256("hello"))

    useEffect(()=>{   
        fetch("https://elegant-moment-284814-default-rtdb.firebaseio.com/clothes.json", {method: "GET"}).
        then(res => res.json())
        .then(
            (result) => {
                    //console.log("result: ",result);
                    result = result.filter((x) => x.type ===props.children)
                    setListItem(result.map((x) => {
                        return(
                            <div key={x.id} className="woman_product_item">
                                <img src={x.imgurl} alt="" />
                                <div className="woman_product_item_details">
                                    <span className="woman_product_item_details_title">{x.name}</span>
                                    <span className="woman_product_item_details_price">${x.price}</span>
                                </div>
                                <div className="woman_product_item_cart">
                                    <span onClick={() => {dispatch(cartAction.addItem({id: x.id, name: x.name, img: x.imgurl, price: x.price, qty: 1}));handleOpenSnackBar()}}><i className="fa-solid fa-cart-arrow-down" />加入購物車</span>
                                </div>
                            </div>  
                        )
                }))
            }
        )
        window.scrollTo({top: 0,left: 0,});
    },[props.children]);

    const handleOpenSnackBar = () => {
        setSnackBar(true);
    };
    
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackBar(false);
    };

    const action = (
        <Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackBar}
          >
          </IconButton>
        </Fragment>
    );

    //useEffect(()=>{console.log("testing useEffect");});
  //console.log("testing rerender");
    return(
        <div className="woman">
            <div className="woman_product">
                {listItem}
            </div>
            <ToTopButton />
            <Snackbar
                open={snackBar}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
                message="已加入購物車"
                action={action}
            />
        </div>
    )
}

export default Woman;