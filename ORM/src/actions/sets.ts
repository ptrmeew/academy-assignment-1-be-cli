import { printDatabaseInfo } from './utils';
import * as inquirer from 'inquirer';
import { AppDataSourceNoSync } from '../data-source';
import { executeSet } from './commands';

if (process.argv.length <= 2) {
  console.log('Please specify the name of the set you want to execute like so: \x1b[33mnpm run set -- {filename-of-set}"');
  process.exit(0);
}

printDatabaseInfo();

const path = __dirname + '/../sets/' + process.argv[2] + '.json';
const shouldClear = process.argv[3] === '--clear';

inquirer
  .prompt([
    {
      type: 'list',
      name: 'proceed',
      message: (shouldClear ? 'Clear the database and e' : 'E') + 'xecute the following set? "' + process.argv[2] + '.json"',
      choices: ['no', 'yes'],
    },
  ])
  .then(async (answer) => {
    if (answer.proceed === 'yes') {
      await AppDataSourceNoSync.initialize();
      executeSet(AppDataSourceNoSync, path, { shouldClear });
    }
  });
