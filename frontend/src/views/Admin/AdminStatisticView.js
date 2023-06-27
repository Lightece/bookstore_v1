import React from "react";
import {useState, useEffect} from "react";
import {theme, Divider, DatePicker, Table, message, Button} from "antd";
import {getBookSales} from "../../services/BookService";
import {getUserBuy} from "../../services/UserService";
import dayjs from "dayjs";
import {getOrderList} from "../../services/OrderService";

const {RangePicker} = DatePicker;

const bookSalesCol = [
    {
        title: '书籍',
        dataIndex: 'title',
        render:(text,record)=>(<a href={`/books/${record.book.bookid}`}>{record.book.title}</a>),
    },
    {
        title: '销量',
        dataIndex: 'sales',
        // sorter: (a, b) => a.sales >b.sales,
    },
];

const userBuyCol = [
    {
        title: '用户ID',
        key: 'userid',
        render: (text, record) => (
            <span>
                {record.user.userid}
            </span>
        ),
    },
    {
        title: '昵称',
        key: 'nickname',
        render: (text, record) => (
            <span>
                {record.user.nickname}
            </span>
        ),
    },
    {
        title: '消费金额',
        dataIndex: 'total',
    }
];


const AdminStatisticView = () => {
    const [bookSalesList, setBookSalesList] = useState([]);
    const [userBuyList, setUserBuyList] = useState([]);

    const [bookDateRange, setBookDateRange] = useState([]);
    const [userDateRange, setUserDateRange] = useState([]);

    useEffect(() => {
        reloadStat();
    },[]);

    const {
        token: { colorBgContainer},
    } = theme.useToken();


    const reloadStat = async() =>{
        try{
            if(userDateRange.length===0){
                const res = await getUserBuy("","");
                console.log(res);
                setUserBuyList(res.data);
            }
            else {
                const res = await getUserBuy(userDateRange[0],userDateRange[1] );
                console.log(res);
                setUserBuyList(res.data);
            }
            if(bookDateRange.length===0){
                const res = await getBookSales("", "");
                console.log(res);
                setBookSalesList(res.data);
            }
            else {
                const res = await getBookSales(bookDateRange[0],bookDateRange[1]);
                console.log(res);
                setBookSalesList(res.data);
            }
        }catch(error){
            console.log("Error fetching order list",error);
            message.error("获取订单列表失败");
        }
    }
    const BookDateChange = (value) => {
        if(value===null) {
            setBookDateRange(["",""]);
        }
        else setBookDateRange(value.map((date) => dayjs(date).format("YYYY-MM-DD")));
    }

    const UserDateChange = (value) => {
        if(value===null) {
            setUserDateRange(["",""]);
        }
        else setUserDateRange(value.map((date) => dayjs(date).format("YYYY-MM-DD")));
    }

    return(
        <div className="content"
             style={{background: colorBgContainer, padding:"30px"}}
        >
            <Divider orientation="left"><h2>书籍热销榜</h2></Divider>
            <div style={{display:"flex"}}>
                <RangePicker onChange={BookDateChange} format="YYYY-MM-DD" style={{margin:"10px"}}/>
                <Button onClick={reloadStat}>筛选</Button>
            </div>


            <Table
                columns={bookSalesCol}
                dataSource={bookSalesList}
            />
            <Divider orientation="left"><h2>用户消费榜</h2></Divider>
            <div style={{display:"flex"}}>
                <RangePicker onChange={UserDateChange} format="YYYY-MM-DD" style={{margin:"10px"}}/>
                <Button onClick={reloadStat}>筛选</Button>
            </div>
            <Table
                columns={userBuyCol}
                dataSource={userBuyList}
            />
        </div>
    );
}

export default AdminStatisticView;