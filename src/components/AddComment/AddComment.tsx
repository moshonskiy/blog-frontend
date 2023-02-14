import React, { FunctionComponent, useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addComment } from "../../redux/slices/commentSlice";
import { selectIsAuth, selectUserData } from '../../redux/slices/authSlice';

import s from "./AddComment.module.scss";

const schema = yup.object().shape({
  text: yup.string().required(),
});

type FormData = yup.InferType<typeof schema>;

const AddComment: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const userData = useAppSelector(selectUserData);
    const isAuth = useAppSelector(selectIsAuth);
    const [commentError, setCommentError] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            text: '',
        },
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    const onSubmit = async (values: FormData) => {
        setCommentError(false);

        if (!isAuth) {
            setCommentError(true);
            return;
        }

        if (id && userData) {
            const params = {
                ...values,
                postId: id,
                userId: userData._id,
                fullName: userData.fullName,
                avatarUrl: userData?.avatarUrl || '',
            };

            dispatch(addComment(params));
            reset();
        }
    }

    const handleError = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAuth && commentError) {
            setCommentError(false);
        }
    }

    return (
    <>
        <div className={s.root}>
            <Avatar
                classes={{ root: s.avatar }}
                src={userData?.avatarUrl || '/noavatar.png'}
            />
            <div className={s.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        multiline
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        {...register('text')}
                        onChange={handleError}
                        error={!!errors.text}
                        helperText={errors.text?.message}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Add comment
                    </Button>
                </form>
                {commentError && (
                    <div className={s.error}>
                        To leave comments you should log in first
                    </div>
                )}

            </div>
        </div>
    </>
    );
};

export default AddComment;
