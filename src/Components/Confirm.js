import React from "react";

const Confirm = (props) => {

    return(
        <div className="confirm" onClick={(e) => e.stopPropagation()}>
        <div className="confirm_close">
            <i className="confirm_close_icon  fa-solid fa-xmark" onClick={() => props.close()}></i>
        </div>
        <span>{props.children}</span>
        <div className="confirm_form">
            <div className="confirm_form_submit">
                    <button onClick={() => {props.clear();props.close()}}>確認</button>
            </div>
            <div className="confirm_form_cancel">
                    <button onClick={() => props.close()}>取消</button>
            </div>
        </div>
    </div>
    )
}

export default Confirm;