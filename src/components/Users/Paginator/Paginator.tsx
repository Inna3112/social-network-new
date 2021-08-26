import React from 'react';
import s from './Paginator.module.css'


type PropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (page: number) => void
}

let Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map((p, index) => {
                return <span key={index}
                             className={currentPage === p ? `${s.selectedPage} ${s.page}` : s.page}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}
                >{p}</span>
            })}
        </div>
    )
}

export default Paginator