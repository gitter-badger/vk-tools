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


function addtofriends(){
  vk.api('users.search', {
      count: 50
    }, function(err, info) {
     if(err)
      return console.error('Unable to complete request', err);
    console.log(info);
    _.each(info.items,function(items) {
      vk.api('friends.add', {
          count: items.id
        }, function(err, info) {
         if(err)
          return console.error('Unable to complete request', err);
        console.log(info);
        });
      });
    });
  });

  function invitetogroup(){
    vk.settoken(token);
    vk.api('friends.get', {
        user_id: myid
      }, function(err, info) {
       if(err)
        return console.error('Unable to complete request', err);
      console.log(info);
      _.each(info.items,function(items) {
        vk.api('groups.invite', {
            group_id: mygroup,
            user_id: items
          }, function(err, info) {
           if(err)
            return console.error('Unable to complete request', err);
          console.log(info);
          });
        });
      });
    });
