import React, {useState} from 'react';
import styles from './Header.module.scss';
import '../../assets/styles/global.scss'
import {Button} from "@mui/material";
import DateRangePicker from "../DateRangePicker/DateRangePicker.component";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = ({mode, handleChangeDateRage, handleSearchByDateRange}) => {
    const navigate = useNavigate();
    const movieDetail = useSelector((state) => state.MovieDetail.movieDetailResp)

    const handleReturn = () => {
        navigate(-1)
    }

    return (
        <header className={styles.header}>
            <div className={styles.strip}>
            </div>
            <div className={'container'}>
                <div className={styles.header_box}>
                    {
                        mode === 'home' ?
                            <>
                                <div className={styles.header_box__home}>
                                    <span className={styles.release}>Search by release date:</span>
                                    <DateRangePicker handleChangeDateRage={handleChangeDateRage}/>
                                </div>
                                <Button variant="contained"
                                        disableElevation
                                        sx={{borderRadius: '100px', textTransform: "none"}}
                                        onClick={handleSearchByDateRange}
                                >
                                    Search
                                </Button>
                            </> :
                            <div className={styles.header_box__detail}>

                                <Button variant="contained"
                                        disableElevation
                                        sx={{borderRadius: '100px', textTransform: "none"}}
                                        startIcon={<KeyboardBackspaceIcon/>}
                                        onClick={handleReturn}
                                >
                                    Back
                                </Button>
                                <div className={styles.header_box__detail__tag_title}>
                                    <h4>{movieDetail?.title}</h4>
                                    <span>{movieDetail?.tagline}</span>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;