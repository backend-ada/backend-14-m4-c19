import { UserModel } from '../models/user';

export abstract class UserController {
	static async createUser(userData: any) {
		return await UserModel.createUser(userData);
	}

	static async addMovie(dataObj: any) {
		return await UserModel.addMovie(dataObj);
	}
}
