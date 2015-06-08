var deploy = require('../index');
var path = require('path');
var config = require('../../atm-conf.js');
deploy({
    src: path.join(__dirname, 'testdir'),
    dest: '/atm-scp/test',  //replace to the absolute path on your server
    exclusions: ['**/ignore.txt','**/.DS_Store', '**/Thumbs.db'],
    auth: {
        host: config.host,
        username: config.username,
        password: config.password
    }
});