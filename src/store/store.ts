import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import walletModalReducer from 'components/modal/walletModal/walletModalSlice'
import userReducer from 'pages/homePage/userSlice'

export const store = configureStore({
  reducer: {
    walletModal: walletModalReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
