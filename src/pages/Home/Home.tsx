import React, { FunctionComponent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Post from '../../components/Post';
import PostSkeleton from '../../components/Post/Skeleton';
import TagsBlock from '../../components/TagsBlock';
import CommentsBlock from '../../components/CommentsBlock';

import { getAllPosts, getLastPostsTags, getAllPostsByPopularity, selectPosts, selectTags } from '../../redux/slices/postSlice';
import { getAllComments, selectComments } from '../../redux/slices/commentSlice';
import { selectUserData } from '../../redux/slices/authSlice';

const Home: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const { items, status } = useAppSelector(selectPosts);
    const userData = useAppSelector(selectUserData);
    const { items: tags, status: tagsStatus } = useAppSelector(selectTags);
    const comments = useAppSelector(selectComments);

    const [selectedTab, setSelectedTab] = useState(0);

    const isLoading = status === 'loading';
    const isTagsLoading = tagsStatus === 'loading';

    const loadingPosts = [...Array(5)].map((_, i) => (
        <PostSkeleton key={i} />
    ));

    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    }

    useEffect(() => {
        if (selectedTab === 0) {
            dispatch(getAllPosts());
        }

        if (selectedTab === 1) {
            dispatch(getAllPostsByPopularity());
        }

        dispatch(getLastPostsTags());
        dispatch(getAllComments());
    }, [dispatch, selectedTab]);

    const desktopGrid = (
    <>
        <Grid xs={12} item>
            {isLoading
            ? loadingPosts : (
            items.map(({ _id, title, imageUrl, text, user, createdAt, viewsCount, commentsCount, tags }) => (
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
                isEditable={userData?._id === user._id}
                />
            ))
            )}
        </Grid>
        <Grid xs={12} item>
            <TagsBlock
                items={tags}
                isLoading={isTagsLoading}
            />
            <CommentsBlock
                comments={comments}
                isLoading={false}
            />
        </Grid>
    </>
    );

    const mobileGrid = (
        <>
            <Grid xs={8} item>
                {isLoading
                ? loadingPosts : (
                items.map(({ _id, title, imageUrl, text, user, createdAt, viewsCount, commentsCount, tags }) => (
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
                        isEditable={userData?._id === user._id}
                    />
                ))
                )}
            </Grid>
            <Grid xs={4} item>
                <TagsBlock
                    items={tags}
                    isLoading={isTagsLoading}
                />

                <CommentsBlock
                    comments={comments}
                    isLoading={false}
                />
            </Grid>
        </>
    );

    return (
        <main>
            {items.length > 0 && !isLoading && (
                <Tabs
                    style={{ marginBottom: 15 }}
                    value={selectedTab}
                    onChange={handleTabChange}
                >
                    <Tab label="New" />
                    <Tab label="Popular" />
                </Tabs>
            )}
            {items.length === 0 && !isLoading && (
                <div>No posts yet</div>
            )}

            <Grid
                container
                spacing={4}
            >
                {matches ? mobileGrid : desktopGrid}
            </Grid>
        </main>
    );
};

export default Home;
