import React from 'react';
import {Provider} from 'react-redux';

import css from './App.module.css';
import './App.css';
import store from './redux/store';
import {Header} from './components/Header';
import {GameBoard} from './components/GameBoard';


function App() {
    return (
        <Provider store={store}>
            <section className={css.site}>
                <Header/>
                <GameBoard/>
            </section>
        </Provider>
    );
}

export default App;
