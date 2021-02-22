import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

import Tag from './Tag'

export default function ProductCard({data,user,str,tgl,del,hide,fw}) {

  const [img,setimg]=useState(()=>{
    str.ref().child("catalog/"+data.id+"/00_360x360.jpg").getDownloadURL().then((url)=>{
      document.head.insertAdjacentHTML("beforeend", "<style>[id='"+data.id+"']{background-image:url("+url+")}</style>")
      setimg(url)
    })
    .catch(e=>setimg("https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/catalog%2Fblank_240x240.jpg?alt=media"))
  })
  const[ld,setld]=useState(false);

    return (
        <div id={data.id} className={"card "+((fw<0)?"productCard":"productCardFix")} key={data.id} style={{display:(ld)?"block":"none"},{backgroundColor:(data.hide)?"#804000":"",width:((fw<0)?"":fw+"px")}}>
            <Link to={"/products/"+data.id}>
            <img className="productCardImg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fwatermark.png?alt=media" onLoad={()=>{setld(true)}}></img>
            <p className="productName shadowText" style={{marginTop:((ld)?"":"103%")}}>{data.name}</p>
            </Link>
            <span className="productPrice" style={(data.sale==="" && !data.oos)?{}:{textDecoration:"line-through"}}>{data.price+" บาท"}</span>
            {(data.sale==="" || data.oos)?<></>:<span className="productSale">{data.sale+" บาท ("+((+data.sale-data.price)*100/+data.price).toFixed()+"%)"}</span>}
            {(data.oos)?<span className="productOos">{(data.oos)?"สินค้าหมด":""}</span>:<></>}
            <div className="productShortDescription">{data.shortdct}</div>
            <br/>
            <p style={{fontSize:"small"}}>ประเภท:</p>
            {tgl.map(ti=>{
              for(let li=0;li<data.tag.length;li++) if(ti.id===data.tag[li])
              return <Tag key={ti.id} data={ti}/>
            })}
            <br/>
            {
              (user!=="" && fw<0) ?
                <>
                  <button type="button" onClick={()=>hide(data.id,!data.hide)}>{(data.hide)?"unhide":"hide"}</button>
                  <button type="button" onClick={()=>del(data.id)}>del</button>
                </>
                : <></>
            }
        </div>
        )
}
