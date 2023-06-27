import React, {useEffect, useState} from 'react'
import {Button, Input, Table, DatePicker,} from 'antd';
import {getOrderList} from "../services/OrderService";
import {SearchOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const columns = [
    {
        title: '订单号',
        dataIndex: 'orderid',
    },
    {
        title: '收件人',
        dataIndex: 'receiver',
    },
    {
        title: '地址',
        dataIndex: 'address',
    },
    {
        title: '订单日期',
        dataIndex: 'orderdate',
        sorter: (a, b) => a.orderDate>b.orderDate,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: '订单状态',
        dataIndex: 'orderstate',
    },
    {
        title: '总价',
        dataIndex: 'total',
    },

];

const subcolumns = [
    {
        title: '书籍',
        dataIndex: 'title',
        render:(text,record)=>(<a href={`/books/${record.book.bookid}`}>{record.book.title}</a>),
    },
    {
        title: '单价',
        dataIndex: 'price',
        render:(text,record)=>(<span>￥{record.book.price.toFixed(2)}</span>),
    },
    {
        title: '数量',
        dataIndex: 'quantity',
    },
    {
        title: '小计',
        key: 'subtotal',
        render: (text, record) => (
            <span>
                {(record.book.price * record.quantity).toFixed(2)}
            </span>
        ),
    },
];

const OrderList= () => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [dateRange, setDateRange] = useState([]);
    useEffect(() => {
        getOrderList(false,"", "","" ).then((res)=>{
                console.log(res);
                setOrderList(res.data);
            }
        );
    },[]);
    const handleRowExpand = (expanded, record) => {
        setExpandedRows(prevState => {
            if (expanded) {
                return [...prevState, record.orderid];
            } else {
                return prevState.filter(rowid => rowid !== record.orderid);
            }
        });
    };

    const onSearch = async () => {
        if(dateRange.length === 0){
            getOrderList(false, keyword, "", "").then((res) => {
                setOrderList(res.data);
            });
        }
        getOrderList(false, keyword, dateRange[0],dateRange[1]).then((res) => {
            setOrderList(res.data);
        });
    };
    const onDateChange = (value) => {
        if(value===null) {
            setDateRange([]);
        }
        else setDateRange(value.map((date) => dayjs(date).format("YYYY-MM-DD")));
    }

    const handleChange = (e) => {
        setKeyword(e.target.value);
        // console.log(keyword);
    };

    return (
        <div>
            <div style={{display:"flex", margin:"10px auto"}}>
                <Input placeholder="搜索书名"
                       onChange={handleChange}
                       className="mySearch"
                       style={{margin:"6px 0", width:"400px", borderRadius:"10px 0 0 10px", padding:"0 10px",height:"40px"}}
                       allowClear
                />
                <Button onClick={onSearch} type="primary" style={{margin:"6px 20px 6px 0px ", padding:"10px", borderRadius:"0 10px 10px 0",height:"40px"}}><SearchOutlined/></Button>
                <RangePicker onChange={onDateChange} format="YYYY-MM-DD" style={{margin:"6px"}}/>
            </div>

            <Table
                dataSource={orderList}
                columns={columns}
                rowKey="orderid"
                expandable={{
                    expandedRowRender:(record)=>(
                        <Table
                            dataSource={record.items}
                            columns={subcolumns}
                            pagination={false}
                        />
                    ),
                    rowExpandable:()=>true,
                    expandedRowKeys:expandedRows,
                    onExpand: handleRowExpand,
                }}
            />
        </div>



    );
}

export default OrderList;
