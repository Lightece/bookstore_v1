import React, {useState} from 'react';
import {Button, Layout, Menu} from 'antd';
import BasicRouter from "./Routers/BasicRouter";
import AdminOrdersView from "./views/Admin/AdminOrdersView";
const App = () => {
    return <BasicRouter/>;
    // return <AdminOrdersView/>;
};
export default App;