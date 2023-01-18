# Managing the database

The purpose of the ORM is to manage and control the database schema and entities.

> The ORM project is **NOT** to be deployed. It is **only** used to generate and manage the database schema and entities.

We use **Type ORM** as our **CLI** for changing and migrating the database, in a infrastructure-as-code manner.

## Getting started

Run _npm install_ in the ORM folder to install the required dependencies.

## Entities

In this project we defined entities that represents our database structure. This template includes entities for user and permission management and some entities for subscriptions. The entities can be synced with your postgres database so that all of the columns constraints table etc are created based on your entities.

To sync your entities run the _npm run sync_ command. More details on all the available commands can be found below.

## NPM scripts

The ORM project has the following npm scripts

> _npm run sync_

- synchronize entities changes to database and afterwards runs the post-sync set defined in ORM/src/sets/post-sync.json

For more details on sets, see the details about the _npm run set_ command below.

Please note that syncing does not remove tables when you delete entities. When deleting entities you must manually delete the tables afterwards.

> _npm run populate_

> _npm run populate:repeat_

- run a populate script or all of them (you will be prompted for which one)

Entities are located in ORM/src/entity

Seeders are located in ORM/src/seeders

To create a new populate script, simply add a new file in the populate-script directory that exports a function with the name "execute" and receives an EntityManager as parameter and use that manager to perform database operations. These operations are performed within a transaction, so should something fail, they are all rolled back.

Example:

```typescript
export const execute: PopulateScriptExecutor = async (manager: EntityManager) => {
  // Use the manager object to create data or supabase client to create new auth users
};
```

> _npm run sql_

> _npm run sql:repeat_

- run an sql script or all of them (you will be prompted for which one)

The scripts are run in a transaction, so should something fail, all changes are rolled back.
There is a folder called 'post-sync' which are sql scripts that are run after sync. AN example of a script
would be a script that adds a foreign key constraint to the auth.user table. These are run on each sync
bacause TypeORM will remove differences that are not in the entities like these constraints to the auth.user table.

To run the latest used sql og seeder scripts use the following commands

> _npm run clear_

- truncate all tables and delete all auth users

> _npm run set -- {set-name} {optional: --clear}_

- runs a set of populations scripts and sql files. Optionally clears the database beforehand

This command is useful if you want to run a group of population and sql scripts often and in a specific order.
This command reads a file from the 'sets' folder where the file must contain an array of strings containing the path
of the file to be run. SQL files must start from and include the 'SQL' folder in the path and populate scripts must start from and include 'populate-scripts'. An item in a set may end with **/*.ts or **/*.sql to run all files in the folder
If the --clear parameter is present, the database will be cleared first. The clearing is run in a separate transaction as the set
and cannot be undone once the clearing is finished.

If a set exists with the name post-sync.json, it will be executed automatically after the sync command has finished. This is useful for creating changes to the database that are sync-related but cannot be defined created through entities.

## Default setup

This project has a basic profile with roles and permissions and subscription handling setup. This project come included with a few populate scripts that adds some very basic permissions, roles, auth users and profiles. The SQL folder has security policies for all tables and included are a few helper database functions to make writing policies easier.

The project has a post-sync set that will add a constraint from profile to auth users and a setup set that executes most populate scripts and sql scripts.

Each included entity has comments explaining in more detail what they are for.

## Supabase

This project has 2 different supabase clients: supabase and supabaseAdmin.

supabaseAdmin uses the service key and bypasses RLS and supabase uses anon key and does not bypass RLS.

supabaseAdmin is useful for managing something a user does not have access to. An example would be managin auth users.

The supabase client is included in case you need a populate script that needs acces to something that typeorm cant access. populate script should use typeorm as much as possble though as the supabaseClient does not support transactions and changes made with the client will no be rolled back if a populate script throws an error during execution.

## Formatting code

To format the code in the ORM folder run 

>*npm run prettier*