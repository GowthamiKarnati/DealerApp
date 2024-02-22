
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    mobileNumber: '',
    searchValue: '',
    customerKYCData: null, 
    customerData: null,
  },
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCustomerKYCData: (state, action) => { 
      state.customerKYCData = action.payload; 
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
  },
});

export const { setMobileNumber, setSearchValue, setCustomerKYCData,setCustomerData } = authSlice.actions;
export const selectMobileNumber = (state) => state.auth.mobileNumber;
export const selectSearchValue = (state) => state.auth.searchValue;
export const selectCustomerKYCData = (state) => state.auth.customerKYCData; 
export const selectCustomerData = (state) => state.auth.customerData;
export default authSlice.reducer;
