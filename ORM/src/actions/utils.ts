import * as inquirer from 'inquirer';
import * as fs from 'fs';

export const folderSuffix = ' (open folder)';
export const folderPrefix = '--';
export const allFilesPrompt = 'All files in this directory and subdirectories';
export const configFilename = '.cli-lock.json';

const saveVariable = (variable: string, value: string) => {
  let data: { [key: string]: string } = {};
  if (fs.existsSync(__dirname + '/' + configFilename)) {
    const fileData = fs.readFileSync(__dirname + '/' + configFilename).toString();
    data = JSON.parse(fileData);
  }
  data[variable] = value;
  fs.writeFileSync(__dirname + '/' + configFilename, JSON.stringify(data));
};

const loadVariable = (variable: string) => {
  if (fs.existsSync(__dirname + '/' + configFilename)) {
    const fileData = fs.readFileSync(__dirname + '/' + configFilename).toString();
    const data = JSON.parse(fileData);
    return data[variable];
  }
  return null;
};

export const executeLatest = (type: 'sql' | 'populate', callback: (filenames: string[], path: string) => void) => {
  const path = loadVariable(type + 'path');
  if (!path) {
    return;
  }
  if (fs.lstatSync(path).isDirectory()) {

    callback(filesInFolder(path), path);
  } else {
    const lastSlash = path.lastIndexOf('/');
    const folderPath = path.substring(0, lastSlash);
    const file = path.substring(lastSlash);
    callback([file], folderPath);
  }
};

export const filesInFolder = (path: string, relPath = '') => {
  const folderContents = fs.readdirSync(path);

  let files = folderContents.filter((node) => fs.lstatSync(path + '/' + node).isFile()).map((node) => relPath + '/' + node);
  const folders = folderContents.filter((node) => fs.lstatSync(path + '/' + node).isDirectory());

  for(const folder of folders) {
    files = files.concat(filesInFolder(path + '/' + folder, relPath + '/' + folder));
  }

  return files;
};

export const menuForFolder = (
  type: 'sql' | 'populate',
  path: string,
  message: string,
  filetype: string,
  selectCallback: (filenames: string[], path: string) => void
) => {
  const folderContents = fs.readdirSync(path);

  const nodes: { name: string; isFolder: boolean }[] = [];

  for (const node of folderContents) {
    if (fs.lstatSync(path + '/' + node).isDirectory()) {
      nodes.push({ name: node, isFolder: true });
    } else {
      if (node.toLowerCase().endsWith(filetype.toLowerCase())) {
        nodes.push({ name: node, isFolder: false });
      }
    }
  }

  nodes.sort((a, b) => b.name.localeCompare(a.name));
  nodes.sort((a, b) => (a === b ? 0 : a ? -1 : 1));

  let options = [];
  options.push(allFilesPrompt);
  options = [...options, ...nodes.map((node) => (node.isFolder ? folderPrefix + node.name + folderSuffix : node.name))];

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: message,
        choices: options,
      },
    ])
    .then((answer) => {
      if (answer.option === allFilesPrompt) {
        saveVariable(type + 'path', path);
        selectCallback(
          filesInFolder(path),
          path
        );
      } else {
        const node = nodes.find((node) => node.name === answer.option.replace(folderSuffix, '').replace(folderPrefix, ''));

        if (node?.isFolder) {
          menuForFolder(type, path + '/' + node.name, message, filetype, selectCallback);
        } else {
          saveVariable(type + 'path', path + '/' + node.name);
          selectCallback([node.name], path);
        }
      }
    });
};

export const printDatabaseInfo = () => {
  if (!process.env.DB_HOST) console.log('\x1b[31mYou are missing the following env variable: DB_HOST\x1b[0m');
  if (!process.env.DB_PORT) console.log('\x1b[31mYou are missing the following env variable: DB_PORT\x1b[0m');
  if (!process.env.DB_SCHEMA) console.log('\x1b[31mYou are missing the following env variable: DB_SCHEMA\x1b[0m');
  if (!process.env.DB_DATABASE) console.log('\x1b[31mYou are missing the following env variable: DB_DATABASE\x1b[0m');
  if (!process.env.DB_PASSWORD) console.log('\x1b[31mYou are missing the following env variable: DB_PASSWORD\x1b[0m');
  if (!process.env.DB_USER) console.log('\x1b[31mYou are missing the following env variable: DB_USER\x1b[0m');
  if (!process.env.SUPABASE_URL) console.log('\x1b[31mYou are missing the following env variable: SUPABASE_URL\x1b[0m');
  if (!process.env.SUPABASE_SERVICE_KEY) console.log('\x1b[31mYou are missing the following env variable: SUPABASE_SERVICE_KEY\x1b[0m');
  console.log(`
  \x1b[33mYou are about to make changes to the following database:\x1b[0m

  \x1b[33mhost\x1b[0m: ${process.env.DB_HOST}
  \x1b[33mport\x1b[0m: ${process.env.DB_PORT}
  \x1b[33mschema\x1b[0m: ${process.env.DB_SCHEMA}
  \x1b[33mdatabase\x1b[0m: ${process.env.DB_DATABASE}
  `);
};
