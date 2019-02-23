package main

import (
  "bytes"
  "errors"
  "fmt"
  "image"
  _ "image/png"
  _ "image/jpeg"
  "io/ioutil"
  "net/http"
)

func okContentType(contentType string) bool {
  return contentType == "image/png" || contentType == "image/jpeg"
}

func Process(r *http.Request, field string) (image.Image, error) {
  file, info, err := r.FormFile(field)

  if err != nil {
    return nil, err
  }

  contentType := info.Header.Get("Content-Type")

  if !okContentType(contentType) {
    return nil, errors.New(fmt.Sprintf("Wrong content type: %s", contentType))
  }

  bs, err := ioutil.ReadAll(file)

  if err != nil {
    return nil, err
  }

  img, _, err := image.Decode(bytes.NewReader(bs))

  if err != nil {
    return nil, err
  }

  return img, nil
}

