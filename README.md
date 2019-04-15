# Picasso API Server

https://bw-picasso.herokuapp.com/

POST /auth/register

Expects JSON on the request body:
```
{
  "username": "example",
  "password": "example"
}
```
Returns 400 if username or password aren't present
Returns 401 if credentials are invalid
Returns 201 if user successfully created with token:
```
{
  "token": "example"
}
```

POST /auth/login

Expects JSON on the request body:
```
{
  "username": "example",
  "password": "example"
}
```

Returns 400 if username or password aren't present
Returns 401 if credentials are invalid
Returns 200 if successfully logged in with token:
```
{
  "token": "example"
}
```

POST /images/process

Expects JSON on the request body:
```
{
  "style": "example URL:,
  "content": "example URL"
}
```

Returns 200 if images were processed successfully with:
```
{
  "output_url": "example URL"
}
```