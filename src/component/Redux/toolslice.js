import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'tool',
    initialState: {
        cal: {
            bat_1: 0,
            bat_2: 0,
            bat_in_1: 0,
            bat_out_1: 0,
            con_1: 0,
            con_2: 0,
            grid_1: 0,
            grid_in_1: 0,
            grid_in_2: 0,
            grid_out_1: 0,
            grid_out_2: 0,
            pro_1: 0,
            pro_2: 0,
            pro_3: 0,
        },
        month: {
            pro_month: 0,
            con_month: 0,
            grid_in_month: 0,
            grid_out_month: 0,
            bat_in_month: 0,
            bat_out_month: 0,
        },
        year: {
            pro_year: 0,
            con_year: 0,
            grid_in_year: 0,
            grid_out_year: 0,
            bat_in_year: 0,
            bat_out_year: 0,
        },
        total: {
            pro_total: 0,
            con_total: 0,
            grid_in_total: 0,
            grid_out_total: 0,
            bat_in_total: 0,
            bat_out_total: 0,
        }
    },
    reducers: {
        setcal: (state, action) => {
            state.cal = action.payload;
        },// type: 'tool/settype'
        setmonth: (state, action) => {
            state.month = action.payload;
        },
        setyear: (state, action) => {
            state.year = action.payload;
        },
        settotal: (state, action) => {
            state.total = action.payload;
        }
    }
})
