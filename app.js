var vkApi = require('./vk-dirty-api.js');
var fs = require('fs');
var util = require('util');
var nconf = require('nconf');
var gui = require('nw.gui');

nconf.use('file', { file: './message.json' });
nconf.load();

var credentials = {
    client_id: 4830258,
    login:     nconf.get('login'),
    pass:      nconf.get('pass'),
};

var vk = new vkApi(
    credentials,
    function (err, access_token) {
        if(err)
            return console.error('Unable to authenticate', err);
        console.log('Successfully authenticated / access_token:', access_token);
        document.getElementById('logua').innerHTML='Successfully authenticated / access_token: '+access_token;
    });

function op()
{
document.getElementById('loginpok').innerHTML='Логин: '+nconf.get('login');
document.getElementById('passpok').innerHTML='Пароль: '+nconf.get('pass');
}

function writeconfig(){
  nconf.set('login', document.writeform.login.value);
  nconf.set('pass', document.writeform.pass.value);
  nconf.save(function (err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Configuration saved successfully.');
});

}

function shw(obj){
  obj.var1.value=nconf.get('login');
  obj.var2.value=nconf.get('pass');
}

function tstreq(){
var idsob = document.writeform.id.value;
vk.api('wall.get', {
            owner_id: idsob
            }, function (err, info) {
        if(err)
            return console.error('Unable to complete request', err);
      document.getElementById('infouser').innerHTML = '<pre>'+JSON.stringify(info, null, 2)+'</pre>';
        console.log(info);
    });
}

vk.on('error', function (err) {
    // do authentication fail related stuff...
});
