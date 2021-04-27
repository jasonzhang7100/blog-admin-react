import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';

import servicePath from '../config/apiUrl';
import '../static/css/Login.css';

const Login = props => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    setIsLoading(true);

    if (!userName) {
      message.error('Username is empty');
      return;
    } else if (!password) {
      message.error('Password is empty');
      return;
    }

    const dataProps = {
      'userName': userName,
      'password': password
    };

    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true
    }).then(
      res => {
        setIsLoading(false);
        if (res.data.data === 'Login Success') {
          localStorage.setItem('openId', res.data.openId);
          props.history.replace('/index');
        } else {
          message.error('Incorrect username or password');
        }
      }
    );
  };

  setTimeout(() => { setIsLoading(false) }, 500);

  return (
    <div className="login-layout">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Jason's Blog System" bordered={true} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter Your Username"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => setUserName(e.target.value)}
          />

          <Input.Password
            id="password"
            size="large"
            placeholder="Enter Your password"
            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => setPassword(e.target.value)}
          />

          <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
