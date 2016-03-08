
var express = require('..');
var request = require('supertest');

describe('res', function(){
  describe('.settings', function(){
    var app = express();
    app.get('/', function(req, res){
      res.settings['json spaces'] = 2;
      res.json({a:'b'});
    });
    app.get('/other', function(req, res){
      res.json({a:'b'});
    });

    it('should override app settings', function(done){
      request(app)
      .get('/')
      .expect(200, '{\n  "a": "b"\n}', done);
    })

    it('should not affect app settings for other requests', function(done){
      request(app)
      .get('/other')
      .expect(200, '{"a":"b"}', done);
    })
  })
})
