# Tests

This project contains automated tests for the backend. Tests are written using [Jest](https://jestjs.io/).

The tests interact directly with the database so it is important that they do no interact with production databases and it might be desired if the tests clean up after running.

To run all the tests run:

> _npm test_

## Structure

Each test file has a beforeAll function that runs before all the tests. This function signs in the user that is needed for the tests.

New data that is created is stored so it is possible to delete it once the test has completed.

Each test file also have an afterAll function which is run when all tests have completed. This functions signs the user out and deletes all the data that was created.

## Supabase

This project has 2 different supabase clients: supabase and supabaseAdmin.

supabaseAdmin uses the service key and bypasses RLS and supabase uses anon key and does not bypass RLS.

supabaseAdmin is useful for when you need to fetch data that the signed in user does not have access to, when testing RLS policies.

## Generate types

this project includes an npm script that generates types for the [supabase client](https://supabase.com/docs/guides/resources/supabase-cli). to run it use the command

> _npm run generate:types_

This requires that the supabase cli is set up. To set it up run the following commands:

>*supabase login* 

To link the supabase cli to your supabase project run

>*supabase link --project-ref \<project-id>*

Where project-id can be found in the supabase settings under general.

## Formatting code

To format the code in the test folder run

> _npm run prettier ._

command
