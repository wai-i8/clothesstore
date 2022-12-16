import React, { useEffect, useState } from "react";
import useInput from "../Hook/useInput";
import Backdrop from "../Components/Backdrop";
import Confirm from "../Components/Confirm";
import { useNavigate } from "react-router-dom";

const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
const isNotEmpty = (value) => value.trim() !== "";
const isEmailFormat = (value) => emailRule.test(value);
const isPwdFormat= (value) => value.length >=8 ;

const Signup = () => {
    const navigate = useNavigate();

    const {
        value: lastNameValue,
        isValid: lastNameValueIsValid,
        hasError: lastNameValueError,
        onChangeValue: onChangeLastName,
        onBlurValue: onBlurLastName,
        reset: resetLastName
      } = useInput(isNotEmpty);
      
    const {
        value: firstNameValue,
        isValid: firstNameValueIsValid,
        hasError: firstNameValueError,
        onChangeValue: onChangeFirstName,
        onBlurValue: onBlurFirstName,
        reset: resetFirstName
      } = useInput(isNotEmpty);
    
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

      const {
        value: confirmPwdValue,
        isValid: confirmPwdValueIsValid,
        hasError: confirmPwdValueError,
        onChangeValue: onChangeConfirmPwd,
        onBlurValue: onBlurConfirmPwd,
        reset: resetConfirmPwd
      } = useInput((value) => value === pwdValue);

    //const lastName = useInput("");
    //const firstName = useInput("");
    //const email = useInput("");
    //const pwd = useInput("");
    //const confirmpwd = useInput("");

    const submitForm = (e) => {
        e.preventDefault();
    
        //if (!emailValueIsValid) {
        //  return;
        //}

      //console.log(emailValue);
        //
        // Backend Handling
        //
        let body = {"lastName":lastNameValue,"firstName":firstNameValue,"email": emailValue,"pwd": pwdValue};

        fetch("http://192.168.88.53:8080/signup", {method: "POST", 
        headers: {"content-type": "application/json"},
        body: JSON.stringify(body)});
        
        resetLastName();
        resetFirstName();
        resetEmail();
        resetPwd();
        resetConfirmPwd();

        setShowConfirm(true);

    }

    const [isEmailDuplicate,setIsEmailDuplicate] = useState(false);
    const [showConfirm,setShowConfirm] = useState(false);
    useEffect(()=>{
        if(emailValueIsValid){
          //console.log("emailValueIsValid");
            fetch("http://192.168.88.53:8080/checkemail?email="+emailValue, {method: "GET"})
            .then(res => {console.log("res: ",res); return res.json()})
            .then((result) => {
                if (result.duplicate === "0"){
                    setIsEmailDuplicate(false);
                }else{
                    setIsEmailDuplicate(true);
                }
                })
        }
    },[emailValue,emailValueIsValid])



    return(
        <div className="signup">
            <div className="signup_title">
                <h1>建立帳號</h1>
            </div>
            <form className="signup_form" onSubmit={submitForm}>
                <div className="signup_form_name">
                    <div className="signup_form_lastname">
                        <input placeholder={lastNameValueError? "請輸入姓氏" : "姓氏"}
                            className={lastNameValueError? "input-error" : ""}
                            onChange={onChangeLastName}
                            onBlur={onBlurLastName}
                            value={lastNameValue}
                        />
                    </div>
                    <div className="signup_form_firstname">
                    <input placeholder={firstNameValueError? "請輸入名字" : "名字"}
                            className={firstNameValueError? "input-error" : ""}
                            onChange={onChangeFirstName}
                            onBlur={onBlurFirstName}
                            value={firstNameValue}
                        />
                    </div>
                </div>
                <div className="signup_form_email">
                    <input placeholder={emailValueError? "請輸入正確的電郵地址" : "電郵地址"}
                        className={emailValueError? "input-error" : ""}
                        onChange={onChangeEmail}
                        onBlur={onBlurEmail}
                        value={emailValue}
                    />
                    {isEmailDuplicate &&
                        <div className="signup_form_email_error"><i className="fa-solid fa-circle-exclamation"></i>
                        電郵地址已被使用
                        </div>}
                </div>
                <div className="signup_form_pwd">
                    <input type="password" placeholder={pwdValueError? "請輸入八位或以上的密碼" : "密碼"}
                        className={pwdValueError? "input-error" : ""}
                        onChange={onChangePwd}
                        onBlur={onBlurPwd}
                        value={pwdValue}                  
                    />
                </div>
                <div className="signup_form_confirmpwd">
                    <input type="password" placeholder={confirmPwdValueError? "兩次輸入的密碼不相同" : "確認密碼"}
                        className={confirmPwdValueError? "input-error" : ""}
                        onChange={onChangeConfirmPwd}
                        onBlur={onBlurConfirmPwd}
                        value={confirmPwdValue}                         
                    />
                </div>
                <div className="signup_form_submit">
                    <button type="submit" disabled={!lastNameValueIsValid || !firstNameValueIsValid || !emailValueIsValid || 
                        !pwdValueIsValid || !confirmPwdValueIsValid || isEmailDuplicate}>註冊</button>
                </div>
            </form>
            {showConfirm &&  
            <Backdrop close={() => {setShowConfirm(false);navigate("/")}} transpanent={0.6}>
                <Confirm close={() => {setShowConfirm(false);navigate("/")}} isOnlyConfirm="true" 
                confirm={() => navigate("/")}>註冊成功 請使用電郵地址登入</Confirm>
            </Backdrop> }
        </div>
    )

}

export default Signup;