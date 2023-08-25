import { Movie } from '../models/types';
import { MovieModel } from '../models/movie';

abstract class MovieController {
	static async getByID(id: string): Promise<Movie> {
		const movie = await MovieModel.getByID(id);
		return movie;
	}

	static async getByTitle(title: string): Promise<Movie> {
		const movie = await MovieModel.getByTitle(title);
		return movie;
	}
}

export { MovieController };
