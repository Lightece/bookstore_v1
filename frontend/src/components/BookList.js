import React, {useEffect} from 'react';
import {List, Input, Select, Button} from 'antd'
import BookCard from './BookCard';
import {getValidBooks} from "../services/BookService";
import '../css/HomeView.css';
import {SearchOutlined} from "@ant-design/icons";

const BookList = () => {
    const { Option } = Select;
    const [books, setBooks] = React.useState([]);
    const [selectSearchType, setSelectSearchType] = React.useState("title");
    const [value, setValue] = React.useState("");

    useEffect(() => {
        getValidBooks().then((res)=>{
                setBooks(res.data);
                console.log(res.data);
            }
        );
    },[]);

    const onSearch = async () => {
        console.log(value);
        getValidBooks(selectSearchType, value).then((res) => {
            setBooks(res.data);
            console.log(res.data);
        });
    };


    const handleChange = (e) => {
        setValue(e.target.value);
        console.log(value);
    };
    const selectChange = (newValue) => {
        // console.log(newValue);
        setSelectSearchType(newValue);
    }


    return (
      <div>
          <div style={{display:"flex"}}>
              <div style={{display:"flex", margin:"10px auto"}}>
                  <Select defaultValue="title" onChange={selectChange} style={{margin:"0 6px", padding:"10px" }}>
                      <Option value="title">书名</Option>
                      <Option value="author">作者</Option>
                      <Option value="isbn">ISBN</Option>
                  </Select>
                  <Input placeholder="搜索书名、作者或ISBN..."
                          onChange={handleChange}
                          className="mySearch"
                          style={{margin:"6px 0", width:"600px", borderRadius:"10px 0 0 10px", padding:"0 10px",height:"40px"}}
                          allowClear
                  />
                  <Button onClick={onSearch} type="primary" style={{margin:"6px 0", padding:"10px", borderRadius:"0 10px 10px 0",height:"40px"}}><SearchOutlined/></Button>
              </div>
          </div>
          <List
              dataSource={books}
              grid={{gutter: 16, column:4}}
              renderItem={(item)=>(
                  <List.Item>
                      <BookCard book={item}/>
                  </List.Item>
              )}/>
      </div>
    );
}
export default BookList;