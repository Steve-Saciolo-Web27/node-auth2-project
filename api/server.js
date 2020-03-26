const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const authRouter = require('../auth/auth-router')
const usersRouter = require('../users/users-router')
const restricted = require('../auth/restricted-middleware')
const checkDept = require('../middleware/checkDept-middleware')

const server = express()

server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', restricted, checkDept('admin'), usersRouter)

server.get('/', (req, res) => {
  res.send('We up')
})
module.exports = server
