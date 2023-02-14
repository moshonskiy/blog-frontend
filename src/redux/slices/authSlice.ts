import { createSlice, createAsyncThunk, createDraftSafeSelector } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '../../api/axios';
import { RootState } from '../store/store';

export interface IData {
    _id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    token: string;
    status: 'idle' | 'loading' | 'rejected' | 'received';
    error: string | null;
}

interface IInitState {
    data: null | IData;
    status: 'idle' | 'loading' | 'rejected' | 'received';
    error: null | string;
}

const initialState: IInitState = {
    data: null,
    status: 'idle',
    error: null,
};

interface Token {
    token: string;
}

export type LoginReturnData = IData & Token;

export const fetchUserData = createAsyncThunk<LoginReturnData, { email: string, password: string }>(
    'auth/fetchUserData',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/login', params);

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.message as string);
            }
        }
    }
);

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchAuthMe',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/auth/me');

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.message);
            }
        }
    }
);

export const registerNewUser = createAsyncThunk<LoginReturnData, { email: string, password: string, fullName: string }>(
    'auth/registerNewUser',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/register', params);

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.message);
            }
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'received';
                state.data = action.payload;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAuthMe.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'received';
                state.data = action.payload;
            })
            .addCase(registerNewUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerNewUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(registerNewUser.fulfilled, (state, action) => {
                state.status = 'received';
                state.data = action.payload;
            })
    }
});

const selectSelf = (state: RootState) => state;

export const selectIsAuth = createDraftSafeSelector(selectSelf, (state) => !!state.auth.data);
export const selectUserData = createDraftSafeSelector(selectSelf, (state) => state.auth.data);
export const selectAuthStatus = createDraftSafeSelector(selectSelf, (state) => state.auth.status);

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
