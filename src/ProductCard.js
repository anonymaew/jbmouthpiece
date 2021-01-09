import React from 'react'

import Tag from './Tag'

export default function ProductCard({data,user,tgl,save,del}) {
    return (
        <div className="productCard" key={data.id}>
            <h2 className="productName"><b>{data.name}</b></h2>
            <span className="productPrice">{((isNaN(data.sale) || data.sale==="") && !data.oos)?<>{data.price+" THB"}</>:<s>{data.price+" THB"}</s>}</span>
            <span className="productSale">{((isNaN(data.sale) || data.sale==="") || data.oos)?<></>:<>{data.sale+" THB ("+((+data.sale-data.price)*100/+data.price).toFixed()+"%)"}</>}</span>
            <span className="productOos">{(data.oos)?"out of stock":""}</span><br></br>
            {data.tag.map(ti=>{
              for(let li=0;li<tgl.length;li++) if(ti===tgl[li].id)
              return <span key={ti} className="tag" style={{backgroundColor:tgl[li].color}}>{tgl[li].name}</span>
            })}
          <form style={{display:(user==="")?"none":"block"}} onSubmit={(e)=>{e.preventDefault();save(e);}}>
            <input type="text" name="id" value={data.id} style={{display:"none"}} readOnly></input>
            <input type="text" name="name" defaultValue={data.name}></input>
            <input type="number" name="price" defaultValue={data.price}></input>
            <input type="number" name="sale" defaultValue={data.sale}></input><br></br>
            <label htmlFor="oos">out of stock</label>
            <input type="checkbox" name="oos" defaultChecked={data.oos}></input><br></br>
            {tgl.map(ti=>{
                return(
                    <div key={ti.id}>
                        <input key={ti.id} type="checkbox" name={ti.id} defaultChecked={data.tag.includes(ti.id)}></input>
                        <Tag data={ti}/><br></br>
                    </div>
                )
            })}
            <br></br>
            <input type="submit" value="save"></input>
            <button type="button" onClick={()=>del(data.id)}>del</button>
          </form>
        </div>
        )
}
