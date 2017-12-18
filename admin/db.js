const Mock = require('mockjs');
const Random = Mock.Random;
const dbfile = require('./static.json');

module.exports = function () {
  var data = {
    news: [],
    person: []
  };

  for (var i = 1; i < 10; i++) {
    data.news.push({
      "id": i,
      "title": Random.title(),
    });
    data.person.push({
      "id": i,
      "name": Random.word()
    });
  }

  return Object.assign(data, dbfile);
}