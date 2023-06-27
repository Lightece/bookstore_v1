import React, {useEffect} from 'react';
import {Breadcrumb, Button, Col, Layout, message, Row, theme} from 'antd';
import {getBookById} from "../services/BookService";
import '../css/BookDetail.css';
import {useParams} from "react-router-dom";
import {addToCart} from "../services/CartService";
const { Content } = Layout;



const BookDetailView = () => {
    const {bookid} = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const addCart = async() => {
        if (await(addToCart(bookid,1))){
            messageApi.success("添加成功");
        }
        else{
            messageApi.error("添加失败,请重试!");
        }
    }
    const {
        token: { colorBgContainer},
    } = theme.useToken();
    const [book, setBook] = React.useState({});
    useEffect(() => {
        getBookById(bookid).then((res)=>{
                console.log(res);
                setBook(res.data);
            }
        );
    },[]);
    return (
        <>
            {contextHolder}
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
                        {
                            title: book.title,
                            href: '/' + book.id,
                        }
                    ]}
                />
                <div
                    className="site-layout-content"
                    // style={{
                    //     background: colorBgContainer,
                    // }}
                >
                    <div style={{textShadow:" 2px 2px 4px #555555"}}>
                        <Row align="top">
                            <Col span={5} offset={3}>
                                {book.cover!=null && book.cover!=""?(<img alt="example" src={book.cover} width="200px"/>):
                                (<img alt="example" src="http://myimg.lightece.top/bookstore/assets/cover_undefined.png" width="200px"/>)}
                            </Col>
                            <Col span={8} offset={2} style={{fontSize:"14pt"}}>
                                <h1>{book.title}</h1>
                                <p>作者: {book.author}</p>
                                <p>ISBN: {book.isbn}</p>
                                <p>库存: {book.stock}</p>
                                <h1>￥ {book.price}</h1>
                                <Button type="primary" onClick={addCart}>
                                    加入购物车
                                </Button>
                            </Col>

                        </Row>
                    </div>

                </div>
            </Content>
        </>
    )
}
export default BookDetailView;