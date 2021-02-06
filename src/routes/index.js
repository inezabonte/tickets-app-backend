import express from 'express'
import twilioRoutes from './api/twilio'

const routes = express.Router()

routes.use('/login', twilioRoutes)

export default routes