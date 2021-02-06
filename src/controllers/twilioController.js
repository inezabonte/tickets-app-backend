import 'dotenv/config'
import twilio from 'twilio'

const { TWILIO_ACCOUNT_SID, SERVICE_ID, TWILIO_AUTH_TOKEN } = process.env

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)



export const sendVeridication = async (req, res, next) => {

    const {phoneNumber} = req.body

    try {
        const sendToken = await client.verify.services(SERVICE_ID)
        .verifications
        .create({to: `+250${phoneNumber}`, channel: 'sms'})

        res.status(200).json({status: 200, message: sendToken.status})
    } catch (error) {
       next(error) 
    }

}

export const checkVerification = async (req, res, next) => {
    const { phoneNumber, token } = req.body

    try {
        const checkToken = await client.verify.services(SERVICE_ID)
        .verificationChecks
        .create({to: phoneNumber, code: token})

        res.status(200).json({status: 200, message: checkToken.status})
    } catch (error) {
        next(error)
    }

}