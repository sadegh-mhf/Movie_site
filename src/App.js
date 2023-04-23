import Header from "./components/Header/Header.component";
import './assets/styles/global.scss'
import {Home} from "./pages";
import {Provider} from 'react-redux';
import {store} from './store/store';
import {AppRoute} from "./routes/App.route";


function App() {
  return (
    <div>
        <Provider store={store}>
            <AppRoute/>
        </Provider>
    </div>
  );
}

export default App;
