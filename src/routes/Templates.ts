import express from 'express'
import {CreateNewTemplate} from '../controllers'

const router = express.Router()
router.route('/').post(CreateNewTemplate)
export default router