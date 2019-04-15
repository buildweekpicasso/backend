# Picasso API Server

https://bw-picasso.herokuapp.com/

POST /auth/register

Expects JSON on the request body:
{
  "username": "example",
  "password": "example"
}

Returns 201 if user successfully created

POST /auth/login

Expects JSON on the request body:
{
  "username": "example",
  "password": "example"
}

Returns 200 if successfully logged in with token:
{
  "token": "example"
}