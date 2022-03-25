import {Request} from 'express'

export {IFunnel} from './Funnel'
export {IPage} from './Page'
export {ITemplate} from './Template'
export {IUser} from './User'
export {ICreateNewTemplate} from './ICreateNewTemplate'
export {OptSubmits} from './OptSubmits'

export interface IAuthUser {
	readonly email: string
	readonly fullName: string
	readonly _id: string
}

export interface AuthedUser extends Request {
	readonly user: IAuthUser
}

export interface AuthUserBody<T> extends AuthedUser {
	body: T
}

export interface CustomRequest<T> extends Request {
	body: T
}

