import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import s  from './Header.module.css';

type PropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}
const Header = ({login, isAuth, logout}: PropsType) => {

    return (
        <header className={s.header}>
            <img src={logo}  />
            <div className={s.loginBlock}>
                {isAuth
                    ? <div>{login}<button onClick={logout}>log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;