import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import UserInfo from '../UserInfo';
import PostSkeleton from './Skeleton';

import { removePost } from '../../redux/slices/postSlice';
import { useAppDispatch } from '../../redux/hooks/hooks';

import s from './Post.module.scss';

export interface IUser {
    fullName: string;
    _id: string;
    email?: string;
    passwordHash?: string;
    avatarUrl: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface IPost {
    _id: string;
    title: string;
    text: string;
    createdAt: string;
    imageUrl?: string;
    user: IUser;
    viewsCount?: number;
    commentsCount?: number;
    tags: string[];
    children?: React.ReactNode;
    isFullPost?: boolean;
    isLoading?: boolean;
    isEditable?: boolean;
}

const Post: FunctionComponent<IPost> = ({
    _id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    commentsCount,
    tags,
    children,
    isFullPost,
    isLoading,
    isEditable,
}) => {
    const dispatch = useAppDispatch();

    if (isLoading) {
        return <PostSkeleton />;
    }

    const onClickRemove = async () => {
        if (window.confirm('Are you sure you want to delete post?')) {
            dispatch(removePost(_id));
        }
    };

    const handleUrl = (url: string) => {
        if (url.includes('http')) {
            return url;
        }

        return `${process.env.REACT_APP_API_URL}${url}`;
    }

    return (
        <article className={cn(s.root, { [s.rootFull]: isFullPost })}>
            {isEditable && (
                <div className={s.editButtons}>
                    <Link to={`/posts/${_id}/edit`}>
                    <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                    </Link>
                    <IconButton
                        onClick={onClickRemove}
                        color="secondary"
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            {imageUrl && (
                <img
                    className={cn(s.image, { [s.imageFull]: isFullPost })}
                    src={handleUrl(imageUrl)}
                    alt={title}
                />
            )}
            <div className={s.wrapper}>
                <UserInfo
                    additionalText={createdAt}
                    {...user}
                />
                <div className={s.indention}>
                    <h2 className={cn(s.title, { [s.titleFull]: isFullPost })}>
                        {isFullPost
                            ? title
                            : <Link to={`/posts/${_id}`}>{title}</Link>}
                    </h2>
                    <ul className={s.tags}>
                        {tags.map((name) => (
                            <li key={name}>
                            <Link to={`/tags/${name}`}>#{name}</Link>
                            </li>
                        ))}
                    </ul>
                    {children && <div className={s.content}>{children}</div>}
                    <ul className={s.postDetails}>
                        <li>
                            <EyeIcon />
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon />
                            <span>{commentsCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    );
};

export default Post;
