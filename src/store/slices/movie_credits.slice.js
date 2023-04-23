import { createSlice } from '@reduxjs/toolkit';

import {getMovieCredits} from "../../api/getData";

const initialState = {
    loading: false,
    movieCreditsResp: null,
    error: undefined
}

export const MovieCreditsSlice = createSlice({
    name: 'movie credits',
    initialState,
    reducers: {
        fetchMovieCreditsRequest: () => {
            return {
                loading: true,
                movieCreditsResp: null,
                error: undefined
            }
        },
        fetchMovieCreditsSuccess: (state, action) => {
            return {
                loading: false,
                movieCreditsResp: action.payload,
                error: undefined
            }
        },

        fetchMovieCreditsFailure: (state, action) => {
            return {
                loading: false,
                movieCreditsResp: null,
                error: action.payload
            }
        }
    },
})

export const {fetchMovieCreditsRequest, fetchMovieCreditsSuccess, fetchMovieCreditsFailure} = MovieCreditsSlice.actions

const fetchMovieCredits = (id) => {
    return async (dispatch) => {
        dispatch(fetchMovieCreditsRequest())
        await getMovieCredits(id)
            .then(response => {
                dispatch(fetchMovieCreditsSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchMovieCreditsFailure(error.message))
            });
    }
}
export {fetchMovieCredits}

export default MovieCreditsSlice.reducer