import React from 'react'

export default function Tag({data}) {
    return (
        <span className="tag" style={{backgroundColor:data.color}}>{data.name}
            <span className="description">{data.description}</span>
        </span>
    )
}
