import React from "react";

const Confirm = (props) => {

    let style;
    if(props.isOnlyConfirm){
        style={
            width : "100%"
        }
    }else{
        style={
            width : "50%"
        }
    }

    return(
        <div className="confirm" onClick={(e) => e.stopPropagation()}>
        <div className="confirm_close">
            <i className="confirm_close_icon  fa-solid fa-xmark" onClick={() => props.close()}></i>
        </div>
        <span>{props.children}</span>
        <div className="confirm_form">
            <div className="confirm_form_submit" style={style}>
                    <button onClick={() => {props.clear();props.close()}}>確認</button>
            </div>
            {!props.isOnlyConfirm &&
            <div className="confirm_form_cancel">
                    <button onClick={() => props.close()}>取消</button>
            </div>
            }
        </div>
    </div>
    )
}

export default Confirm;