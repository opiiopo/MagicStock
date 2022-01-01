import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../components/navigation/navigationSlice';

export default configureStore({
    reducer: {
        search: searchReducer
    }
})