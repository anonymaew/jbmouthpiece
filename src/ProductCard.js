import React from 'react'

import Tag from './Tag'

export default function ProductCard({data,user,tgl,save,del}) {
    return (
        <div className="productCard" key={data.id}>
            <p className="productName">{data.name}</p>
            <span className="productPrice" style={(data.sale==="" && !data.oos)?{}:{textDecoration:"line-through"}}>{data.price+" บาท"}</span>
            {(data.sale==="" || data.oos)?<></>:<span className="productSale">{data.sale+" บาท ("+((+data.sale-data.price)*100/+data.price).toFixed()+"%)"}</span>}
            {(data.oos)?<span className="productOos">{(data.oos)?"สินค้าหมด":""}</span>:<></>}
            <br></br>
            {data.tag.map(ti=>{
              for(let li=0;li<tgl.length;li++) if(ti===tgl[li].id)
              return <Tag key={ti} data={tgl[li]}/>
            })}
            {
              (user!=="") ?
                <form onSubmit={(e)=>{e.preventDefault();save(e);}}>
                  <input type="text" name="id" value={data.id} style={{display:"none"}} readOnly></input>
                  <input type="checkbox" name="visible" checked={data.visible} style={{display:"none"}} readOnly></input>
                  <input type="text" name="name" defaultValue={data.name}></input>
                  <input type="number" name="price" defaultValue={data.price}></input>
                  <input type="number" name="sale" defaultValue={data.sale}></input><br></br>
                  <label htmlFor="oos">สินค้าหมด</label>
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
                : <></>
            }
        </div>
        )
}
