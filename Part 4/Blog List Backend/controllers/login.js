const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log("Username: ",username,"Password: ",password)
  const user = await User.findOne({ username })
  console.log("I searched for the user and found: ", user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ 
      error: 'invalid username or password'
    })
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  console.log('This is my secret: ',process.env.SECRET)
  const token = jwt.sign(userForToken,process.env.SECRET,{ expiresIn: 60*60 })
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter