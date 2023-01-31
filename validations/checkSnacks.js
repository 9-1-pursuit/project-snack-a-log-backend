const checkName = (req, res, next) => {
  const { name } = req.body.name
  if (!name) {
    return res.status(400).json({ error: "Name is required" })
  }
  //  Capitalize the name with two or more letters
  req.body.name = name
    .trim()
    .split(" ")
    .map(
      (letter) => letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase()
    )
    .join()
  next()
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

const validateImage = (req, res, next) => {
  if (req.body.image.substring(0, 8) === "https://") {
    next()
  } else {
    res.status(400).json({ error: "Image must have a https:// URL " })
  }
}

module.exports = { checkName, checkBoolean, validateImage }
