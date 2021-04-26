import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Row, Col, Button, Modal, message } from 'antd';

import servicePath from '../config/apiUrl';
import '../static/css/ArticleList.css';

const { confirm } = Modal;

const ArticleList = props => {
  const [list, setList] = useState([]);

  const getArticleList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(
      res => setList(res.data.data)
    );
  };

  useEffect(() => { getArticleList() }, []);

  const delArticle = id => {
    confirm({
      title: 'Are you sure to delete this post?',
      content: 'If you click the OK button, the article will be deleted forever and cannot be recovered.',
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          res => {
            message.success('Delete Successfully');
            getArticleList();
          }
        );
      },
      onCancel() {
        message.success('No Change');
      }
    });
  };

  const updateArticle = id => {
    props.history.push('/index/add/' + id);
  };

  return (
    <List
      header={
        <Row className="list-row">
          <Col span={8}><b>Title</b></Col>
          <Col span={4}><b>Type</b></Col>
          <Col span={4}><b>Release Time</b></Col>
          <Col span={4}><b>Views</b></Col>
          <Col span={4}><b>Action</b></Col>
        </Row>
      }
      bordered
      itemLayout="horizontal"
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Row className="list-row">
            <Col span={8}>{item.title}</Col>
            <Col span={4}>{item.typeName}</Col>
            <Col span={4}>{item.addTime}</Col>
            <Col span={4}>{item.view_count}</Col>
            <Col span={4}>
              <Button type="primary" onClick={() => { updateArticle(item.id) }}>Modify</Button>&nbsp;
              <Button onClick={() => { delArticle(item.id) }}>Delete</Button>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default ArticleList;
