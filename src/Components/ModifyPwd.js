import React, { useState } from "react";
import useInput from "../Hook/useInput";
import { authAction } from "../Store/auth-Slice";
import { useDispatch, useSelector } from "react-redux";
import sha256 from 'js-sha256';

const isPwdFormat= (value) => value.length >=8 ;


const ModifyPwd = (props) => {

    const {
        value: oldPwdValue,
        isValid: oldPwdValueIsValid,
        hasError: oldPwdValueError,
        onChangeValue: onChangeOldPwd,
        onBlurValue: onBlurOldPwd,
        reset: resetOldPwd
    } = useInput(isPwdFormat);

    const {
        value: pwdValue,
        isValid: pwdValueIsValid,
        hasError: pwdValueError,
        onChangeValue: onChangePwd,
        onBlurValue: onBlurPwd,
        reset: resetPwd
    } = useInput((value) => value.length >=8 && value !== oldPwdValue);

    const {
        value: confirmPwdValue,
        isValid: confirmPwdValueIsValid,
        hasError: confirmPwdValueError,
        onChangeValue: onChangeConfirmPwd,
        onBlurValue: onBlurConfirmPwd,
        reset: resetConfirmPwd
      } = useInput((value) => value === pwdValue);

    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin);
    const email = useSelector(state => state.auth.email);
    const [isError, setIsError] = useState(false);
    const [oldPwdCorrect, setOldPwdCorrect] = useState(true);
    //useEffect(() => {
    //    if(isLogin){
    //        props.close()
    //    }
    //})

    const submitForm = (e) => {
        e.preventDefault();


      //console.log(emailValue);

        //
        // Backend Handling
        //
        const hashOldPwdValue = sha256(oldPwdValue);
        const hashPwdValue = sha256(pwdValue);
        fetch("http://192.168.88.53:8080/modifypwd?email="+email+"&pwd="+hashOldPwdValue+"&newPwd="+hashPwdValue, {method: "PUT"})
        .then(res => res.json())
            .then((result) => {
              //console.log("result: ", result.token);
                if (result.status === "1"){
                    dispatch(authAction.login({id: result.id, name: result.name, token: result.token}));  
                    props.success();
                }else{
                    setOldPwdCorrect(false);
                }
            }
        )

        //dispatch(authAction.login({email: emailValue, pwd: pwdValue}));

        //resetPwd();
        //setIsError(true); 
        
    }

    //useEffect(()=>{
    //    if(oldPwdValueIsValid){
    //      //console.log("emailValueIsValid");
    //        let body = {"email": email,"pwd": oldPwdValue};
    //       //console.log("body: ", body);
    //        fetch("http://192.168.88.53:8080/login", {method: "POST", 
    //        headers: {"content-type": "application/json"},
    //        body: JSON.stringify(body)})
    //        .then(res => res.json())
    //        .then((result) => {
    //           //console.log("result: ", result);
    //                if (result.status === "1"){
    //                    setOldPwdCorrect(true);  
    //                }else{
    //                    setOldPwdCorrect(false);
    //                }
    //            }
    //        )
    //    }
    //},[oldPwdValue,oldPwdValueIsValid])

    return(
            <div className="modifypwd" onClick={(e) => e.stopPropagation()}>
                <div className="modifypwd_close">
                    <i className="modifypwd_close_icon  fa-solid fa-xmark" onClick={() => props.close()}></i>
                </div>
                <form className="modifypwd_form" onSubmit={submitForm}>
                    {!oldPwdCorrect && <div className="modifypwd_form_error"><i className="fa-solid fa-circle-exclamation"></i>密碼錯誤</div>}
                    <div className="modifypwd_pwd">
                        <input type="password" placeholder={oldPwdValueError? "請輸入八位或以上的密碼" : "請輸入原有密碼"}
                            className={oldPwdValueError? "input-error" : ""}
                            onChange={onChangeOldPwd}
                            onBlur={onBlurOldPwd}
                            value={oldPwdValue}                  
                        />
                    </div>
                    <div className="modifypwd_pwd">
                        <input type="password" placeholder={pwdValueError? "請輸入八位或以上的密碼" : "請輸入新密碼"}
                            className={pwdValueError? "input-error" : ""}
                            onChange={onChangePwd}
                            onBlur={onBlurPwd}
                            value={pwdValue}                  
                        />
                    </div>
                    <div className="modifypwd_pwd">
                        <input type="password" placeholder={confirmPwdValueError? "請輸入八位或以上的密碼" : "請輸入確認密碼"}
                            className={confirmPwdValueError? "input-error" : ""}
                            onChange={onChangeConfirmPwd}
                            onBlur={onBlurConfirmPwd}
                            value={confirmPwdValue}                  
                        />
                    </div>
                    <div className="modifypwd_form_submit">
                            <button type="submit" disabled={!oldPwdValueIsValid || !pwdValueIsValid || !confirmPwdValueIsValid}>修改密碼</button>
                    </div>
                </form>
            </div>
    )
}

export default ModifyPwd;