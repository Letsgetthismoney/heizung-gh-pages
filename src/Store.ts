import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {appSlice} from "./state";




const store = configureStore(
    {
        reducer: {
            AppState: appSlice.reducer,
        }
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store

// Use throughout your app instead of plain `useDispatch` and `useSelector`!!
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;