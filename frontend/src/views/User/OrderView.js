import React from 'react';
import {Breadcrumb,  Layout,  theme} from 'antd';
import OrderList from "../../components/OrderList";
import "../../css/CartView.css";
const { Content } = Layout;
const OrderView = () => {
    const {
        token: { colorBgContainer},
    } = theme.useToken();
    return (
        <Content
            style={{
                padding: '0 50px',
            }}
        >
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
                items={[
                    {
                        title: '首页',
                        href: '/',
                    },
                    {
                        title: '订单',
                        href: '/orders',
                    },
                ]}
            />
            <div
                className="site-layout-content"
                style={{
                    background: colorBgContainer,
                    padding: 50,
                    width: 1200,
                }}
            >
                <h1>我的订单</h1>
                <OrderList/>
            </div>
        </Content>
    )
}
export default OrderView;