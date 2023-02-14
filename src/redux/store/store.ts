import { configureStore } from '@reduxjs/toolkit';

import { postReducer } from '../slices/postSlice';
import { authReducer } from '../slices/authSlice';
import { commentsReducer } from '../slices/commentSlice';

const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
        comments: commentsReducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
