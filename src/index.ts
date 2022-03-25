import express from 'express'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import fileUpload from 'express-fileupload'
import {connectDB} from './lib'
import {TemplatesRouter} from './routes'
import {Validateuser} from './middlewares'

const main = async () => {
	dotenv.config()

	connectDB()
	const app = express()
	app.use(cors())
	app.use(
		express.json({
			limit: '50mb',
		}),
	)
	app.use(
		fileUpload({
			limits: {},
		}),
	)
	app.use(multer().single(''))

	app.use('/', async (req, _, next) => {
		try {
			//@ts-ignore
			req.userIP = req.headers['x-real-ip']
			next()
		} catch (error) {
			console.log(error)
		}
	})
	app.use(bodyParser.json())
	app.use('/templates', Validateuser, TemplatesRouter)
	app.listen(process.env.MAIN_PORT, () => {
		console.log(`[i] Server is listening on port ${process.env.MAIN_PORT}`)
	})
}
main()
