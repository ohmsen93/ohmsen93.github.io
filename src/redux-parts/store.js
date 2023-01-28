import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import translationReducer from './translationSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        translation: translationReducer
    },
    

})