import http from '../services/http.service';
import {API_MOVIES_GENRES, API_MOVIES_LIST} from "../configs/api_address.config";
import {API_KEY} from "../configs/variables.config";

export async function getMoviesList(page, start_date, end_date) {
    try {
        const response = await http.get(`${API_MOVIES_LIST}&page=${page}&primary_release_date.gte=${start_date}&primary_release_date.lte=${end_date}`);
        return response
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function getMoviesGenres() {
    try {
        const response = await http.get(`${API_MOVIES_GENRES}`);
        return response
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function getMovieDetail(id) {
    try {
        const response = await http.get(`movie/${id}?api_key=${API_KEY}&language=en-US`);
        return response
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function getMovieCredits(id) {
    try {
        const response = await http.get(`movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        return response
    } catch (e) {
        return Promise.reject(e);
    }
}