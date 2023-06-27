import React, {useEffect} from 'react';
import '../css/HomeView.css';
import {Breadcrumb, Col, Layout, Row, theme, Carousel, List} from 'antd';
import { getValidBooks} from "../services/BookService";
import BookList from "../components/BookList";
const { Content } = Layout;


const HomeView = () => {
    const {
        token: { colorBgContainer},
    } = theme.useToken();
    const [books, setBooks] = React.useState([]);
    useEffect(() => {
        getValidBooks().then((res)=>{
                setBooks(res.data);
                console.log(res.data);
            }
        );
    },[]);
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
                        title: '书籍列表',
                        href: '/',
                    },
                ]}
            />
            <div
                className="site-layout-content"
                // style={{
                //     background: colorBgContainer,
                // }}
            >
                <Carousel autoplay>
                    <div>
                        <img
                            alt="example"
                            src={require("../assets/discount.png")}
                        />
                    </div>
                    <div>
                        <img
                            alt="example"
                            src={require("../assets/spring.png")}
                        />
                    </div>
                    <div>
                        <img
                            alt="example"
                            src={require("../assets/discount.png")}
                        />
                    </div>
                    <div>
                        <img
                            alt="example"
                            src={require("../assets/spring.png")}
                        />
                    </div>
                </Carousel>
                <BookList/>
            </div>
        </Content>
    );
}

export default HomeView;