# Schooltables

## First time setup

You'll need postgres running on localhost, with user `schooltables` with access to database `schooltables` and password `dev`.

Editor with eslint and prettier already setup recommended.

Install dependencies

```
yarn
```

Init database

```
cd server && npx knex migrate:latest
```

## Local development

Run the frontend

```
yarn dev
```

Run the backend

```
yarn dev-server
```

## Frontend

Create-react-app with reduced redux, selectors and data-providers.

## Backend

Express.js with knex and postgres.

### Database changes

You need to create migration if you want to do db changes.

```
cd server && npx knex migrate:make migration_name
```

You can edit it in the `migrations` directory, and once ready apply by running `npx knex migrate:latest` inside the server directory.

Go to `knexjs.org` for further support.

## Production

You need access to vacuumlabs heroku and the schooltables project within it. 

Add heroku remote

```
heroku git:remote -a schooltables
```

You can see the config vars via

```
heroku config
```

And modify them by (*be carefull when doing this*)

```
heroku config:set VAR_NAME NEWVALUE
```

### Deploy

Push into `heroku` remote just like you would into `origin`. You can track the progress into 


### Database

You can use the DATABASE_URL heroku config var to gain access directly to the production database

```
psql COPY_AND_PASTE_DATABASE_URL
```