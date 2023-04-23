import { createSlice } from '@reduxjs/toolkit';

import {getMovieDetail} from "../../api/getData";

const initialState = {
    loading: false,
    movieDetailResp: null,
    error: undefined
}

export const MovieDetailSlice = createSlice({
    name: 'movie detail',
    initialState,
    reducers: {
        fetchMovieDetailRequest: () => {
            return {
                loading: true,
                movieDetailResp: null,
                error: undefined
            }
        },
        fetchMovieDetailSuccess: (state, action) => {
            return {
                loading: false,
                movieDetailResp: action.payload,
                error: undefined
            }
        },

        fetchMovieDetailFailure: (state, action) => {
            return {
                loading: false,
                movieDetailResp: null,
                error: action.payload
            }
        }
    },
})

export const {fetchMovieDetailRequest, fetchMovieDetailSuccess, fetchMovieDetailFailure} = MovieDetailSlice.actions

const fetchMovieDetail = (id) => {
    return async (dispatch) => {
        dispatch(fetchMovieDetailRequest())
        await getMovieDetail(id)
            .then(response => {
                dispatch(fetchMovieDetailSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchMovieDetailFailure(error.message))
            });
    }
}
export {fetchMovieDetail}

export default MovieDetailSlice.reducer