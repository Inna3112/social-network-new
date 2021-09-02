import React, {useState} from 'react';
import s from './Paginator.module.css'
import cn from 'classnames'


type PropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage,
                                          onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    const prevBtnHandler = () => {
        setPortionNumber(portionNumber - 1)
    }
    const nextBtnHandler = () => {
        setPortionNumber(portionNumber + 1)
    }
    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
            <button className={s.prevBtn} onClick={prevBtnHandler}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber - 1 && p <= rightPortionPageNumber + 1)
                .map((p, index) => {
                    return <span key={index}
                                 className={cn({
                                     [s.selectedPage] : currentPage === p
                                 }, s.page)}
                                 // className={currentPage === p ? `${s.selectedPage} ${s.page}` : s.page}
                                 onClick={(e) => {
                                     onPageChanged(p)
                                 }}
                    >{p}</span>
                })}
            {portionCount > portionNumber &&
            <button className={s.nextBtn} onClick={nextBtnHandler}>NEXT</button>}
        </div>
    )
}

export default Paginator