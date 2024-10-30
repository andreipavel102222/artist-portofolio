# artist-portofolio

To run the application on your machine you need to install:
- node version 20 or newer
- docker

## Steps
1. clone the git repository
2. run a docker container with postgres database
```bash
$ docker run -p 5435:5432 -e POSTGRES_PASSWORD="set your password" -d postgres
```
3. install dependecies (you have to run this command twice, in /artist-portofolio-backend and /artist-portofolio-frontend)
```bash
$ npm install
```
4. start backend
```bash
$ npm run start:dev
```
5. start frontend
```bash
$ npm run dev
```

## Important information
After you start the application you have to create an account for an artist using Postman or another tool that generates 
requests, as the frontend application does not have sign up functionality. You will need to make a POST request to
http://localhost:3000/auth/signup and provide an username and a password in the body. After that, an account is created
and you can sign in with the credentials.
