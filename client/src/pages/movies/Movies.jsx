import React, { useRef, useCallback } from 'react';
import Card from "../../components/card/Card";
import "../../components/card/card.scss";
import "./movies.scss";
import { useInfiniteQuery } from 'react-query';
import { getMoviesPage } from '../../api/axiosApi';
import { Link } from 'react-router-dom';

const Movies = () => {
    const { data,
        isloading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        error,
        status
    } = useInfiniteQuery(
        'movie', ({ pageParam = 1 }) => getMoviesPage(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    const intObserver = useRef();

    const lastMovieRef = useCallback(movie => {
        if (isFetchingNextPage) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(movies => {
            if (movies[0].isIntersecting && hasNextPage) {
                fetchNextPage()
            }
        })

        if (movie) intObserver.current.observe(movie)
    }, [isFetchingNextPage, fetchNextPage, hasNextPage])

    if (status === 'error') return <p className='center'>Error: {error.message}</p>

    const content = data?.pages.map(pg => {
        return pg.map((movie, i) => {
            if (pg.length === i + 1) {
                return <Link key={movie.id} to={`/find/${movie.id}`} style={{ textDecoration: 'none' }} state={movie}><Card ref={lastMovieRef} key={movie.id} title={movie.title} poster={movie.poster_path} date={movie.first_air_date || movie.release_date} /></Link>
            }
            return <Link key={movie.id} to={`/find/${movie.id}`} style={{ textDecoration: 'none' }} state={movie}> <Card key={movie.id} title={movie.title} poster={movie.poster_path} date={movie.first_air_date || movie.release_date} /></Link>
        })
    })

    return (
        <div className='cards'>
            {content}
        </div>
    )
}

export default Movies