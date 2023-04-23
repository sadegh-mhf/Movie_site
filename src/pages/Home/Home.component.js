import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header.component";
import MovieCard from "../../components/MovieCard/MovieCard.component";
import {useSelector, useDispatch} from 'react-redux';
import {fetchMoviesList} from "../../store/slices/movies_list.slice";
import styles from './Home.module.scss'
import 'assets/styles/global.scss'
import {fetchMoviesGenres} from "../../store/slices/movies_genres.slice";
import {Button, Divider} from "@mui/material";
import {INITIAL_END_DATE, INITIAL_START_DATE, ITEMS_PER_PAGE} from "../../configs/variables.config";
import dayjs from "dayjs";

const Home = () => {

    const dispatch = useDispatch()

    const moviesList = useSelector((state) => state.MoviesList)
    const moviesGenres = useSelector((state) => state.MoviesGenres)

    const [allMoviesGenres, setAllMoviesGenres] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [releaseDate, setReleaseDate] = useState([dayjs(INITIAL_START_DATE).format('YYYY-MM-DD'), dayjs(INITIAL_END_DATE).format('YYYY-MM-DD')])

    useEffect(() => {
        dispatch(fetchMoviesGenres())
    }, [])

    useEffect(() => {
        setAllMoviesGenres(moviesGenres.moviesGenresResp?.genres)
    }, [moviesGenres])

    const handleNextPage = () => {
        if (currentPage < moviesList.moviesListResp?.total_pages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    useEffect(() => {
        dispatch(fetchMoviesList(currentPage, releaseDate[0], releaseDate[1]))
    }, [currentPage])


    const handleChangeDateRage = (range) => {
        const releaseDateRange = range.map(date => dayjs(date.$d).format('YYYY-MM-DD'))
        setReleaseDate(releaseDateRange)
    }

    const handleSearchByDateRange = () => {
        dispatch(fetchMoviesList(1, releaseDate[0], releaseDate[1]))
        setCurrentPage(1)
    }

    const genresCreator = (movie) => {
        const fullGenres = []
        if (!!allMoviesGenres) {
            movie.genre_ids.forEach(id => {
                allMoviesGenres.forEach(genre => {
                    if (id === genre.id) {
                        fullGenres.push(genre.name)
                    }
                })
            })
        }
        return fullGenres
    }

    return (
        <div style={{width: '100%'}}>
            <Header mode={'home'} handleChangeDateRage={handleChangeDateRage}
                    handleSearchByDateRange={handleSearchByDateRange}/>
            <div className={'container'}>
                <div className={styles.movies}>

                    {
                        moviesList.moviesListResp?.results?.map(movie => <MovieCard key={movie.id} data={movie}
                                                                                    genres={genresCreator(movie)}/>)
                    }
                </div>
                <section className={styles.footer}>
                    <div className={styles.pagination}>
                        <Button variant="text"
                                sx={{
                                    color: 'black',
                                    opacity: '60%',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    textTransform: "none"
                                }}
                                onClick={handlePrevPage}>Previous page</Button>
                        <Divider orientation="vertical" variant="middle" flexItem
                                 sx={{borderColor: '#6A6A6A'}}/>
                        <Button variant="text"
                                sx={{color: '#318FE7', fontSize: '16px', fontWeight: '700', textTransform: "none"}}
                                onClick={handleNextPage}>Next page</Button>
                    </div>
                    <div className={styles.page_info}>
                        <span>page: {moviesList.moviesListResp?.page && moviesList.moviesListResp?.page}</span>
                        <span>Showing results: {moviesList.moviesListResp?.page && (moviesList.moviesListResp?.page - 1) * ITEMS_PER_PAGE + 1} - {moviesList.moviesListResp?.page && (+(moviesList.moviesListResp?.page - 1) * ITEMS_PER_PAGE + +moviesList.moviesListResp?.results.length)}</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export {Home};