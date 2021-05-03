const ipUrl = 'http://127.0.0.1:7001/admin/';
// const ipUrl = 'http://106.12.125.99:7001/admin/';

const servicePath = {
  checkLogin: ipUrl + 'checkLogin',
  getTypeInfo: ipUrl + 'getTypeInfo',
  addArticle: ipUrl + 'addArticle',
  updateArticle: ipUrl + 'updateArticle',
  getArticleList: ipUrl + 'getArticleList',
  delArticle: ipUrl + 'delArticle/',
  getArticleById: ipUrl + 'getArticleById/'
};

export default servicePath;
