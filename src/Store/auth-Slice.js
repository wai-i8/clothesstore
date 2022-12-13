import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    isLogin: false,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        login(state,actions){
            if(actions.payload.email === "likes_168@yahoo.com.hk" && actions.payload.pwd === "Likes168"){
                state.name = "蚊蚊";
                state.isLogin = true;
                localStorage.setItem("auth",JSON.stringify(state));
            }
        },
        logout(state){
            state.name = "";
            state.isLogin = false;
            localStorage.setItem("auth",JSON.stringify(state));
        },
        loadLogin(state){
            state.name = JSON.parse(localStorage.getItem("auth")).name;
            state.isLogin = JSON.parse(localStorage.getItem("auth")).isLogin;
        }
    }

})

export const authAction = authSlice.actions;
export default authSlice;