import { BookOutlined, ShoppingOutlined, UserOutlined, PieChartOutlined } from '@ant-design/icons';
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';
import React, { useState } from 'react';
import AdminRoute from "../../Routers/AdminRoute";
import AdminBooksView from "./AdminBooksView";
import "../../css/AdminView.css";

const { Header, Content, Footer, Sider } = Layout;

const nav_items = [
    {
        key: 'books',
        label: <a href="/admin/books"><BookOutlined />书籍管理</a>
    },
    {
        key: 'users',
        label: <a href="/admin/users"><UserOutlined />用户管理</a>
    },
    {
        key: 'orders',
        label: <a href="/admin/orders"><ShoppingOutlined />订单管理</a>
    },
    {
        key: 'statistics',
        label: <a href="/admin/statistics"><PieChartOutlined />统计数据</a>
    }
];

const AdminView = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const logout= () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        window.location.href = "/";
    }

    return (
        <Layout style={{ minHeight: '100vh', minWidth:"800px" }} hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    zIndex: 2, // Ensure the Sider is positioned above other elements
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" items={nav_items} style={{marginTop:"20px"}}/>
            </Sider>

            <Layout className="site-layout-content" style={{marginRight:"0", marginLeft:"200px"}}>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        zIndex: 1, // Ensure the Header is positioned above other elements
                    }}
                >
                    <div className="logo" />
                    <div style={{ float: 'right' }}>
                            <div style={{display:"block", alignItems:"center"}}>
                                <div style={{display:"flex"}}>
                                    <span style={{ margin:"auto 10px" }}>{"欢迎您，管理员！"}</span>
                                    <Button  size="middle" onClick={logout} style={{margin:"auto 20px"} }>
                                        登出
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                </Header>

                <Content
                    style={{
                        margin: '24px auto',
                        minWidth:"90%",
                        overflow: 'initial',
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    <AdminRoute />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    闲书·阅闲悦自由 ©2023 Created by zyh
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminView;
