import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AdminBooksView from "../views/Admin/AdminBooksView";
import AdminUsersView from "../views/Admin/AdminUsersView";
import AdminOrdersView from "../views/Admin/AdminOrdersView";
import { checkAdmin } from "../services/UserService";
import AdminStatisticsView from "../views/Admin/AdminStatisticView";

const AdminRoute = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkIsAdmin = async () => {
            try {
                const isadmin = await checkAdmin();
                setIsAdmin(isadmin);
                if (!isadmin) {
                    navigate('/login');
                }
            } catch (error) {
                setIsAdmin(false);
                navigate('/');
            }
        };

        checkIsAdmin();
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/admin/books" replace={true} />} />
            <Route path="/books" element={<AdminBooksView />} />
            <Route path="/users" element={<AdminUsersView />} />
            <Route path="/orders" element={<AdminOrdersView />}/>
            <Route path="/statistics" element={<AdminStatisticsView />}/>
        </Routes>
    );
}

export default AdminRoute;
