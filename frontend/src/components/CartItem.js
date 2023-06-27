// card from antd
// include books cover, price, time to be ordered, and a button to delete
import {Card, Col, Row, Checkbox, InputNumber} from 'antd';
import '../css/OrderCard.css';

const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};
const CartItem = ({bookid}) => (

        <Card
            hoverable
            style={{
                width: 1080,
                margin: 10,
            }}
        >
            <Row justify="space-around" align="middle">
                <Col span="5" offset="1">
                    <img
                        alt=""
                        src={"http://myimg.lightece.top/bookstore/assets/book"+toString(book.id)+".jpg"}
                        width={100}
                    />
                </Col>
                <Col span="5" offset="1">
                    <h2>{book.title}</h2>
                    <p>description</p>
                </Col>
                <Col span="4" offset="1">
                    <InputNumber min={1} max={10} defaultValue={3} />
                </Col>
                <Col span="4" offset="1">
                    <h1>￥{book.price}</h1>
                </Col>
                <Col span="1" offset="1">
                    <Checkbox onChange={onChange}></Checkbox>
                </Col>
                <Col span="2"></Col>
            </Row>
        </Card>
);
export default CartItem;