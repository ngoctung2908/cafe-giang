import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toNormalNumber from 'utils/toNormalNumber'
import { Contract } from '@ethersproject/contracts'

type Payload = {
  account: string
  pid: number
  contract: Contract
}
export const fetchUserBalance = createAsyncThunk(
  'fetchUserBalance',
  async (data: Payload, thunkAPI) => {
    try {
      const resp = await data.contract.userBuy(data.account, data.pid)
      const balance = toNormalNumber(resp)
      return Number(balance)
    } catch (err) {
      console.log(err)
    }
  }
)

export interface UserBalanceState {
  value: number
}

const initialState: UserBalanceState = {
  value: 0,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserBalance.fulfilled, (state, action) => {
      state.value = action.payload
    })
  },
})

export default userSlice.reducer
