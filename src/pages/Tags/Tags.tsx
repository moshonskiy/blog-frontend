import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { getAllPostsByTag, selectPosts } from '../../redux/slices/postSlice';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Post from '../../components/Post';
import { Grid } from '@mui/material';

import s from './Tags.module.scss';

const Tags = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { items } = useAppSelector(selectPosts);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        if (id) {
            dispatch(getAllPostsByTag(id));
        }
    }, [id, dispatch]);

    return (
        <div>
            <div className={s.title}>#{id}</div>
            <Grid container spacing={2}>
                {items.map(({ _id, title, imageUrl, text, user, createdAt, viewsCount, commentsCount, tags }) => (
                    <Grid item xs={matches ? 4 : 12} key={_id}>
                        <Post
                            key={_id}
                            _id={_id}
                            title={title}
                            text={text}
                            imageUrl={imageUrl}
                            user={user}
                            createdAt={createdAt}
                            viewsCount={viewsCount}
                            commentsCount={commentsCount}
                            tags={tags}
                        />
                    </Grid>
                ))}
            </Grid>

        </div>
    );
};

export default Tags;
