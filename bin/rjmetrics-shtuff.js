#!/usr/bin/env node

var yargs = require('yargs')
    .usage('$0 [command] <options>')
    .command('push', 'push metrics to rjmetrics')
    .option('path', {
      alias: 'p',
      describe: 'path to .env file to load'
    })
    .help('help')
    .alias('help', 'h')
  var argv = yargs.argv

if (!argv._.length || argv._.indexOf('push') === -1) yargs.showHelp()
else {
  var importer = require('../import')
  importer(argv)
}
