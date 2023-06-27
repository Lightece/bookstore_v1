import React,{useEffect} from 'react';
import { Card } from 'antd';
import {getBookById} from "../services/BookService";
const { Meta } = Card;


const BookCard =({book})=> {
    // const [book, setBook] = React.useState({});
    // useEffect(() => {
    //     getBookById(bookid).then((res)=>{
    //         setBook(res.data);
    //         }
    //     );
    // },[]);

        return (
            <a href={"/books/" + book.bookid}>
                <Card
                    hoverable
                    style={{
                        width: 250,
                        margin: 25,
                    }}
                    cover={book.cover!=null && book.cover!=""?(<img alt="example" src={book.cover}/>):
                        (<img alt="example" src="http://myimg.lightece.top/bookstore/assets/cover_undefined.png"/>)}
                >
                    <Meta
                        title={book.title}
                        description={"单价: ￥" + book.price}
                    />
                </Card>
            </a>
        );
}
export default BookCard;