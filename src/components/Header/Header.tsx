import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import s  from './Header.module.css';

type PropsType = {
    login: string
    isAuth: boolean
}
const Header = ({login, isAuth}: PropsType) => {
    return (
        <header className={s.header}>
            <img src={logo}  />
            <div className={s.loginBlock}>
                {isAuth
                    ? login
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;