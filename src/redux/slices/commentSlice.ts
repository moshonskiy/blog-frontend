import { createAsyncThunk, createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../../api/axios';
import { RootState } from '../store/store';

export interface IComment {
    _id: string;
    text: string;
    fullName: string;
    avatarUrl: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IInitState {
    comments: null | IComment[];
    status: 'idle' | 'loading' | 'rejected' | 'received';
    error: null | string;
}

const initialState: IInitState = {
    comments: null,
    status: 'idle',
    error: null,
};

export const getAllComments = createAsyncThunk(
    'comments/getAllComments',
    async(_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/comments');

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.message);
            }
        }
    }
);

export const getPostComments = createAsyncThunk<IComment[], string>(
    'comments/getPostComments',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/comments/${id}`);

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.message);
            }
        }
    }
);

interface Params {
    text: string;
    postId: string;
    userId: string;
    fullName: string;
    avatarUrl?: string;
}

export const addComment = createAsyncThunk<IComment, Params>(
    'comments/addComment',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/comments', params);

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.message);
            }
        }
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllComments.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllComments.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.status = 'received';
                state.comments = action.payload;
            })
            .addCase(getPostComments.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getPostComments.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.status = 'received';
                state.comments = action.payload;
            })
            .addCase(addComment.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.status = 'received';
                state.comments?.push(action.payload);
            })
    }
});

const selectSelf = (state: RootState) => state;

export const selectComments = createDraftSafeSelector(selectSelf, (state) => state.comments.comments);

export const commentsReducer = commentSlice.reducer;
