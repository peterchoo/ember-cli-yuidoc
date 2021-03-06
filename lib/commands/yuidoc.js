'use strict';

var execSync    = require('execSync');
var fs          = require('fs');
var getVersion  = require('git-repo-version');

module.exports = {
  name: 'yuidoc',
  description: 'Generates html documentation using YUIDoc',
  run: function(options, rawArgs) {
    var config;
    try {
      var buffer = fs.readFileSync('yuidoc.json');
      config = JSON.parse(buffer);
    } catch(e){
      console.log("No yuidoc.json file in root folder. Run `ember g yuidoc` to generate one.");
      process.exit(1);
    }
    console.log('Generating documentation...');

    var command = './node_modules/ember-cli-yuidoc/node_modules/yuidocjs/lib/cli.js -q --project-version ' + getVersion();
    execSync.run("mkdir -p " + config.options.outdir);
    execSync.run(command);
  }
}
