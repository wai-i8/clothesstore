import React from "react";
import useInput from "../Hook/useInput";

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

      const submitForm = (e) => {
        e.preventDefault();
    
        if (!emailValueIsValid) {
          return;
        }

        console.log(emailValue);

        //
        // Backend Handling
        //

        resetEmail();
        resetPwd();
    }

    return(
            <div className="signin" onClick={(e) => e.stopPropagation()}>
                <div className="signin_close">
                    <i className="signin_close_icon  fa-solid fa-xmark" onClick={() => props.close()}></i>
                </div>
                <form className="signin_form" onSubmit={submitForm}>
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