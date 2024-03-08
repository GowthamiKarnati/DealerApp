
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    mobileNumber: '',
    searchValue: '',
    customerKYCData: null, 
    customerData: null,
    fieldToUpdate: null,
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
    setFieldToUpdate: (state, action) => {
      state.fieldToUpdate = action.payload;
    },
  },
});

export const { setMobileNumber, setSearchValue, setCustomerKYCData,setCustomerData,setFieldToUpdate } = authSlice.actions;
export const selectMobileNumber = (state) => state.auth.mobileNumber;
export const selectSearchValue = (state) => state.auth.searchValue;
export const selectCustomerKYCData = (state) => state.auth.customerKYCData; 
export const selectCustomerData = (state) => state.auth.customerData;
export const selectFieldToUpdate = (state) => state.auth.fieldToUpdate;
export default authSlice.reducer;
