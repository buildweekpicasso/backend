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
  body.append("style-image", file)
  Axios.post(`${API_URL}/images/upload/`, body)
}
```

**Note:** The field name needs to be `style-image`
