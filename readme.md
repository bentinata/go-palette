# Go Palette

A simple Go API to get most common colors from an image.
Basic view is available to try at https://bentinata.com/palette.

# Prerequisite

You need to install `gin` first.

```bash
go get -u github.com/gin-gonic/gin
```

# Running

Run it right away, like:
```bash
go run *.go
```

Or build it first, then execute:
```bash
go build && ./go-palette
```

Server will be available on port 5000.

# HTTP API

The actual product is an HTTP API, available at `POST /image`.
```bash
curl -F file=@/path/to/your/image 127.0.0.1:5000/image
```

This will return a response like:

```json
{
  "data": [
    "#282a29", 
    "#ec1d25", 
    "#4b6688", 
    "#f1f1f4"
  ]
}
```
