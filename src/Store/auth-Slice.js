import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: -1,
    name: "",
    isLogin: false,
    token: ""
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        login(state,actions){
            state.id = actions.payload.id;
            state.name = actions.payload.name;
            state.isLogin = true;
            localStorage.setItem("auth",JSON.stringify(state));
            console.log("state.id: ",state.id);
        },
        logout(state){
            state.id = "";
            state.name = "";
            state.isLogin = false;
            localStorage.setItem("auth",JSON.stringify(state));
        },
        loadLogin(state){
            if(JSON.parse(localStorage.getItem("auth")) !== null){  
                state.id = JSON.parse(localStorage.getItem("auth")).id;
                state.name = JSON.parse(localStorage.getItem("auth")).name;
                state.isLogin = JSON.parse(localStorage.getItem("auth")).isLogin;
            }
        }
    }

})

export const authAction = authSlice.actions;
export default authSlice;