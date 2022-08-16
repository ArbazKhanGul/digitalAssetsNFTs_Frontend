import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: undefined,
}

export const metamaskAddress = createSlice({
  name: 'metamaskAddress',
  initialState,
  reducers: {
    addAddress: (state,action) => {
      state.value =action.payload
    },  
  
  },
})

// Action creators are generated for each case reducer function
export const { addAddress } = metamaskAddress.actions
export const selectAddress=(state) => state.metamaskAddress.value;
export default metamaskAddress.reducer