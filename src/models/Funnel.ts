import {Schema, model} from 'mongoose'
import {IFunnel} from '../types'
import * as dotenv from 'dotenv'

dotenv.config()
const FunnelSchema = new Schema<IFunnel>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		metaTags: {
			type: String,
			trim: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		baseDomain: {
			type: String,
			trim: true,
		},
		proDomain: {
			type: String,
			trim: true,
			default: '',
		},
		favIcon: {
			type: String,
			trim: true,
			default: process.env.FUNNELS_FAV_ICON || '',
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		publish: {
			pages: [
				{
					type: Schema.Types.Mixed,
					ref: 'Page',
				},
			],
		},
		pages: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Page',
			},
		],
		contactEmail: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
)
FunnelSchema.pre('save', async function(next) {
	this.baseDomain = `${this.title.toLowerCase()}.funnelshero.com`.replace(
		/\s/g,
		'-',
	)
	next()
})
FunnelSchema.index({
	title: 'text',
	proDomain: 'text',
	baseDomain: 'text',
})

export default model<IFunnel>('Funnel', FunnelSchema)
