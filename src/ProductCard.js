import React,{useState,useEffect} from 'react'
import {Route,BrowserRouter as Router,Link,Switch} from 'react-router-dom'

import Tag from './Tag'

export default function ProductCard({data,user,str,tgl,del}) {

  const [img,setimg]=useState(()=>{
    str.ref().child("catalog/"+data.id+"/00_240x240.jpg").getDownloadURL().then((url)=>{setimg(url)})
    .catch(e=>setimg("https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/catalog%2Fblank_240x240.jpg?alt=media&token=fa078eba-97ef-425f-8f41-c1801a79b662"))
  })
    return (
        <div className="productCard" key={data.id}>
            <Link to={"/products/"+data.id}>
            <img src={img}></img>
            <p className="productName">{data.name}</p>
            </Link>
            <span className="productPrice" style={(data.sale==="" && !data.oos)?{}:{textDecoration:"line-through"}}>{data.price+" บาท"}</span>
            {(data.sale==="" || data.oos)?<></>:<span className="productSale">{data.sale+" บาท ("+((+data.sale-data.price)*100/+data.price).toFixed()+"%)"}</span>}
            {(data.oos)?<span className="productOos">{(data.oos)?"สินค้าหมด":""}</span>:<></>}
            <br/><br/>
            <p style={{fontSize:"small"}}>ประเภท:</p>
            {data.tag.map(ti=>{
              for(let li=0;li<tgl.length;li++) if(ti===tgl[li].id)
              return <Tag key={ti} data={tgl[li]}/>
            })}
            <br/>
            {
              (user!=="") ?
                  <button type="button" onClick={()=>del(data.id)}>del</button>
                : <></>
            }
        </div>
        )
}
