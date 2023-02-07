import React from 'react'
import { useLocation } from 'react-router-dom';
import { imgOriginal } from '../../config/config';
import "./details.scss";

export const Details = () => {

    const location = useLocation();
    const media = location.state;
    return (
        <div className='details'>
            <div className="left">
                <img className="pic" src={`${imgOriginal}/${media.poster_path}`} alt="" />
            </div>
            <div className='right'>
                <div className='top'>
                    <span className="title">{media.title || media.name}</span>
                    <span className="synopsis">{media.overview || media.tagline}</span>
                </div>
                <div className='bottom'>

                </div>

            </div>
        </div>
    )
}

export default Details;