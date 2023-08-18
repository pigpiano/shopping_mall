// eslint-disable-next-line no-unused-vars
import { combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
// eslint-disable-next-line no-unused-vars
import { persistReducer, persistStore} from 'redux-persist';
// eslint-disable-next-line no-unused-vars
import storage from 'redux-persist/lib/storage';

import {
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';


export const rootReducer = combineReducers({
    user: userReducer

})

// eslint-disable-next-line no-unused-vars
const persistConfig = {
    key: "root", // key 이름
    storage, // loacalStorage에 저장합니다.
};

// eslint-disable-next-line no-unused-vars
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore ({
    reducer: persistedReducer, 
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
             serializableCheck: {
                // eslint-disable-next-line no-undef
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
             },
            }),
})

export const persistor = persistStore(store);

