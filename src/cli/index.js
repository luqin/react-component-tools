require('colors');

let program = require('commander');
let packageInfo = require('../../package.json');

program
  .version(packageInfo.version)
  .command('run [name]', 'run specified task')
  .option('-v, --version')
  .parse(process.argv);

// https://github.com/tj/commander.js/pull/260
let proc = program.runningCommand;
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', function () {
    process.exit(1);
  });
}

let subCmd = program.args[0];
if (!subCmd || subCmd !== 'run') {
  program.help();
}
