import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name:'tool',
    initialState:{
        cal: {},
    },
    reducers:{
        setcal: (state,action) =>{
                state.cal = action.payload;
        },// type: 'tool/settype'
      
    }
})
