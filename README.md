# Full-backend-template
Our template for backends, based on Supabase, TypeOrm.

The project consists of 2 smaller projects:

- ORM
- test

They share a .env file found in the root directory of this repository. Each project contains their own README that goes into more details for the specific project.

The .env file in the root of the repository needs the following env variables:

- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_DATABASE
- DB_SCHEMA
- SUPABASE_URL
- SUPABASE_SERVICE_KEY
- SUPABASE_ANON_KEY
- SUPABASE_PROJECT_ID

All supabase related variables can be found in the API and General settings on your supabase project in the supabase dashboard.

## ORM

This project managges all database-related. This is where entities are updated and script to manage the database are executed.

## Test

This is where tests are managed. These tests can include testing security policies, database functions etc.

## Additional folders

In addition there are some extra folders. The SQL folder contains all sql scripts divided into relevant folders. The diagrams folder contains related diagrams, including the editable diagram files as well. The included diagrams were made with draw.io


## Edge-functions

Edge functions are deployed serverless functions, that can be called like a regular REST endpoint. Edge funcitions can be found in the [edge-functions-cli-template](https://github.com/meewworld/edge-functions-cli-template) repository

## Subscriptions

This template is setup to handle subscriptions out of the box. For more details on each platform:

[IOS subscriptions](docs/subscriptions/IOS-SUBSCRIPTIONS.md)