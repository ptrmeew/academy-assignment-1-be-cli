console.log(`
  Usage:
    npm run [command]

  Available commands:
    eslint:fix        Fixes eslint problems automatically
    prettier          Formats all files according to prettier config
    sync              Synchronizes entities with live database
    populate          Executes chosen populate-scripts
    populate:repeat   Reruns the latest executed populate script/scripts
    sql               Executes chosen sql scripts
    sql:repeat        Reruns the latest executed sql script/scripts
    clear             Clears all the data in all tables in the live database
    drop              Drops all tables in live database
    set [set-name]    Executes a set of sql/populate scripts
`);