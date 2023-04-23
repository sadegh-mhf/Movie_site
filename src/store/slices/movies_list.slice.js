import { createSlice } from '@reduxjs/toolkit';

import {getMoviesList} from "../../api/getData";

const initialState = {
    loading: false,
    moviesListResp: null,
    error: undefined
}

export const MoviesListSlice = createSlice({
    name: 'movies list',
    initialState,
    reducers: {
        fetchMoviesListRequest: () => {
            return {
                loading: true,
                moviesListResp: null,
                error: undefined
            }
        },
        fetchMoviesListSuccess: (state, action) => {
            return {
                loading: false,
                moviesListResp: action.payload,
                error: undefined
            }
        },

        fetchMoviesListFailure: (state, action) => {
            return {
                loading: false,
                moviesListResp: null,
                error: action.payload
            }
        }
    },
})

export const {fetchMoviesListRequest, fetchMoviesListSuccess, fetchMoviesListFailure} = MoviesListSlice.actions

const fetchMoviesList = (page, startDate, endDate) => {
    return async (dispatch) => {
        dispatch(fetchMoviesListRequest())
        await getMoviesList(page, startDate, endDate)
            .then(response => {
                dispatch(fetchMoviesListSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchMoviesListFailure(error.message))
            });
    }
}
export {fetchMoviesList}

export default MoviesListSlice.reducer