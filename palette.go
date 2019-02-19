package main

import (
  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()

  r.GET("/", func(c *gin.Context) {
    c.File("index.html")
  })

  r.POST("/image", func(c *gin.Context) {
    img, err := Process(c.Request, "file")

    if err != nil {
      panic(err)
    }

    colors := Image(img, 2)

    c.JSON(200, gin.H{
      "message": colors,
    })

  })

  r.Run(":5000")
}
