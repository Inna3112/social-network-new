import React from 'react';
import loader from '../../assets/images/loader.gif';
import s from './Preloader.module.css'

type PropsType = {

}
let Preloader: React.FC<PropsType> = () => {
    return(
        <div >
            <img src={loader}/>
        </div>
    )
}

export default Preloader