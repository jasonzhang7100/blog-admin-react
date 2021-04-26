import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';

import servicePath from '../config/apiUrl';
import '../static/css/AddArticle.css';

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = props => {

  const [typeInfo, setTypeInfo] = useState([]);
  const [articleId, setArticleId] = useState(0);
  const [selectedType, setSelectedType] = useState('Select Type');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [introduceContent, setIntroduceContent] = useState('');
  const [showDate, setShowDate] = useState();


  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(
      res => {
        if (res.data.data === 'Not Login') {
          localStorage.removeItem('openId');
          props.history.push('/');
        } else {
          setTypeInfo(res.data.data);
        }
      }
    );
  };

  const getArticleById = id => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(
      res => {
        const articleInfo = res.data.data[0];
        setArticleTitle(articleInfo.title);
        setIntroduceContent(articleInfo.introduce);
        setArticleContent(articleInfo.article_content);
        // setShowDate(getArticleById.addTime);
        console.log(articleInfo.typeName);
        setSelectedType(articleInfo.typeName);
        console.log(selectedType);
      }
    );
  };

  useEffect(() => {
    getTypeInfo();
    const tempId = props.match.params.id;
    if (tempId) {
      setArticleId(tempId);
      getArticleById(tempId);
    }
  }, []);

  const saveArticle = () => {
    if (selectedType === 'Not Login') {
      message.error('Type is required');
      return false;
    } else if (!articleTitle) {
      message.error('Title is required');
      return false;
    } else if (!articleContent) {
      message.error('Content is required');
      return false;
    } else if (!introduceContent) {
      message.error('Introduce is required');
      return false;
    } else if (!showDate) {
      message.error('Release date is required');
      return false;
    }
    // message.success('All Checked');

    const dataProps = {};
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introduceContent;

    if (articleId === 0) {
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          setArticleId(res.data.insertId);
          if (res.data.insertSuccess) {
            message.success('Add new article successfully');
          } else {
            message.error('Fail to add new article');
          }
        }
      );
    } else {
      dataProps.id = articleId;
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.updateSuccess) {
            message.success('Modify successfully');
          } else {
            message.error('Fail to modify article');
          }
        }
      );
    }
  };





  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Row gutter={16} >
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="Post Title"
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
                value={articleContent}
                rows={32}
                placeholder="Article Content"
                onChange={e => setArticleContent(e.target.value)}
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
              <Button size="large">Save Article</Button>&nbsp;&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>Release Article</Button>
              <br /><br />
            </Col>

            <Col span={24}>
              <TextArea
                value={introduceContent}
                rows={8}
                placeholder="Article Introduce"
                onChange={e => setIntroduceContent(e.target.value)}
              />
              <br /><br />
              <div className="add-introduce-html">introduce</div>
              <br />
            </Col>

            <Col span={24}>
              <DatePicker
                placeholder="Select Time"
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
