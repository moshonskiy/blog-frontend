import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactMarkdown  from 'react-markdown';

import axios from '../../api/axios';
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getPostComments, selectComments } from "../../redux/slices/commentSlice";
import Post from "../../components/Post";
import AddComment from "../../components/AddComment";
import CommentsBlock from "../../components/CommentsBlock";
import { IPost } from "../../components/Post/Post";

const FullPost = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [post, setPost] = useState<IPost | null>(null);
    const comments = useAppSelector(selectComments);

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => setPost(res.data))

        if (id) {
            dispatch(getPostComments(id));
        }
    }, [id, dispatch]);

    if (!post) {
        return null;
    }

    const {
        _id,
        title,
        text,
        imageUrl,
        user,
        createdAt,
        viewsCount,
        commentsCount,
        tags,
        isFullPost
    } = post;

    return (
    <>
        <Post
            _id={_id}
            title={title}
            text={text}
            imageUrl={imageUrl}
            user={user}
            createdAt={createdAt}
            viewsCount={viewsCount}
            commentsCount={commentsCount}
            tags={tags}
            isFullPost={isFullPost}
        >
            <ReactMarkdown children={text} />
        </Post>
        {comments && comments.length > 0 && (
            <CommentsBlock
                comments={comments}
                isLoading={false}
            />
        )}
        <AddComment />
    </>
    );
};

export default FullPost;
