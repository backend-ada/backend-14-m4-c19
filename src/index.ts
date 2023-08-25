import { MovieController } from './controllers/movie';
import minimist from 'minimist';

function requestData(params: any) {
	if (params.title) return MovieController.getByTitle(params.title);
	if (params.id) return MovieController.getByID(params.id);
}

function processParams(params: any) {
	const processedParams = minimist(params);
	const { title, id } = processedParams;

	if (!title && !id) return 'Error, faltan parametros';
	if (title && id) return 'Error, demasiados parametros';

	return { title, id };
}

function main() {
	const params = process.argv.slice(2);
	const processedParams = processParams(params);
	const result = requestData(processedParams);

	result?.then((data) => console.log(data));
}

main();
