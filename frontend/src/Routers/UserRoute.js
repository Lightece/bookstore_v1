import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomeView from "../views/HomeView";
import CartView from "../views/User/CartView";
import ProfileView from "../views/User/ProfileView";
import BookDetailView from "../views/BookDetailView";
import OrderView from "../views/User/OrderView";
import LoginView from '../views/LoginView';
import { checkUserState} from '../services/UserService';
import AdminRoute from "./AdminRoute";

const UserRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        checkUser();
    }, [location]);

    const checkUser = async () => {
        try {
            const loggedIn = await checkUserState();
            setIsLoggedIn(loggedIn);
        } catch (error) {
            setIsLoggedIn(false);
        } finally {
            setIsLoading(false);
        }
    };

    const navigate = (to) => {
        setLocation(to);
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route
                path="/"
                element={<HomeView />}
                onClick={() => navigate("/")}
            />
            <Route
                path="/cart"
                element={
                    isLoggedIn ? (
                        <CartView />
                    ) : (
                        <Navigate to="/login" replace={true} />
                    )
                }
                onClick={() => navigate("/cart")}
            />
            <Route
                path="profile"
                element={
                    isLoggedIn ? (
                        <ProfileView />
                    ) : (
                        <Navigate to="/login" replace={true} />
                    )
                }
                onClick={() => navigate("/profile")}
            />
            <Route
                path="/orders"
                element={
                    isLoggedIn ? (
                        <OrderView />
                    ) : (
                        <Navigate to="/login" replace={true} />
                    )
                }
                onClick={() => navigate("/orders")}
            />
            <Route
                path="/books/:bookid"
                element={<BookDetailView />}
                onClick={() => navigate("/books/:bookid")}
            />
        </Routes>
    );
};

export default UserRoute;
