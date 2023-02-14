import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from "@mui/material/Container";

import Header from "./components/Header";
import Home from "./pages/Home";
import FullPost from "./pages/FullPost";
import Registration from "./pages/Registration";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import Tags from "./pages/Tags";
import { useAppDispatch } from './redux/hooks/hooks';
import { fetchAuthMe } from './redux/slices/authSlice';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Registration />} />
                    <Route path='/posts/:id' element={<FullPost />} />
                    <Route path='/add-post' element={<AddPost />} />
                    <Route path='/posts/:id/edit' element={<AddPost />} />
                    <Route path='/tags/:id' element={<Tags />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
