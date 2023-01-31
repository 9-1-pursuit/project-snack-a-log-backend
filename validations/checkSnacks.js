const checkName = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ error: 'Name is required' });
  }
};
const checkBoolean = (req, res, next) => {
  if (
    req.body.is_healthy === true ||
    req.body.is_healthy === false ||
    req.body.is_healthy === undefined
  ) {
    next();
  } else {
    res.status(400).json({ error: 'is_healthy must have a boolean value' });
  }
};


const validateImage = (req, res, next) => {
  if (req.body.image.substring(0, 8) === 'https://') {
    return next();
  } else {
    res.status(400).json({ error: 'Image must have a https:// URL ' });
  }
};

module.exports = { checkName, checkBoolean, validateImage };
