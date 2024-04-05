import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "tool",
  initialState: {
    cal: {},
    filterchart: {
      grid: {
        date: {
          productionData: true,
        },
        month: {
          productionData: true,
        },
        year: {
          productionData: true,
        },
        total: {
          productionData: true,
        },
      },
      consumption: {
        date: {
          productionData: true,
          gridData: true,
          consumptionData: true,
        },
        month: {
          productionData: true,
          consumptionData: true,
          dailygridin: true,
          dailygridout: true,
        },
        year: {
          productionData: true,
          consumptionData: true,
          dailygridin: true,
          dailygridout: true,
        },
        total: {
          productionData: true,
          consumptionData: true,
          dailygridin: true,
          dailygridout: true,
        },
      },
      hybrid: {
        date: {
          productionData: true,
          gridData: true,
          consumptionData: true,
          batteryData: true,
        },
        month: {
          productionData: true,
          consumptionData: true,
          dailygridin: true,
          dailygridout: true,
          charge: true,
          discharge: true,
        },
        year: {
          productionData: true,
          consumptionData: true,
          dailygridin: true,
          dailygridout: true,
          charge: true,
          discharge: true,
        },
        total: {
          productionData: true,
          consumptionData: true,
          dailygridin: true,
          dailygridout: true,
          charge: true,
          discharge: true,
        },
      },
    },
  },
  reducers: {
    setcal: (state, action) => {
      state.cal = action.payload;
    }, // type: 'tool/settype'
    setFilterchart: (state, action) => {
      state.filterchart = action.payload;
    },
  },
});
