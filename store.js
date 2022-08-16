import { configureStore } from '@reduxjs/toolkit'
import metamaskAddress from "./slice/metamask"
export const store = configureStore({
  reducer: {
    metamaskAddress:metamaskAddress,
  },
})