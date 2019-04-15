# Picasso API Server

https://bw-picasso.herokuapp.com/

### POST /auth/register

Expects JSON on the request body:

```json
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

### POST /auth/login

Expects JSON on the request body:

```json
{
  "username": "example",
  "password": "example"
}
```

Returns 400 if username or password aren't present
Returns 401 if credentials are invalid
Returns 200 if successfully logged in with token:

```json
{
  "token": "example"
}
```

### POST /images/process

Expects JSON on the request body:

```json
{
  "style": "example URL",
  "content": "example URL"
}
```

Returns 200 if images were processed successfully with:

```json
{
  "output_url": "example URL"
}
```

## Image upload

In React app, declare a base URL for the API

```js
const API_URL = "http://localhost:5555"
```

then add a change handler or submit hanlder that uploads the file to `/images/upload"

```js
const handleChange = ({ target: { files } }) => {
  const [file] = files
  let body = new FormData()
  body.append("user-image", file)
  Axios.post(`${API_URL}/images/upload/`, body)
}
```

**Note:** The field name needs to be `user-image`
