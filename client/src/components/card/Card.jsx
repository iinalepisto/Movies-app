import { img200 } from "../../config/config";
import "./card.scss";
import React from 'react'

const Card = React.forwardRef(({ id, poster, title, date, media_type }, ref) => {
    const body = (
        <>
            <img className="poster" src={`${img200}/${poster}`} alt="" />
            <b className="title">{title}</b>
        </>
    )

    const content = ref
        ? <div className="card" ref={ref} key={id}>{body}</div>
        : <div className="card" key={id}>{body}</div>

    return content

})

export default Card