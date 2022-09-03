import { configureStore } from '@reduxjs/toolkit'
import metamaskAddress from "./slice/metamask"
import user from "./slice/user"
export const store = configureStore({
  reducer: {
    metamaskAddress:metamaskAddress,
    user:user
  },
})