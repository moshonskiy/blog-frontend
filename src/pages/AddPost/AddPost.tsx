import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import SimpleMDE from 'react-simplemde-editor';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Options } from 'easymde';

import axios from '../../api/axios';

import { useAppSelector } from '../../redux/hooks/hooks';
import { selectIsAuth, selectUserData } from '../../redux/slices/authSlice';
import 'easymde/dist/easymde.min.css';

import s from './AddPost.module.scss';

const AddPost = () => {
    const isAuth = useAppSelector(selectIsAuth);
    const userData = useAppSelector(selectUserData);
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = !!id;

    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState('');
    const [postError, setPostError] = useState(false);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAuth && inputFileRef.current) {
            inputFileRef.current.value = '';
        }

        try {
            if (e.target.files) {
            const formData = new FormData();
            const file = e.target.files[0];

            formData.append('image', file);

            const { data } = await axios.post('/upload', formData);

            setImageUrl(data.url);
            }
        } catch (err) {
            alert('You should be logged in to upload images');
        }

    };

    const openFileUpload = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    }

    const onClickRemoveImage = () => {
        // to reset filelist if you add then delete the same image
        if (inputFileRef.current) {
            inputFileRef.current.value = '';
        }
        setImageUrl('');
    };

    const onChange = useCallback((value: string) => {
        if (postError) {
            setPostError(false);
        }

        setText(value);
    }, [postError]);

    const options: Options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Enter text',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: nanoid(),
            },
        }),
        [],
    );

    useEffect(() => {
        if (inputFileRef.current) {

        }
    }, [inputFileRef]);

    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`)
            .then((res) => {
                const { data } = res;

                setTitle(data.title);
                setText(data.text);
                setTags(data.tags.join(' '));
                setImageUrl(data.imageUrl);
            })
        }
    }, [id]);

    const onSubmit = async () => {
        setPostError(false);

        if (!isAuth || !userData) {
            setPostError(true);

            return;
        }

        try {
            const fields = {
            title,
            text,
            tags,
            imageUrl,
            user: userData._id,
            };
            const { data } = isEditing
            ? await axios.patch(`/posts/${id}`, fields)
            : await axios.post('/posts', fields);

            const _id = isEditing ? id : data._id;

            navigate(`/posts/${_id}`);

        } catch (err) {
            alert(err);
        }
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (postError) {
            setPostError(false);
        }

        setTitle(e.target.value)
    }

    const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (postError) {
            setPostError(false);
        }

        setTags(e.target.value)
    }

    return (
        <Paper style={{ padding: 30 }}>
            <div className={s.imageButtons}>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={openFileUpload}
                >
                    Upload image
                </Button>
                <input
                    hidden
                    ref={inputFileRef}
                    type="file"
                    onChange={handleChangeFile}
                />

                {imageUrl && (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onClickRemoveImage}
                        className={s.delete}
                    >
                        Delete
                    </Button>
                )}
            </div>
            {imageUrl && (
                <div className={s.imageContainer}>
                    <img
                        className={s.image}
                        src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                        alt="Uploaded"
                    />
                </div>
            )}
            <br />
            <br />
            <TextField
                fullWidth
                classes={{ root: s.title }}
                value={title}
                onChange={handleTitle}
                variant="standard"
                placeholder="Post title"
            />
            <TextField
                fullWidth
                classes={{ root: s.tags }}
                value={tags}
                onChange={handleTags}
                variant="standard"
                placeholder="Tags"
            />
            <SimpleMDE
                className={s.editor}
                value={text}
                onChange={onChange}
                options={options}
            />
            <div className={s.buttons}>
                <Button
                    size="large"
                    variant="contained"
                    onClick={onSubmit}
                >
                    {isEditing ? 'Save' : 'Publish'}
                </Button>
                <Link to="/">
                    <Button size="large">Cancel</Button>
                </Link>
            </div>
            {postError && (
                <div className={s.error}>
                    To publish post you should be logged in
                </div>
            )}
        </Paper>
    );
};

export default AddPost;
