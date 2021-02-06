import express from 'express'
import { sendVeridication, checkVerification } from '../../controllers/twilioController'

const router = express.Router()

router.post('/sendVerification', sendVeridication)

router.post('/checkVerification', checkVerification)

export default router