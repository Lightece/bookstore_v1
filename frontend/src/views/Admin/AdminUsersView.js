// 0 normal. 1 admin. 2 banned

import React, {useEffect, useState} from "react";
import {Button, message, Table, theme} from "antd";
import {getUserList, setUserStatus} from "../../services/UserService";

const AdminUsersView = () => {
    const [userList, setUserList] = useState([]);
    const [adminList, setAdminList] = useState([]);
    const [banList, setBanList] = useState([]);
    // const [selectedUser, setSelectedUser] = useState(null);
    const fetchUserList = async (type) => {
        try {
            const res = await getUserList(type);
            const data = res.data;
            console.log(res);
            if(type===0)setUserList(data);
            else if(type===1)setAdminList(data);
            else if(type===2)setBanList(data);
        } catch (error) {
            console.log("Error fetching book list:", error);
        }
    };

    useEffect(() => {
        fetchUserList(0);
        fetchUserList(1);
        fetchUserList(2);
    }, []);

    const changeUserStatus = async (user, status) => {
        try {
            await setUserStatus(user.userid, status);
            if(status===2)message.success("已封禁！")
            else if(status===1)message.success("已设为管理员！");
            else if(status===0)message.success("已设为普通用户！");
            fetchUserList(0);
            fetchUserList(1);
            fetchUserList(2);
        } catch (error) {
            console.log("Error changing user status:", error);
            message.error("出错啦，请重试");
        }
    };

    const {
        token: { colorBgContainer},
    } = theme.useToken();

    const columns = [
        {
            title: "账号",
            dataIndex: "userid",
            key: "userid",
        },
        {
            title: "昵称",
            dataIndex: "nickname",
            key: "nickname",
        },
        {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "电话",
            dataIndex: "tel",
            key: "tel",
        },
        {
            title: "地址",
            dataIndex: "address",
            key: "address",
        },
    ];

    const userColumns = columns.concat([{
        title: "操作",
        key: "actions",
        render: (_, user) => (
            <div style={{display:"flex"}}>
                <Button type="link" danger onClick={() => changeUserStatus(user, 2)} style={{margin:"0"}}>
                    封禁
                </Button>
                <Button type="link" onClick={() => changeUserStatus(user, 1)} style={{margin:"0"}}>
                    设为管理员
                </Button>
            </div>
        ),
    },]);
    const adminColumns = columns.concat([{
        title: "操作",
        key: "actions",
        render: (_, user) => (
            <div style={{display:"flex"}}>
                <Button type="link" danger onClick={() => changeUserStatus(user, 0)} style={{margin:"0"}}>
                    取消管理员
                </Button>
            </div>
        ),
    },]);
    const banColumns = columns.concat([{
        title: "操作",
        key: "actions",
        render: (_, user) => (
            <div style={{display:"flex"}}>
                <Button type="link" onClick={() => changeUserStatus(user, 0)} style={{margin:"0"}}>
                    解禁
                </Button>
            </div>
        ),
    },]);
    return (
        <div className="content"
             style={{background: colorBgContainer, padding:"30px", color:"#000"}}
        >
            <h2>管理用户</h2>
            <h1>普通用户</h1>
            <Table dataSource={userList} columns={userColumns} rowKey="userid" />
            <h1>已封禁</h1>
            <Table dataSource={banList} columns={banColumns} rowKey="userid" />
            <h1>管理员</h1>
            <Table dataSource={adminList} columns={adminColumns} rowKey="userid" />
        </div>
    );
}

export default AdminUsersView;