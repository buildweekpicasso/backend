# Picasso API Server

### :exclamation: This is an experimental branch, not intended to be merged to master

This is meant to be a proof of concept for getting an Express app to call a Python script in an Heroku instance.

## Minimal Node and Python example

### Code

In `index.js`

```js
server.post("/", (req, res) => {
  const { spawn } = require("child_process")
  const process = spawn("python3.7", [
    "./example.py",
    ...Object.values(req.body)
  ])

  process.stdout.on("data", d => res.json(d.toString()))
})
```

In `example.py`

```python
import sys

print('From Python: ' + ' '.join(sys.argv[1:]))
sys.stdout.flush()
```

### Usage

Currently deployed at https://quiet-shore-93010.herokuapp.com/

```sh
curl -H "Content-Type: application/json" \
  -d '{"a":"Hello","b":"from","c":"Heroku"}' \
  https://quiet-shore-93010.herokuapp.com/
```

should yield

```
"From Python: Hello from Heroku\n"
```

## Heroku setup

### Buildpacks

Add buildpack(s) for (Node and) Python

```sh
$ heroku buildpacks:add --index 1 heroku/nodejs
$ heroku buildpacks:add --index 2 heroku/python
```

Add `requirements.txt` and `runtime.txt` (I am not sure if both are required to get Python working). I left `requirements.txt` empty, and `runtime.txt` just has

```txt
python-3.7.1
```

The buildpack only supports Python versions `2.7.15`, `3.6.7`, and `3.7.1` (https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-python).

Add a `Procfile` so Heroku knows how to initiate Node server

```
web: npm run start
```
