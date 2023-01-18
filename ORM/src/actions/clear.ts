import { AppDataSourceNoSync } from '../data-source';
import { supabase } from '../supabase';
import { printDatabaseInfo } from './utils';
import * as inquirer from 'inquirer';
import { clear } from './commands';

printDatabaseInfo();

inquirer
  .prompt([
    {
      type: 'list',
      name: 'proceed',
      message: 'Truncate all tables and remove all auth users?',
      choices: ['no', 'yes'],
    },
  ])
  .then((answer) => {
    if (answer.proceed === 'yes') {
      clear(AppDataSourceNoSync);
    }
  });
