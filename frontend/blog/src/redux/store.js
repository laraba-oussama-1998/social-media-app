import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './reducers/posts/postsSlice';
import usersReducer from './reducers/users/usersSlice';
import authReducer from './reducers/auth/authSlice';

import storage from 'redux-persist/lib/storage';
import {persistStore,
        persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,} from 'redux-persist';
        
import {combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer
})

const persistConfig = {
    key: 'root',
    storage,
    }


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
})

export const persistor= persistStore(store)
