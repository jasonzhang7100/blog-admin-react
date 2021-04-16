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
// import ArticleList from './ArticleList';
import '../static/css/AdminIndex.css';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex = props => {

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => setCollapsed(collapsed);

  // const handleClickArticle = e => {
  //   // console.log(e.item.props)
  //   if (e.key === 'addArticle') {
  //     props.history.push('/index/add');
  //   } else {
  //     props.history.push('/index/list');
  //   }
  // };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="admin-logo">JSblog</div>

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>

          <Menu.Item key="2" icon={<DesktopOutlined />}>
            添加文章
          </Menu.Item>

          <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>

          <Menu.Item key="3" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Breadcrumb style={{ margin: '15px' }}>
          <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
          <Breadcrumb.Item>工作台</Breadcrumb.Item>
        </Breadcrumb>

        <Content style={{ margin: '0 15px' }}>
          <div style={{ padding: '24px', background: '#fff', minHeight: 400 }}>
            <Route path="/index" exact component={AddArticle} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>JZblog.com</Footer>
      </Layout>
    </Layout>
  )
};

export default AdminIndex;
