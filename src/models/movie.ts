import { Movie } from './types';
const API_BASE_URL = new URL('https://www.omdbapi.com/?&apikey=ca7952be');

async function fetchData(url: URL) {
	const response = await fetch(url);
	const data = await response.json();

	return data as Movie;
}

abstract class MovieModel {
	static async getByID(id: string): Promise<Movie> {
		API_BASE_URL.searchParams.append('i', id);

		const result = await fetchData(API_BASE_URL);
		return result;
	}

	static async getByTitle(title: string): Promise<Movie> {
		API_BASE_URL.searchParams.append('t', title);

		const result = await fetchData(API_BASE_URL);
		return result;
	}
}

export { MovieModel };
