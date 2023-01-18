import { AppDataSourceNoSync } from '../data-source';
import { executeLatest, menuForFolder, printDatabaseInfo } from './utils';
import * as fs from 'fs';

const execute = (files, path) => {
  AppDataSourceNoSync.initialize().then(() => {
    AppDataSourceNoSync.transaction(async (manager) => {
      for (const file of files) {
        const sql = fs.readFileSync(path + '/' + file);
        await manager.query(sql.toString());
      }
    });
  });
};

if (process.argv.includes('--latest')) {
  executeLatest('sql', execute);
} else {
  printDatabaseInfo();

  menuForFolder('sql', __dirname + '/../../../SQL', 'Choose an sql script to run', '.sql', execute);
}
