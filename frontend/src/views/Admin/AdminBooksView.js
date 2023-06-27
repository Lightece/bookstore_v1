import React, { useState, useEffect } from "react";
import {Table, Button, Modal, Form, Input, InputNumber, message, theme, Select} from "antd";
import {getBookList, updateBook, addBook, deleteBook, setBookStatus, getValidBooks} from "../../services/BookService";
import {SearchOutlined} from "@ant-design/icons";

const AdminBooksView = () => {
    const [bookList, setBookList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [keyword, setKeyword] = useState("");

    const [form] = Form.useForm();

    const fetchBookList = async () => {
        try {
            const res = await getBookList();
            const data = res.data;
            console.log(res);
            setBookList(data);
        } catch (error) {
            console.log("Error fetching book list:", error);
        }
    };


    useEffect(() => {
        fetchBookList().then(() => {});
    }, []);

    const showAddModal = () => {
        form.resetFields();
        setSelectedBook(null);
        setIsModalVisible(true);
    };

    const showEditModal = (book) => {
        form.setFieldsValue(book);
        setSelectedBook(book);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedBook(null);
    };

    const handleSave = async (values) => {
        try {
            // 将 price 转换为两位小数
            const formattedPrice = Number(values.price).toFixed(2);

            if (selectedBook) {
                const userid = localStorage.getItem("userid");
                const token = localStorage.getItem("token");
                await updateBook({ ...selectedBook, ...values, price: formattedPrice }, userid, token);
                message.success("Book updated successfully");
                setSelectedBook(null);
            } else {
                const userid = localStorage.getItem("userid");
                const token = localStorage.getItem("token");
                await addBook({ ...values, price: formattedPrice }, userid, token);
                message.success("Book added successfully");
            }
            setIsModalVisible(false);

            fetchBookList().then(() => {});
        } catch (error) {
            console.log("Error saving book:", error);
            message.error("Failed to save book");
        }
    };


    const handleStatus = async (book,status) => {
        try {
            const userid = localStorage.getItem("userid");
            const token = localStorage.getItem("token");
            await setBookStatus(book.bookid, userid, token, status);
            if(status)message.success("已下架！")
            else message.success("已上架！");
            fetchBookList();
        } catch (error) {
            console.log("Error cahnging book status:", error);
            message.error("出错啦，请重试");
        }
    };

    const {
        token: { colorBgContainer},
    } = theme.useToken();

    const columns = [
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "作者",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "ISBN",
            dataIndex: "isbn",
            key: "isbn",
        },
        {
            title: "价格",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "库存",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title:"状态",
            key:"status",
            render: (status,book) => (
                <div style={{minWidth:"40px"}}>{book.status===0?("在售"):("下架")}</div>
            ),
        },
        {
            title: "操作",
            key: "actions",
            render: (_, book) => (
                <div style={{display:"flex"}}>
          <Button type="link" onClick={() => showEditModal(book)} style={{margin:"0"}}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleStatus(book,0)} style={{margin:"0"}}>
            上架
          </Button>
          <Button type="link" danger onClick={() => handleStatus(book,1)} style={{margin:"0"}}>
            下架
          </Button>
        </div>
            ),
        },
    ];

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const onSearch = async () => {
        // console.log(keyword);
        getBookList(keyword).then((res) => {
            setBookList(res.data);
        });
    };

    return (
        <div className="content"
             style={{background: colorBgContainer, padding:"30px"}}
        >
            <h1>管理书籍</h1>
            <div style={{display:"flex", margin:"10px auto"}}>
                <Input placeholder="搜索书名"
                       onChange={handleChange}
                       className="mySearch"
                       style={{margin:"6px 0", width:"600px", borderRadius:"10px 0 0 10px", padding:"0 10px",height:"40px"}}
                       allowClear
                />
                <Button onClick={onSearch} type="primary" style={{margin:"6px 0", padding:"10px", borderRadius:"0 10px 10px 0",height:"40px"}}><SearchOutlined/></Button>
            </div>
            <Button type="primary" onClick={showAddModal}>
                Add Book
            </Button>
            <Table dataSource={bookList} columns={columns} rowKey="bookid" />
            <Modal
                title={selectedBook ? "编辑书籍信息" : "新增书籍"}
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={form.submit}
            >
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    {selectedBook?(<img src={(selectedBook && selectedBook.cover && selectedBook.cover!=="")? (selectedBook.cover):("http://myimg.lightece.top/bookstore/assets/cover_undefined.png") }
                         alt={selectedBook? (selectedBook.title):("undefined")}
                         style={{margin:"0 auto"}} />):(<></>)}
                </div>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item
                        name="title"
                        label="标题"
                        rules={[{ required: true, message: "Please enter the book title" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="author"
                        label="作者"
                        rules={[{ required: true, message: "Please enter the book author" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="isbn"
                        label="ISBN"
                        rules={[{ required: true, message: "Please enter the book ISBN" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="价格"
                        rules={[{ required: true, message: "Please enter the book price" }]}
                    >
                        <InputNumber step="0.01"/>
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="库存"
                        rules={[{ required: true, message: "Please enter the book stock" }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="cover"
                        label="书籍封面url"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminBooksView;
