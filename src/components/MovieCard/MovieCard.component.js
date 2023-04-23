import React from 'react';
import styles from './MovieCard.module.scss';
import '../../assets/styles/global.scss';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {useNavigate} from 'react-router-dom';
import {IMAGE_QUALITY, IMAGE_URL_HOST} from "../../configs/variables.config";


const MovieCard = ({data, genres}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/movie-detail/${data.id}`);
    }

    return (
        <div className={styles.card} onClick={handleNavigate}>
            <div className={styles.card__poster}>
                <img src={`${IMAGE_URL_HOST}${IMAGE_QUALITY}${data?.backdrop_path}`} alt=""/>
            </div>
            <div className={styles.card__info}>
                <h4 className={styles.card__info__title}>{data?.title}</h4>

                <div className={styles.card__info__exp}>
                    <div className={styles.card__info__exp__date}>
                        <CalendarTodayIcon/>
                        <span>{data?.release_date}</span>
                    </div>
                    <div className={styles.card__info__exp__genres}>
                        {
                            genres.map((gen, index) => {
                                return (
                                    <div key={index}>
                                        {
                                            (index > 0 && genres.length !== index) &&
                                            <div className={styles.circle}>

                                            </div>
                                        }
                                        <span>{gen}</span>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;