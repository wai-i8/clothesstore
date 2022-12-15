import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    isLogin: false,
    token: ""
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        login(state,actions){
            state.name = actions.payload.name;
            state.name = actions.payload.name;
            state.isLogin = true;
            localStorage.setItem("auth",JSON.stringify(state));
        },
        logout(state){
            state.name = "";
            state.isLogin = false;
            localStorage.setItem("auth",JSON.stringify(state));
        },
        loadLogin(state){
            if(JSON.parse(localStorage.getItem("auth")) !== null){  
                state.name = JSON.parse(localStorage.getItem("auth")).name;
                state.isLogin = JSON.parse(localStorage.getItem("auth")).isLogin;
            }
        }
    }

})

export const authAction = authSlice.actions;
export default authSlice;