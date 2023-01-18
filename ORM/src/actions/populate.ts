import { AppDataSourceNoSync } from '../data-source';
import { executeLatest, menuForFolder, printDatabaseInfo } from './utils';

const execute = (files, path) => {
  AppDataSourceNoSync.initialize().then(() => {
    AppDataSourceNoSync.transaction(async (manager) => {
      for (const file of files) {
        const module = await import(path + '/' + file);
        await module.execute(manager);
      }
    });
  });
};

if (process.argv.includes('--latest')) {
  executeLatest('populate', execute);
} else {
  printDatabaseInfo();

  menuForFolder('populate', __dirname + '/../populate/scripts/', 'Choose a populate script to run', '.ts', execute);
}
