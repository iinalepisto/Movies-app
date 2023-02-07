import React from 'react'
import { useState, useEffect } from 'react';
import { TextField, Tabs, Tab } from "@material-ui/core";
import "./searching.scss";
import Card from "../../components/card/Card";
import axios from 'axios';
import useDebounceValue from "../../hooks/useDebounceValue";
import { Link } from 'react-router-dom';

const Searching = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [text, setText] = useState("");
    const [content, setContent] = useState();
    const debounceValue = useDebounceValue(text);

    const getSearch = async () => {
        const { data } = await axios.get(`api/${type ? "tv" : "movie"}/search?title=${text}`);
        setContent(data.results);
    }

    useEffect(() => {
        getSearch();
    }, [type, debounceValue])
    console.log(debounceValue);

    return (
        <div>
            <div className='searching'>
                <TextField
                    style={{ flex: 1 }}
                    className="searchInput"
                    label="Search"
                    onChange={(event) => setText(event.target.value)}
                />

            </div >
            <Tabs className='options'
                value={type}
                onChange={(event, newValue) => {
                    setType(newValue)
                    setPage(1);
                }}>
                <Tab className='t' style={{ width: "50%" }} label={"Search Movies"} />
                <Tab className='t' style={{ width: "50%" }} label={"Search TV shows"} />
            </Tabs>

            <div className='cards'>

                {content && content.map((movie) =>
                    <Link key={movie.id} to={`/find/${movie.id}`} style={{ textDecoration: 'none' }} state={movie}>
                        <Card key={movie.id}
                            id={movie.id}
                            poster={movie.poster_path}
                            title={movie.title || movie.name}
                            date={movie.first_air_date || movie.release_date}
                            media_type={type ? "tv" : "movie"} />
                    </Link>)}
            </div>

        </div >
    )
}

export default Searching