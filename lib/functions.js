var vkApi = require('vk-dirty-api');
var util = require('util');
var nconf = require('nconf');
var request = require('request');
var fs = require('fs');

nconf.use('file', { file: './config.json' });
nconf.load();

var credentials = {
    client_id: nconf.get('idpri'),
    login:     nconf.get('login'),
    pass:      nconf.get('pass'),
};

var vk = new vkApi(
    credentials,
    function (err, access_token) {
        if(err)
            return console.error('Unable to authenticate', err);
        console.log('Successfully authenticated / access_token:', access_token);
});


exports.getonline1 = function getonline(){
  vk.api('users.get', {
      user_ids: 93183517,
      fields: 'online'
    }, function(err, info) {
     if(err)
      return console.error('Unable to complete request', err);
     if(info)
      fs.writeFile("online.file", info[0].online, function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
          //var text112 = info[0].online;
      });
});
};


exports.getonline2 = function getonline(){
  vk.api('users.get', {
      user_ids: 93183517,
      fields: online
    }, function(err, info) {
     if(err)
      return console.error('Unable to complete request', err);
    console.log(info);
});
};

function readonline(){
  getonline();
  return fs.read(online.file);
};

function test2(){
var fileName = "online.txt";
fs.exists(fileName, function(exists) {
  if (exists) {
    fs.stat(fileName, function(error, stats) {
      fs.open(fileName, "w+", function(error, fd) {
        var buffer = new Buffer(stats.size);

        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          var data = buffer.toString("utf8", 0, buffer.length);

          console.log(data);
          fs.close(fd);
        });
      });
    });
  }
});
};

exports.name1 = function test1(){
  var xyyyy = "tset";
  var xai = console.log(xyyyy)
};

function test3(){
  return "tset";
};
