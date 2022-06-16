# README

### Dependencies

- node version - **14.17.3**
- npm version - **6.14.13**

## Install

    $ git clone https://github.com/kushalts/jetdevs-test.git
    $ cd jetdevs-test
    $ npm install

### Creating .env file

- Create **.env** file from **.env.example**

### Database setup steps

- Create database in MySQL **`jdtest_dev`**
- Run migration to create tables script using this command - **`npm run migrate`**
- Run seeder script using this command - **`npm run seed`**, this will add 2 users with admin and user role

### Create swagger file

- Run command - **`npm run swagger`**
- This will create api.json file at path src/swagger.
- Copy content of api.json file and paste in online swagger editor on this URL: **`https://editor.swagger.io/`**
- Please note: Swagger having issue with file upload. So, to test import excel file API, please use postman or curl command as below
  **`curl --location --request POST 'http://localhost:3001/file/upload' \ --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU1Mzc5MzMyfQ.AIs3afg7GiHa2WNTG4Z-P-OgVoG2QxlFF2YP7jCjkdY' \ --form 'file=@"YOUR FILE PATH"'`**

### Postman setup steps

- You can also import postman collection from **/postman**

### Running Project on dev

```bash
npm run dev
```

### Running Project on production

```bash
tsc
```

```bash
npm run prod
```

### Running Jest Test Cases

```bash
npm run test
```

```bash
npm run test:watch
```
