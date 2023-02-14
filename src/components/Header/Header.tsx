import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { selectIsAuth, logout, selectAuthStatus } from '../../redux/slices/authSlice';

import s from './Header.module.scss';

const Header = () => {
    const isAuth = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectAuthStatus);

    const onClickLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };

  return (
    <header className={s.root}>
        <Container maxWidth="lg">
            <div className={s.inner}>
                <Link to="/" className={s.logo}>
                    <div>BLOG</div>
                </Link>
                <div className={s.buttons}>
                    <Link to="/add-post">
                        <Button variant="contained">Create post</Button>
                    </Link>
                    {isAuth && status === 'received' && (
                        <Button onClick={onClickLogout} variant="contained" color="error">
                            Log out
                        </Button>
                    )}
                    {!isAuth && status !== 'loading' && (
                        <>
                            <Link to="/login">
                                <Button variant="outlined">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="contained">Create account</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </Container>
    </header>
  );
};

export default Header;
