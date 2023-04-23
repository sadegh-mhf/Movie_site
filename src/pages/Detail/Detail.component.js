import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovieDetail} from "../../store/slices/movie_detail.slice";
import {useParams} from "react-router-dom";
import Header from "../../components/Header/Header.component";
import styles from './Detail.module.scss'
import Link from '@mui/material/Link';
import {fetchMovieCredits} from "../../store/slices/movie_credits.slice";
import {Rating} from "@mui/material";
import {IMAGE_QUALITY, IMAGE_URL_HOST} from "../../configs/variables.config";

const Detail = () => {

    const {movieId} = useParams()

    const dispatch = useDispatch()
    const movieDetail = useSelector((state) => state.MovieDetail.movieDetailResp)
    const movieCredits = useSelector((state) => state.MovieCredits.movieCreditsResp)

    const [popularCast, setPopularCast] = useState([])

    useEffect(() => {
        dispatch(fetchMovieDetail(movieId))
        dispatch(fetchMovieCredits(movieId))
    }, [])


    useEffect(() => {
        Object.freeze(movieCredits?.cast);
        movieCredits?.cast.slice()
        const castCopy = movieCredits?.cast.slice();
        const sortedCasts = castCopy?.sort((a, b) => {
            return b.popularity - a.popularity;
        });
        const castName = sortedCasts?.map(item => item.name);
        setPopularCast(castName?.slice(0, 10))

    }, [movieCredits])

    const RunTimeFormatter = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`
    }

    const genresCreator = (movie) => {
        let result = movie?.genres.map(genre => genre?.name);
        return result?.join(', ')
    }

    const movieParams = [
        {
            title: 'Budget',
            type: 'string',
            value: `$ ${new Intl.NumberFormat().format(movieDetail?.budget)}`
        }, {
            title: 'Revenue',
            type: 'string',
            value: `$ ${new Intl.NumberFormat().format(movieDetail?.revenue)}`
        }, {
            title: 'Release Date',
            type: 'string',
            value: `${movieDetail?.release_date}`
        }, {
            title: 'Runtime',
            type: 'string',
            value: RunTimeFormatter(movieDetail?.runtime)
        }, {
            title: 'Score',
            type: 'string',
            value: `${movieDetail?.vote_average.toFixed(1)} (${movieDetail?.vote_count} votes)`
        }, {
            title: 'Genres',
            type: 'string',
            value: genresCreator(movieDetail)
        }, {
            title: 'IMDB Link',
            type: 'link',
            value: '#'
        }, {
            title: 'Homepage Link',
            type: 'link',
            value: '#'
        },
    ]

    return (
        <div>
            <Header mode={'detail'}/>
            <div className={'container'}>
                <div className={styles.movie_details}>
                    <div className={styles.movie_details__main}>
                        <div className={styles.movie_details__main__poster}>
                            <img src={`${IMAGE_URL_HOST}${IMAGE_QUALITY}${movieDetail?.backdrop_path}`} alt=""/>
                        </div>
                        <div className={styles.movie_details__main__info}>
                            {
                                movieParams.map(param =>
                                    <div className={styles.info_item}>
                                        <span className={styles.info_item__title}>{param.title}</span>
                                        {
                                            param.type === 'string' ?
                                                <div className={styles.info_item__value}>
                                                    {param.title === 'Score' && <Rating name="half-rating-read"
                                                                                        value={+movieDetail?.vote_average.toFixed(1) / 2}
                                                                                        precision={0.25} readOnly/>}
                                                    <span>{param.value}</span>
                                                </div>

                                                :
                                                <Link href="#">Link</Link>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <p className={styles.movie_details__overview}>
                        {movieDetail?.overview}
                    </p>
                    <div className={styles.movie_details__credits}>
                        <span>Credits:</span>
                        <p>{popularCast?.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Detail};