import React, {useEffect, useState} from 'react';
import '../css/Basic.css';
import {Button, Layout, Menu} from 'antd';
import UserRoute from "../Routers/UserRoute";
import {getUserInfo} from "../services/UserService";

const { Header, Footer } = Layout;

const nav_items = [
    {
        key: 'home',
        label: <a href={"/"}>首页</a>,

    },
    {
        key: "profile",
        label: <a href={"/profile"}>账户</a>,
    },
    {
        key: "cart",
        label: <a href={"/cart"}>购物车</a>,
    },
    {
        key: "order",
        label: <a href={"/orders"}>订单</a>,
    }
];


const BasicView = () => {
    // const [current, setCurrent] = useState('home');
    // const onClick = (e) => {
    //     console.log('click ', e);
    //     setCurrent(e.key);
    // };
    const [user, setUser] = useState(null);
    useEffect(() => {
        const userid = localStorage.getItem("userid");
        const token = localStorage.getItem("token");
        console.log(userid, token);
        console.log(user);
        if(userid === null || token === null){
            setUser(null);
        }
        else getUserInfo(userid, token).then((res)=>{
                setUser(res.data);
            }
        );
    },[]);

    const logout= () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        setUser({});
        window.location.href = "/";
    }

    const gotoProfile = () => {
        window.location.href = "/profile";
    }

    return <Layout className="layout">
        <Header left="0">
            <div className="logo" />
            <div style={{ float: 'right' }}>
                {user==null?(
                    <div>
                        <span style={{ marginRight: 20 }}>当前为游客模式浏览</span>
                        <Button>
                            <a href={"/login"}>登录</a>
                        </Button>
                    </div>
                ):(
                    <div style={{display:"block", alignItems:"center"}}>
                        <div style={{display:"flex"}}>
                            <img src={user.avatar} alt="user" className="smallAvatar" alt="个人中心" style={{ margin:"auto 10px"}} onClick={gotoProfile}/>
                            <span style={{ margin:"auto 10px" }}>{"欢迎您，"+user.nickname+"!"}</span>
                            <Button  size="middle" onClick={logout} style={{margin:"auto 20px"} }>
                                登出
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Menu
                theme="light"
                mode="horizontal"
                float="right"
                items={nav_items}
            />

        </Header>
        <UserRoute/>
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            闲书·阅闲悦自由 ©2023 Created by zyh
        </Footer>
    </Layout>;
};
export default BasicView;