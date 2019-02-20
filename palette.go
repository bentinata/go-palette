package main

import (
  "fmt"
  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()

  r.Static("/", ".")

  r.POST("/image", func(c *gin.Context) {
    img, err := Process(c.Request, "file")

    if err != nil {
      panic(err)
    }

    colors := Quantize(img, 2)
    palette := make([]string, len(colors))
    for index, clr := range colors {
      palette[index] = fmt.Sprintf("#%.2x%.2x%.2x%.2x", clr.R, clr.G, clr.B, clr.A);
    }

    c.JSON(200, gin.H{
      "data": palette,
    })

  })

  r.Run(":5000")
}
