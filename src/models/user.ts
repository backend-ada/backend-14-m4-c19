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
		// Chequear que no exista ya el usuario.

		const database = usersDB as User[];
		const newUser = createUser(userData);

		database.push(newUser);

		writeFile(USERS_DB_PATH, database);

		return { status: true, user: newUser.id };
	}

	static async addMovie(dataObj: any) {
		const { userID, watched } = dataObj;

		const indexOfMovie = usersDB.findIndex((movie) => movie.id == userID);

		if (indexOfMovie === -1) return false;

		const userFound = usersDB[indexOfMovie];

		userFound.watched.push(...watched);

		usersDB.splice(indexOfMovie, 1, userFound);

		console.log(usersDB);

		writeFile(USERS_DB_PATH, usersDB);

		return true;
	}
}

export { UserModel };
