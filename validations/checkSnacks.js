const checkName = (req, res, next) => {
  const name = req.body.name
  if (name) {
    // Capitalize the name with two or more letters
    name = name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")

    next()
  } else {
    res.status(400).json({ error: "Name is required" })
  }
}

const checkBoolean = (req, res, next) => {
  if (
    req.body.is_healthy === true ||
    req.body.is_healthy === false ||
    req.body.is_healthy === undefined
  ) {
    next()
  } else {
    res.status(400).json({ error: "is_healthy must have a boolean value" })
  }
}

// Is this validating the url and the image
//  I need these function to validate the url and set image to a dafault if no image is there
// then refractor
// const CheckImage = (snacks) => {
//   let image = snacks.image
//   if (!image) {
//     image = "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
//   }
//   return image
// }

const validateAndSetImage = (req, res, next) => {
  let image = req.body.image
  if (!image) {
    image = "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image"
  } else {
    if (
      req.body.image.substring(0, 7) !== "https://" &&
      req.body.image.substring(0, 8) !== "https://"
    ) {
      res.status(400).json({ error: "Image must have a https:// URL " })
    }
  }
  req.body.image = image
  next()
}
module.exports = { checkName, checkBoolean, validateAndSetImage }
