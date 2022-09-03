import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: undefined,
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state,action) => {
      state.value =action.payload
    },  
  
  },
})

// Action creators are generated for each case reducer function
export const { addUser } = user.actions
export const selectUser=(state) => state.user.value;
export default user.reducer