import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import reportsReducer from '../slices/reportSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        reports: reportsReducer.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;