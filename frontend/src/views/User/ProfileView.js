import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, Col, Layout, Row, Table, theme, DatePicker} from 'antd';
import {getUserInfo, getUserBuy} from "../../services/UserService";
import { SettingOutlined} from "@ant-design/icons";
import "../../css/ProfileView.css";
import {getBoughtBooks} from "../../services/BookService";
import dayjs from "dayjs";

const { Content } = Layout;
const{RangePicker}  = DatePicker;

const UserDisplay = () => {
    const [userInfo, setUserInfo] = React.useState({});
    useEffect(() => {
        getUserInfo().then((res)=>{
                setUserInfo(res.data);
            }
        );
    },[]);

    if (userInfo != null){
        return (<Row style={{color:"#000"}}>
            <Col span={6} offset={1}>
                <img src={userInfo.avatar} alt="user" className="avatar"/>
            </Col>
            <Col span={6}>
                <h1>昵称: {userInfo.nickname}</h1>
                <h1>电话: {userInfo.tel}</h1>
            </Col>
            <Col span={8}>
                <h1>邮箱: {userInfo.email}</h1>
                <h1>地址: {userInfo.address}</h1>
            </Col>

        </Row>);
    }
}

const columns = [
    {
        title: '书籍',
        dataIndex: 'title',
        render:(text,record)=>(<a href={`/books/${record.book.bookid}`}>{record.book.title}</a>),
    },
    {
        title: '购买数量',
        dataIndex: 'sales',
    },
    {
        title: '总价',
        dataIndex: 'total',
    }
];
const ProfileView = () => {
    const {
        token: { colorBgContainer},
    } = theme.useToken();

    const [DateRange, setDateRange] = useState(["",""]);
    const[BoughtBooksList, setBoughtBooksList] = useState([]);
    useEffect(() => {
        getBoughtBooks("","").then((res)=>{
                console.log("BoughtBooks",res.data);
                setBoughtBooksList(res.data);
            }
        );
    },[]);

    const DateChange = (value) => {
        if(value===null) {
            setDateRange(["",""]);
        }
        else setDateRange(value.map((date) => dayjs(date).format("YYYY-MM-DD")));
    }

    const onClick = async() => {
        const res = await getBoughtBooks(DateRange[0],DateRange[1] );
        console.log(res);
        setBoughtBooksList(res.data);
    }
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
                        title: 'Home',
                        href: '/',
                    },
                    {
                        title: 'Profile',
                        href: '/profile',
                    },
                ]}
            />
            <div
                className="site-layout-content"
                style={{
                    background: colorBgContainer,
                    color: "#000",
                }}
            >
                <div>
                    <UserDisplay/>
                </div>
                <h1>我的购书情况</h1>
                <div style={{display:"flex"}}>
                    <RangePicker onChange={DateChange} format="YYYY-MM-DD" style={{margin:"10px"}}/>
                    <Button onClick={onClick}>筛选</Button>
                </div>
                <Table
                    dataSource={BoughtBooksList}
                    rowKey={record => record.book.bookid}
                    columns={columns}
                />
            </div>
        </Content>
    );
}
export default ProfileView;