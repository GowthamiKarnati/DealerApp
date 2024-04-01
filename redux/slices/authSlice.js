
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    mobileNumber: '',
    searchValue: '',
    customerKYCData: null, 
    customerData: null,
    fieldToUpdate: null,
    applicationData: null,
    Submitting: false,
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
    setApplicationData: (state, action) => { // Action to set application data
      state.applicationData = action.payload;
    },
    setSubmitting: (state, action) => {
      state.Submitting = action.payload;
    },
  },
});

export const { setMobileNumber, setSearchValue, setCustomerKYCData,setCustomerData,setFieldToUpdate,setApplicationData, setSubmitting,} = authSlice.actions;
export const selectMobileNumber = (state) => state.auth.mobileNumber;
export const selectSearchValue = (state) => state.auth.searchValue;
export const selectCustomerKYCData = (state) => state.auth.customerKYCData; 
export const selectCustomerData = (state) => state.auth.customerData;
export const selectFieldToUpdate = (state) => state.auth.fieldToUpdate;
export const selectApplicationData = (state) => state.auth.applicationData;
export const selectIsSubmitting = (state) => state.auth.Submitting;
export default authSlice.reducer;
