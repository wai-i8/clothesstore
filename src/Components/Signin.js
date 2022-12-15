import React, { useEffect, useState } from "react";
import useInput from "../Hook/useInput";
import { authAction } from "../Store/auth-Slice";
import { useDispatch, useSelector } from "react-redux";

const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
const isEmailFormat = (value) => emailRule.test(value);
const isPwdFormat= (value) => value.length >=8 ;


const Signin = (props) => {
    const {
        value: emailValue,
        isValid: emailValueIsValid,
        hasError: emailValueError,
        onChangeValue: onChangeEmail,
        onBlurValue: onBlurEmail,
        reset: resetEmail
    } = useInput(isEmailFormat);

    const {
        value: pwdValue,
        isValid: pwdValueIsValid,
        hasError: pwdValueError,
        onChangeValue: onChangePwd,
        onBlurValue: onBlurPwd,
        reset: resetPwd
    } = useInput(isPwdFormat);

    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        if(isLogin){
            props.close()
        }
    })

    const submitForm = (e) => {
        e.preventDefault();
    
        if (!emailValueIsValid) {
          return;
        }

        console.log(emailValue);

        //
        // Backend Handling
        //
        let body = {"email": emailValue,"pwd": pwdValue};
            
        fetch("http://192.168.88.53:8080/login", {method: "POST", 
        headers: {"content-type": "application/json"},
        body: JSON.stringify(body)})
        .then(res => res.json())
            .then((result) => {
                console.log("result: ", result.token);
                if (result.status === "1"){
                    dispatch(authAction.login({name: result.name, token: result.token}));                 
                }
            }
        )

        //dispatch(authAction.login({email: emailValue, pwd: pwdValue}));

        resetEmail();
        resetPwd();
        setTimeout(()=>{
            setIsError(true);
        }, 100)  
        
    }

    return(
            <div className="signin" onClick={(e) => e.stopPropagation()}>
                <div className="signin_close">
                    <i className="signin_close_icon  fa-solid fa-xmark" onClick={() => props.close()}></i>
                </div>
                <form className="signin_form" onSubmit={submitForm}>
                    {isError && <div className="signin_form_error"><i className="fa-solid fa-circle-exclamation"></i>電郵地址或密碼錯誤</div>}
                    <div className="signin_email">
                        <input placeholder={emailValueError? "請輸入正確的電郵地址" : "電郵地址"}
                            className={emailValueError? "input-error" : ""}
                            onChange={onChangeEmail}
                            onBlur={onBlurEmail}
                            value={emailValue}
                        />
                    </div>
                    <div className="signin_pwd">
                        <input type="password" placeholder={pwdValueError? "請輸入八位或以上的密碼" : "密碼"}
                            className={pwdValueError? "input-error" : ""}
                            onChange={onChangePwd}
                            onBlur={onBlurPwd}
                            value={pwdValue}                  
                        />
                    </div>
                    <div className="signin_form_submit">
                            <button type="submit" disabled={!emailValueIsValid || !pwdValueIsValid }>登入</button>
                    </div>
                </form>
            </div>
    )
}

export default Signin;