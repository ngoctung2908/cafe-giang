import { createSlice } from '@reduxjs/toolkit'

export interface OpenWalletModalState {
  open: boolean
}

const initialState: OpenWalletModalState = {
  open: false,
}

export const walletModalSlice = createSlice({
  name: 'walletModal',
  initialState,
  reducers: {
    open: (state) => {
      state.open = true
    },
    close: (state) => {
      state.open = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { open, close } = walletModalSlice.actions

export default walletModalSlice.reducer
