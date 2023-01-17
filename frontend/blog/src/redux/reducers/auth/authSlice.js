import { createSlice } from "@reduxjs/toolkit";

const base_url = "http://localhost:8000"
const initialState = {
    user: null,
    isloggedin: false,
    error: null,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        getUser: (state, {payload}) =>{
            state.isloggedin = true;
            state.user =  {...payload, avatar : base_url.concat(payload.avatar)};
        },
        updateUser: (state,{payload}) =>{
            
            state.user = {...state.user, ...payload}
            
        }
    },
})

export const selectUser = (state) => state.auth.user;
export const isUserLoggedIn = (state) => state.auth.isloggedin;

export const {getUser, updateUser} = authSlice.actions;

export default authSlice.reducer;