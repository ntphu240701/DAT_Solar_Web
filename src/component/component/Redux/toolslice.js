import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name:'tool',
    initialState:{
        type: 'default',
        status: false,
    },
    reducers:{
        settype: (state,action) =>{
                state.type = action.payload;
        },// type: 'tool/settype'
        setstatus: (state,action) =>{
                state.status =  action.payload;
        }
    }
})
