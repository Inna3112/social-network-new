import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialog.module.css';


type PropsType = {
    name: string
    id: number
}

const Dialog: React.FC <PropsType> = ({id, name}) => {
    let path = '/dialogs/' + id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}

export default Dialog;