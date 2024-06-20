const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers.authorization
  if (!bearerToken)
    return res.send({ message: "Unauthorized access" })
  const token = bearerToken.split(' ')[1]
  try {
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    next()
  }
  catch (err) {
    next(err)
  }
}

module.exports = verifyToken