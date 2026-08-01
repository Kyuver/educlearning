import express from 'express'
import { login } from '../controller/auth/loginController'
import { register } from '../controller/auth/registerController'

const auth = express.Router()

// route for login
auth.post('/api/login', login)

// route for register
auth.post('/api/register', register)

export default auth
