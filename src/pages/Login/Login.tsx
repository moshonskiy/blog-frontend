import React, { FunctionComponent, useState } from "react";
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchUserData, selectIsAuth } from '../../redux/slices/authSlice';

import s from "./Login.module.scss";
import { IconButton } from "@mui/material";

const schema = yup.object({
  email: yup.string().email('Email should be in correct format').required(),
  password: yup.string().required(),
});

type FormData = yup.InferType<typeof schema>;

const Login: FunctionComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const isAuth = useAppSelector(selectIsAuth);
    const [loginError, setLoginError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();

    const onSubmit = async (values: FormData) => {
        setLoginError(false);
        // const { payload, meta } = await dispatch(fetchUserData(values));

        dispatch(fetchUserData(values))
            .unwrap()
            .then((res) => {
                window.localStorage.setItem('token', res.token);
            })
            .catch((err) => {
                setLoginError(true);
            })

        // if (meta.requestStatus === 'rejected') {
        //     setLoginError(true);
        //     return;
        // }

        // const data = payload as unknown as LoginReturnData;

        // if (data.token) {
        //     window.localStorage.setItem('token', data.token);
        // }
    }

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
    <Paper classes={{ root: s.root }}>
        <Typography classes={{ root: s.title }} variant="h5">
            Log in to account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={s.field}>
                <TextField
                    fullWidth
                    {...register('email', { required: 'Email should be in correct format' })}
                    error={!!errors.email}

                    label="Email"
                    helperText={errors.email?.message}
                />
            </div>
            <div className={s.field}>
                <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={s.field}
                    error={!!errors.password}
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
                    label="Password"
                    helperText={errors.password?.message}
                />
            </div>
            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={!isValid}
            >
                Login
            </Button>
        </form>
        {loginError && (
            <div className={s.error}>Incorrect email or password</div>
        )}
    </Paper>
    );
};

export default Login;
