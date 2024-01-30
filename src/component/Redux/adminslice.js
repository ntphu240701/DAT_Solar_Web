import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'admin',
    initialState: {
        usr: '',
        name:'',
        mail:'',
        lang: 'vi',
        type:'user',
        status: false
    },
    reducers: {
      
        setusr: (state, action) => {
            state.usr = action.payload;
        },// type: 'admin/setuser'
        setname: (state, action) => {
            state.name = action.payload;
        },
        setmail: (state, action) => {
            state.mail = action.payload;
        },
        setlang: (state, action) => {
            state.lang = action.payload;
        },// type: 'admin/setuser'
        settype: (state, action) => {
            state.type = action.payload;
        },
        setstatus: (state, action) => {
            state.status = action.payload;
        }
    }
})