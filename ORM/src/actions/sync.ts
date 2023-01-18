import { AppDataSourceSync } from '../data-source';
import * as inquirer from 'inquirer';
import { printDatabaseInfo } from './utils';
import * as fs from 'fs';
import { executeSet } from './commands';

printDatabaseInfo();

inquirer
  .prompt([
    {
      type: 'list',
      name: 'proceed',
      message: 'Sync database changes?',
      choices: ['no', 'yes'],
    },
  ])
  .then((answer) => {
    if (answer.proceed === 'yes') {
      sync();
    }
  });

const sync = async () => {
  await AppDataSourceSync.initialize().catch((error) => console.log(error));

  const path = __dirname + '/../sets/post-sync.json';

  if (fs.existsSync(path)) {
    console.log('Executing post-sync set');
    await executeSet(AppDataSourceSync, path);
  } else {
    console.log('No post sync set was found');
  }
  console.log('Sync finished');
};
