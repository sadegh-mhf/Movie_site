import { createSlice } from '@reduxjs/toolkit';

import {getMoviesGenres} from "../../api/getData";

const initialState = {
    loading: false,
    moviesGenresResp: null,
    error: undefined
}

export const MoviesGenresSlice = createSlice({
    name: 'movies genres',
    initialState,
    reducers: {
        fetchMoviesGenresRequest: () => {
            return {
                loading: true,
                moviesGenresResp: null,
                error: undefined
            }
        },
        fetchMoviesGenresSuccess: (state, action) => {
            return {
                loading: false,
                moviesGenresResp: action.payload,
                error: undefined
            }
        },

        fetchMoviesGenresFailure: (state, action) => {
            return {
                loading: false,
                moviesGenresResp: null,
                error: action.payload
            }
        }
    },
})

export const {fetchMoviesGenresRequest, fetchMoviesGenresSuccess, fetchMoviesGenresFailure} = MoviesGenresSlice.actions

const fetchMoviesGenres = () => {
    return async (dispatch) => {
        dispatch(fetchMoviesGenresRequest())
        await getMoviesGenres()
            .then(response => {
                dispatch(fetchMoviesGenresSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchMoviesGenresFailure(error.message))
            });
    }
}
export {fetchMoviesGenres}

export default MoviesGenresSlice.reducer