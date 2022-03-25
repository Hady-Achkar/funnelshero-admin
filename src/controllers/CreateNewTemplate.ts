import {Response} from 'express'
import {CustomRequest, ICreateNewTemplate} from '../types'
import {Templates} from '../models'

export const CreateNewTemplate = async (
	req: CustomRequest<ICreateNewTemplate>,
	res: Response,
) => {
	try {
		const {data, title} = req.body
		if (!data || data === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing data',
						field: 'data',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!title || title === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing title',
						field: 'title',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		const _verifyUnique = await Templates.findOne({
			title,
		})
		if (_verifyUnique) {
			return res.status(400).json({
				status: 'Failure',
				message: 'Message was this name is already found.',
				template: null,
				requestTime: new Date().toISOString(),
			})
		}
		const newTemplate = await Templates.create({
			title, data,
		})
		return res.status(200).json({
			status: 'Success',
			message: `Template ${title} was created successfully.`,
			template: newTemplate,
			requestTime: new Date().toISOString(),
		})
	} catch (err) {
		if (err instanceof Error) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
	}
}
