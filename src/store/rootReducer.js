import {combineReducers} from 'redux';
import MoviesListReducer from './slices/movies_list.slice';
import MoviesGenresReducer from './slices/movies_genres.slice';
import MovieDetailReducer from './slices/movie_detail.slice';
import MovieCreditsReducer from './slices/movie_credits.slice';

const rootReducer = combineReducers({
    MoviesList: MoviesListReducer,
    MoviesGenres: MoviesGenresReducer,
    MovieDetail: MovieDetailReducer,
    MovieCredits: MovieCreditsReducer,
})

export {rootReducer}