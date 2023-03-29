import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './slices/homeSlice'
import alertReducer from './slices/alertSlice'

export default configureStore({
    reducer: {
        home: homeReducer,
        alert: alertReducer,
    }
})