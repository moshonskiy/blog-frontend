import { createSlice, createAsyncThunk, createDraftSafeSelector } from '@reduxjs/toolkit';

import { IPost } from '../../components/Post/Post';
import axios from '../../api/axios';
import { AxiosError } from 'axios';
import { RootState } from '../store/store';

interface IPosts {
    items: IPost[];
    status: 'idle' | 'loading' | 'received' | 'rejected';
    error: null | string;
}

interface ITags {
    items: string[];
    status: 'idle' | 'loading' | 'received' | 'rejected';
    error: null | string;
}

interface IInitState {
    posts: IPosts,
    tags: ITags;
}

const initialState: IInitState = {
    posts: {
        items: [],
        status: 'idle',
        error: null,
    },
    tags: {
        items: [],
        status: 'idle',
        error: null,
    },
};

export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await axios.get('/posts');

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return  rejectWithValue(err.message);
            }
        }

    }
);

export const getAllPostsByPopularity = createAsyncThunk(
    'posts/getAllPostsByPopularity',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await axios.get('/posts/popular');

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return  rejectWithValue(err.message);
            }
        }

    }
);

export const getLastPostsTags = createAsyncThunk(
    'posts/getLastPostsTags',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/tags');

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return  rejectWithValue(err.message);
            }
        }

    }
);

export const removePost = createAsyncThunk<string, string>(
    'posts/removePost',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/posts/${id}`);

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.message);
            }
        }
    }
);

export const getAllPostsByTag = createAsyncThunk<IPost[], string>(
    'posts/getAllPostsByTag',
    async (id, { rejectWithValue }) => {
        try {
            const {data} = await axios.get(`/tags/${id}`);

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return  rejectWithValue(err.message);
            }
        }

    }
);

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.posts.status = 'loading';
                state.posts.error = null;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.posts.status = 'rejected';
                state.posts.error = action.payload as string;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.posts.status = 'received';
                state.posts.items = action.payload;
            })
            .addCase(getAllPostsByPopularity.pending, (state) => {
                state.posts.status = 'loading';
                state.posts.error = null;
            })
            .addCase(getAllPostsByPopularity.rejected, (state, action) => {
                state.posts.status = 'rejected';
                state.posts.error = action.payload as string;
            })
            .addCase(getAllPostsByPopularity.fulfilled, (state, action) => {
                state.posts.status = 'received';
                state.posts.items = action.payload;
            })
            .addCase(getAllPostsByTag.pending, (state) => {
                state.posts.status = 'loading';
                state.posts.error = null;
            })
            .addCase(getAllPostsByTag.rejected, (state, action) => {
                state.posts.status = 'rejected';
                state.posts.error = action.payload as string;
            })
            .addCase(getAllPostsByTag.fulfilled, (state, action) => {
                state.posts.status = 'received';
                state.posts.items = action.payload;
            })
            .addCase(getLastPostsTags.pending, (state) => {
                state.tags.status = 'loading';
                state.tags.error = null;
            })
            .addCase(getLastPostsTags.rejected, (state, action) => {
                state.tags.status = 'rejected';
                state.tags.error = action.payload as string;
            })
            .addCase(getLastPostsTags.fulfilled, (state, action) => {
                state.tags.status = 'received';
                state.tags.items = action.payload;
            })
            .addCase(removePost.pending, (state, action) => {
                const id = action.meta.arg;
                state.posts.items = state.posts.items.filter((post) => post._id !== id);
            })
    }
});

const selectSelf = (state: RootState) => state;

export const selectPosts = createDraftSafeSelector(selectSelf, (state) => state.posts.posts);
export const selectTags = createDraftSafeSelector(selectSelf, (state) => state.posts.tags);

export const postReducer = postSlice.reducer;
