import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';

import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import '../static/css/AdminIndex.css';
import logo from '../static/JZblog_logo.png';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex = props => {

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => setCollapsed(collapsed);

  const handleClickArticle = e => {
    // console.log(e.item.props)
    if (e.key === 'addArticle') {
      props.history.push('/index/add');
    } else {
      props.history.push('/index/list');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <a href="https://jzblog.com/" className="admin-logo">
          <img src={logo} alt="logo" />
        </a>

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>

          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Add Artilce
          </Menu.Item>

          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title="Article Management"
            onClick={handleClickArticle}
          >
            <Menu.Item key="addArticle">Add Article</Menu.Item>
            <Menu.Item key="articleList">Article List</Menu.Item>
          </SubMenu>

          <Menu.Item key="3" icon={<FileOutlined />}>
            Message Management
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Breadcrumb style={{ margin: '15px' }}>
          <Breadcrumb.Item>Data Management System</Breadcrumb.Item>
          <Breadcrumb.Item>Workbench</Breadcrumb.Item>
        </Breadcrumb>

        <Content style={{ margin: '0 15px' }}>
          <div style={{ padding: '24px', background: '#fff', minHeight: 400 }}>
            <Route path="/index" exact component={AddArticle} />
            <Route path="/index/add" exact component={AddArticle} />
            <Route path="/index/add/:id" exact component={AddArticle} />
            <Route path="/index/list" exact component={ArticleList} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          <div>
            Driven by {<a href="https://reactjs.org/">React</a>} + {<a href="https://ant.design/">Antd</a>}
          </div>
          <div>
            <a href="https://jzblog.com/">JZblog.com</a>
          </div>
        </Footer>
      </Layout>
    </Layout>
  )
};

export default AdminIndex;
