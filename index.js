var nodemiral = require('nodemiral');
var path = require('path');
var util = require('util');

/*
  vars: vars for the paramters, following fields are containing
    no fileds for now - needs no input
*/
exports.install = function(vars, taskListOptions) {
  var taskList = nodemiral.taskList('Logger Installation', taskListOptions);
  taskList.executeScript('install', {
    script: path.resolve(__dirname, 'scripts/install.sh')
  });
  return taskList;
};

/*
  vars: vars for the paramters, following fields are containing
    host: host of the syslog server
    port: port of the syslog server
    logFiles: array of logFiles
*/
exports.configure = function(vars, taskListOptions) {

  var taskList = nodemiral.taskList('Logger Configuration', taskListOptions);

  taskList.copy('upstart', {
    src: path.resolve(__dirname, 'templates/logger.init.conf'),
    dest: '/etc/init/nodemiral-logger.conf'
  });

  taskList.copy('log_files.yml', {
    src: path.resolve(__dirname, 'templates/log_files.yml'),
    dest: '/opt/nodemiral/logger/log_files.yml',
    vars: {
      host: vars.host,
      port: vars.port,
      logFiles: vars.logFiles || []
    }
  });

  //restart
  taskList.execute('restarting logger', {
    command: '(sudo stop nodemiral-logger || :) && (sudo start nodemiral-logger || :)'
  });
  return taskList;
};

/*
  vars: vars for the paramters, following fields are containing
    no fileds for now - needs no input
*/
exports.start = function(vars, taskListOptions) {
  var taskList = nodemiral.taskList('Start Logger', taskListOptions);
  taskList.execute('start', {
    command: "sudo start nodemiral-logger || :"
  });

  return taskList;
};

/*
  vars: vars for the paramters, following fields are containing
    no fileds for now - needs no input
*/
exports.stop = function(vars, taskListOptions) {
  var taskList = nodemiral.taskList('Stop Logger', taskListOptions);
  taskList.execute('start', {
    command: "sudo stop nodemiral-logger || :"
  });

  return taskList;
};