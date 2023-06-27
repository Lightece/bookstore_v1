import React from 'react';
import {Breadcrumb,  Layout,  theme} from 'antd';
import CartList from "../../components/CartList";
import "../../css/CartView.css";
const { Content } = Layout;
const CartView = () => {
    const {
        token: { colorBgContainer},
    } = theme.useToken();
    return (
        <Content className="content-container">
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
                        title: '购物车',
                        href: '/cart',
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
                <h1 style={{color:"#000"}}>购物车</h1>
                <CartList/>
            </div>
        </Content>
    )
}
export default CartView;