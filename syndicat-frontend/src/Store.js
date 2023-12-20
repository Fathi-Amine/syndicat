import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice.js"
import {apiSlice} from "./slices/apiSlice.js";
import apartmentDetailsReducer from './slices/apartmentSlice.js'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistConfig from './persistConfig';

const persistedApartmentDetailsReducer = persistReducer(persistConfig, apartmentDetailsReducer);

const store = configureStore({
    reducer:{
        auth: authReducer,
        apartmentDetails: persistedApartmentDetailsReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export const persistor = persistStore(store);
export default store