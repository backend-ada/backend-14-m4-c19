import { MovieController } from './controllers/movie';
import { UserController } from './controllers/user';
import minimist from 'minimist';

function requestData(params: any) {
	const { user, movie, update, title, id, userID, watched, name } = params;
	const watchedArr = [] as string[];

	if (movie) {
		if (title) return MovieController.getByTitle(params.title);
		if (id) return MovieController.getByID(params.id);
	}

	if (user) {
		if (typeof watched === 'string') {
			watchedArr.push(watched);
		} else {
			watchedArr.push(...watched);
		}

		console.log(watchedArr);

		if (update) return UserController.addMovie({ userID, watched: watchedArr });

		return UserController.createUser({ name, watched: watchedArr });
	}
}

function processParams(params: any) {
	const processedParams = minimist(params);

	const {
		title,
		id,
		name,
		movie,
		user,
		update,
		userID,
		watched = [],
	} = processedParams;

	if (movie) {
		if (!title && !id) return 'Error, faltan parametros';
		if (title && id) return 'Error, demasiados parametros';

		return { movie, title, id };
	}

	if (user) {
		if (update && userID) {
			return { user, update, userID, watched };
		}

		if (!name) return 'Error, el nombre de usuario es requerido.';

		return { user, name, watched };
	}
}

function main() {
	const params = process.argv.slice(2);
	const processedParams = processParams(params);
	const result = requestData(processedParams);

	result?.then((data) => console.log(data));
}

main();
