import usersDB from '../database/users.json';
import { User } from './types';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'jsonfile';
const USERS_DB_PATH = './src/database/users.json';

function createUser(data: any) {
	const { name, watched } = data;

	return {
		name,
		id: randomUUID(),
		watched,
	};
}

abstract class UserModel {
	static async createUser(userData: any): Promise<any> {
		const database = usersDB as User[];
		const newUser = createUser(userData);

		database.push(newUser);

		writeFile(USERS_DB_PATH, database);

		return { status: true, user: newUser.id };
	}

	static async addMovie(movie: string) {}
}

export { UserModel };
