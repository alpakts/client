import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    singin: (state,action) => {
      return {...state,...action.payload}
    },
    singout: (state) => {
      return null;
    }
  },
})


export const { singin, singout } = UserSlice.actions

export default UserSlice.reducer