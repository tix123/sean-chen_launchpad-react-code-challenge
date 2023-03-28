import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './slices/homeSlice'

export default configureStore({
    reducer: {
        home: homeReducer
    }
})