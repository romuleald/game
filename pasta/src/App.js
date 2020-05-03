import React from 'react';
import logo from './logo.svg';
import css from './App.module.css';
import {Pasta} from './components/Pasta';

function App() {
    return (
        <section className={css.site}>
            <header className={css.header}>
                <img src={logo} className={css.headerLogo} alt="logo"/>
                <div>counter</div>
            </header>
            <section className={css.game}>
                <Pasta></Pasta>
            </section>
        </section>
    );
}

export default App;
