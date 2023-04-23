import {API_KEY} from "./variables.config";

export const API_MOVIES_LIST = `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
export const API_MOVIES_GENRES = `genre/movie/list?api_key=${API_KEY}&language=en-US`;
