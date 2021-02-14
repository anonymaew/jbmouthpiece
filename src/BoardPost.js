import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

import Tag from './Tag'

export default function BoardPost({data,user,del}) {

    return (
        <div className="card postCard" key={data.id}>
            <Link to={"/posts/"+data.id}>
            <p className="productName shadowText">{data.name}</p>
            </Link>
            <p className="postDate">&emsp;{"โพสต์เมื่อ "+data.time}</p>
            <div className="postBrief">{data.description}</div>
            {
              (user!=="") ?
                  <button type="button" onClick={()=>del(data.id)}>del</button>
                : <></>
            }
        </div>
        )
}
