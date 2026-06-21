import { request, response } from 'express'

export class LogerController {
  collectData = async (req = request, res = response) => {
    try {
      return res.status(200).json({ ip: req.ip, req })
    } catch (error) {
      return res.json({ message: 'Error', error: error.message })
    }
  }
}
