import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  userLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.userLoading = false;
    }
  },
})

export const { setUser, setUserLoading, clearUser } = userSlice.actions

export default userSlice.reducer
