import React, { useRef, useCallback } from 'react';
import Card from '../../components/card/Card';
//import "./series.scss";
import "../../components/card/card.scss";
import { useInfiniteQuery } from 'react-query';
import { getSeries } from '../../api/axiosApi';
import { Link } from 'react-router-dom';

const Series = () => {
    const { data,
        isloading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        error,
        status
    } = useInfiniteQuery(
        'series', ({ pageParam = 1 }) => getSeries(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    const intObserver = useRef();

    const lastSeriesRef = useCallback(series => {
        if (isFetchingNextPage) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(movies => {
            if (movies[0].isIntersecting && hasNextPage) {
                console.log('We are near the last post!')
                fetchNextPage()
            }
        })

        if (series) intObserver.current.observe(series)
    }, [isFetchingNextPage, fetchNextPage, hasNextPage])

    if (status === 'error') return <p className='center'>Error: {error.message}</p>

    const content = data?.pages.map(pg => {
        return pg.map((series, i) => {
            if (pg.length === i + 1) {
                return <Link key={series.id} to={`/find/${series.id}`} style={{ textDecoration: 'none' }} state={series}><Card ref={lastSeriesRef} key={series.id} title={series.name} poster={series.poster_path} date={series.first_air_date || series.release_date} /></Link>
            }
            return <Link key={series.id} to={`/find/${series.id}`} style={{ textDecoration: 'none' }} state={series}><Card key={series.id} title={series.name} poster={series.poster_path} date={series.first_air_date || series.release_date} /></Link>
        })
    })

    return (
        <div className='cards'>
            {content}
        </div>
    )
}

export default Series