import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { registerNewUser, selectIsAuth } from '../../redux/slices/authSlice';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import s from './Registration.module.scss';

const schema = yup.object({
    fullName: yup.string().required(),
    email: yup.string().email('Email should be in correct format').required(),
    password: yup.string().required().min(5, 'Password should be 5 characters min'),
    avatarUrl: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

const Registration = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            avatarUrl: '',
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    })

    const onSubmit = async (values: FormData) => {
        setRegisterError(false);

        dispatch(registerNewUser(values))
            .unwrap()
            .catch((err) => {
                setRegisterError(true);
            });
    }

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Paper classes={{ root: s.root }}>
            <Typography classes={{ root: s.title }} variant="h5">
                Create account
            </Typography>
            <div className={s.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.field}>
                    <TextField
                        label="Full name"
                        {...register('fullName')}
                        fullWidth
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        onChange={() => {
                            if (registerError) {
                                setRegisterError(false);
                            }
                        }}
                    />
                </div>
                <div className={s.field}>
                    <TextField
                        label="Email"
                        fullWidth
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        onChange={() => {
                            if (registerError) {
                                setRegisterError(false);
                            }
                        }}
                    />
                </div>
                <div className={s.field}>
                    <TextField
                        label="Password"
                        fullWidth
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={() => {}}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>),
                        }}
                        onChange={() => {
                            if (registerError) {
                                setRegisterError(false);
                            }
                        }}
                    />
                </div>
                <div className={s.field}>
                    <TextField
                        label="Avatar url"
                        fullWidth
                        {...register('avatarUrl')}
                        error={!!errors.avatarUrl}
                        helperText={errors.avatarUrl?.message}
                        onChange={() => {
                            if (registerError) {
                                setRegisterError(false);
                            }
                        }}
                    />
                </div>
                <Button
                    fullWidth
                    disabled={!isValid}
                    size="large"
                    variant="contained"
                    type="submit"
                >
                    Register
                </Button>
            </form>
            {registerError && (
                <div className={s.error}>Please type in valid url</div>
            )}
        </Paper>
    );
};

export default Registration;
