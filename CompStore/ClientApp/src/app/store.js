import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '../features/currentUserSlice'
import cartSliceReducer from '../features/cartSlice'

export default configureStore({
    reducer: {
        currentUser: currentUserReducer,
        cart : cartSliceReducer
    },
})