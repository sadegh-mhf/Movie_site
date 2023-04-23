import {Component} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';
import * as Page from 'pages';

class AppRoute extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={PATHS.HOME} element={<Page.Home/>}/>
                    <Route path={PATHS.DETAIL} element={<Page.Detail/>}/>
                    <Route path="/" element={<Navigate to={PATHS.HOME}/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export {AppRoute};
