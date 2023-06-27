import React, {useState} from "react";
import {Button, message} from "antd";
import {register} from "../services/UserService";


const SignUpView=({onRegister})=> {
    const [userid, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    const [email,setEmail]=useState('');
    const [tel,setTel]=useState('');
    const [address,setAddress]=useState('');
    const [nickname, setNickname] = useState('');
    const [avatar, setAvatar] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userid === '' || password === ''){
            message.error("用户名或密码不能为空！");
            return;
        }
        if(password!==confirmPassword){
            message.error("两次输入密码不一致！");
            return;
        }
        const res = await register(userid, password, nickname, tel, address, email, avatar);
        if (res.ok) {
            message.success("注册成功！");
            onRegister();
        } else {
            message.error(res.message);
        }
    };

    return (
        <div>
            <div style={{display:"flex"}}>
                {/*<span className="site-title">闲   书</span>*/}
                <img src="http://myimg.lightece.top/bookstore/assets/logo.png" alt="logo" style={{margin:"0px auto",width:"300px"}}/>
            </div>


            <div className="login-card">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="请输入用户ID"
                        value={userid}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="请设置密码"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="确认密码"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                        type="nickname"
                        placeholder="请设置昵称"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <input
                        type="avatar"
                        placeholder="请输入头像url"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="请输入邮箱"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="请输入手机号"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                    />
                    <input
                        type="address"
                        placeholder="请输入地址"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button type="submit">注册</button>
                </form>
            </div>
        </div>
    );
}

export default SignUpView;