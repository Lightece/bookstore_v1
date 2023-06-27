import React, {useEffect, useState} from "react";
import {getCart, buy, updateQuantity, deleteFromCart} from "../services/CartService";
import {Button, InputNumber, Table, Modal, Input, message} from "antd";

const columns=[
    {
        title:'',
        key:'number',
        render(text,record,index){
            return(
                <span>{index+1}</span>
            )
        }
    },
    {
        title: '书籍',
        dataIndex: 'title',
        render: (text, record) => <a href={`/books/${record.book.bookid}`}>{record.book.title}</a>,
    },
    {
        title: '单价',
        dataIndex: 'price',
        render: (text, record) => <p>{`${record.book.price}`}</p>
    },
    {
        title: '数量',
        dataIndex: 'quantity',
        render: (text, record) => (
            <InputNumber
                min={1}
                defaultValue={text}
                onChange={(value) => {
                    record.quantity = value;
                    updateQuantity(record.book.bookid, value);
                }}
            />
        ),
    },
    {
        title: '总价',
        key: 'total',
        render: (text, record) => (
            <span>
                {record.book.price * record.quantity}
            </span>
        ),
    }
];

const CartList = () =>{
    // init
    const [cart, setCart] = React.useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        getCart().then((res)=>{
                setCart(res.data);
            }
        );
    },[]);

    // when change the range selected, change it in the dataset
    const onSelectChange = (newSelectedRowKeys) => {
        console.log(newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const del=()=>{
        for(let i=0;i<selectedRowKeys.length;i++){
            for(let j=0;j<cart.length;j++){
                if(cart[j].itemid === selectedRowKeys[i]){
                    deleteFromCart(cart[j].book.bookid);
                }
            }
        }
        messageApi.info("已从购物车中移除！");
        window.location.reload();
    }


    // Modal logics here
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [receiver, setReceiver] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [confirm, setConfirm] = useState("是否确认购买以下书籍：\n");
    const [items, setItems] = useState([]);
    const showModal = () => {
        let new_items = [];
        for(let i=0;i<selectedRowKeys.length;i++){
            for(let j=0;j<cart.length;j++){
                if(cart[j].itemid === selectedRowKeys[i]){
                    new_items.push(cart[j]);
                }
            }
        }
        setItems(new_items);
        let new_confirm = "是否确认购买以下书籍：\n";
        for(let i=0;i<new_items.length;i++){
            new_confirm+= new_items[i].book.title + "* " + new_items[i].quantity + ", \n";
        }
        setConfirm(new_confirm);
        setOpen(true);
    };
    const handleOk = async() => {
        setConfirmLoading(true);
        return await buyNow();
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
        setItems([]);
        setConfirm("是否确认购买以下书籍：\n");
        setSelectedRowKeys([]);
    };

    // onclick buy button, send the selected books to the backend and refresh the page
    const buyNow= async()=>{
        if(await buy(items, receiver,phone, address)){
            // console.log("buy success");
            window.location.reload();
            messageApi.success("购买成功！");
            setItems([]);
            setConfirm("是否确认购买以下书籍：\n");
            setSelectedRowKeys([]);
        }
        else {
            messageApi.error("购买失败，请重试。");
        }
    };



    return (
        <div className="CartList">
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={showModal} disabled={selectedRowKeys.length<=0}>
                    立刻购买
                </Button>
                <Modal
                    title="确认购买信息"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <div style={{whiteSpace:"pre-line", margin:"10px"}}>{confirm}</div>
                    <Input className="InputSubmit"  placeHolder="请输入收件人..." value={receiver} onChange={(e) => setReceiver(e.target.value)}/>
                    <Input className="InputSubmit" placeHolder="请输入您方便收件的地址..." value={address} onChange={(e) => setAddress(e.target.value)}/>
                    <Input className="InputSubmit" placeHolder="请输入您的联系方式..." value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </Modal>
                <Button onClick={del} disabled={!selectedRowKeys.length>0}>
                    删除
                </Button>
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {selectedRowKeys.length>0 ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={cart}
                rowKey="itemid" />
        </div>
    );
}
export default CartList;









