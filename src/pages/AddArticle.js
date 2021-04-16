import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';

import servicePath from '../config/apiUrl';
import '../static/css/AddArticle.css';

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = props => {

  const [typeInfo, setTypeInfo] = useState([]);
  const [showDate, setShowDate] = useState();
  const [articleTitle, setArticleTitle] = useState('');
  const [selectedType, setSelectedType] = useState('选择类别');

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(
      res => {
        if (res.data.data === "没有登录") {
          localStorage.removeItem('openId');
          props.history.push('/');
        } else {
          setTypeInfo(res.data.data);
        }
      }
    );
  };

  useEffect(() => { getTypeInfo() }, []);

  const saveArticle = () => {
    if (selectedType === '选择类别') {
      message.error('必须选择文章类别');
      return false;
    } else if (!articleTitle) {
      message.error('文章名称不能为空');
      return false;
      // } else if (!articleContent) {
      //   message.error('文章内容不能为空');
      //   return false;
      // } else if (!introducemd) {
      //   message.error('简介不能为空');
      //   return false;
    } else if (!showDate) {
      message.error('发布日期不能为空');
      return false;
    }
    message.success('检验通过');
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Row gutter={16} >
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={e => setArticleTitle(e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Select defaultValue={selectedType} size="large" onChange={value => setSelectedType(value)}>
                {
                  typeInfo.map((item, index) => (
                    <Option key={index} value={item.id}>{item.typeName}</Option>
                  ))
                }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={8} >
            <Col span={12}>
              <TextArea
                className="add-markdown-content"
                rows={32}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div className="add-show-html">
              </div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
              <br /><br />
            </Col>

            <Col span={24}>
              <TextArea
                rows={8}
                placeholder="文章简介"
              />
              <br /><br />
              <div className="add-introduce-html">introduce</div>
              <br />
            </Col>

            <Col span={24}>
              <DatePicker
                placeholder="发布日期"
                size="large"
                onChange={(date, dateString) => setShowDate(dateString)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddArticle;
