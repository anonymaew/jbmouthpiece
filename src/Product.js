import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

import Tag from './Tag'

export default function Product({dtb,user,str,id}) {

  const [data,setdata]=useState()
  const [tgl,settg]=useState()
  const [ld,setld]=useState(0)

  const [img,setimg]=useState(()=>[])
  const [pi,setpi]=useState(0)
  const [dct,setdct]=useState("")
  const [clip,setclip]=useState([])

  useEffect(()=>{
    dtb.collection("catalog").doc(id).get().then((data)=>{
      setdata(data.data())
      setld(i=>i+1)
      setdct(data.data().description)
      setclip(data.data().clip)
    })
    .catch((e)=>{alert(e.message); setdata()})

    
    dtb.collection("tag").get().then((data)=>{
      let lis=[]
      data.forEach((i)=>{
        if(i.data().name!=="null") lis.push({id:i.id,...i.data()})
      })
      settg(()=>lis)
      setld(i=>i+1)
    })
    .catch((e)=>{alert(e.message); settg(()=>[])})
  },[])

  useEffect(()=>{
    if(data==null || img==null) return;
    if(img.length==0 && data.img!=0){
        for(let i=0;i<data.img;i++)
        str.ref().child("catalog/"+id+"/"+((i<10)?"0":"")+i+"_360x360.jpg").getDownloadURL().then((url)=>{setimg(ol=>[...ol,url])})
        .catch(e=>alert(e.message))
    }
  },[data])

  function save(e){
    let lis=[]
    for(let ti of tgl) if(e.target[ti.id].checked) lis.push(ti.id)
    let newOb={
      id:id,
      name:e.target.name.value,
      price:e.target.price.value,
      sale:e.target.sale.value,
      oos:e.target.oos.checked,
      tag:lis,
      img:data.img,
      description:dct,
      clip:clip
    }
    dtb.collection("catalog").doc(id).set(newOb)
    .then(()=>{
      setdata(newOb)
      console.log("updated");
    })
    .catch((e)=>alert(e.message))
  }

  function addimg(e){
    str.ref().child('catalog/'+id+'/'+((data.img<10)?"0":"")+data.img+".jpg").put(e.target.files[0]).then(sn=>{
      dtb.collection("catalog").doc(id).update({img:1+data.img}).then(rs=>{
        setdata(i=>{
          let j=i;
          j.img=1+i.img;
          return j;
        })
        if(window.confirm("Image uploaded (press OK to refresh and see the result)")) window.location.reload(true);
      })
      .catch(e=>alert(e.message))
    })
    .catch(e=>alert(e.message))
  }

  function delimg(){
    if(data.img==0) return;
    str.ref().child('catalog/'+id+'/'+((data.img-1<10)?"0":"")+(+data.img-1)+"_360x360.jpg").delete().then(sn=>{
      dtb.collection("catalog").doc(id).update({img:-1+data.img}).then(rs=>{
        setdata(i=>{
          let j=i;
          j.img=-1+i.img;
          return j;
        })
        if(window.confirm("Image deleted (press OK to refresh and see the result)")) window.location.reload(true);
      })
      .catch(e=>alert(e.message))
    })
    .catch(e=>alert(e.message))
  }

  function addclip(e){
    let li=e.target.cliplink.value.replace("watch?v=","").split("/");
    let ar=[...clip,li[li.length-1]];
    dtb.collection("catalog").doc(id).update({clip:ar}).then(rs=>{
      setclip(ar);
    })
    .catch(e=>alert(e.message))
  }

  function delclip(li){
    let ar=[];
    for(let i=0;i<clip.length;i++) if(clip[i]!=li) ar.push(clip[i]);
    dtb.collection("catalog").doc(id).update({clip:ar}).then(rs=>{
      setclip(ar);
    })
    .catch(e=>alert(e.message))
  }

  function editdct(e){
    dtb.collection("catalog").doc(id).update({description:e.target.dctbox.value}).then(rs=>{
      setdct(e.target.dctbox.value)
    })
    .catch(e=>alert(e.message))
  }

    return (
        (ld>=2) ?
          <div style={{display:(ld>2 || data.img==0)?"block":"none"}}>
            <div style={{marginTop:"72px"}}>
              <Link to="/products" className="option">กลับสู่หน้าสินค้า</Link>
            </div>
            <br/>
            <div className="product">
              <div className="productImg">
                {(data.img==0) ? <img src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/catalog%2Fblank_240x240.jpg?alt=media&token=fa078eba-97ef-425f-8f41-c1801a79b662"></img> :
                (img!=null) ? img.map(i=><img src={i} style={{display:(i==img[pi])?"":"none"}} onLoad={()=>setld(i=>i+1)}></img>) : <></>}
                <a className="imgPrev" onClick={()=>{if(img.length==1) return; setpi(i=>(i+img.length-1)%img.length)}}>&#10094;</a>
                <a className="imgNext" onClick={()=>{if(img.length==1) return; setpi(i=>(i+1)%img.length)}}>&#10095;</a>
                <div className="dotList">
                {
                  img.map(i=>{return <span className="dot" style={{backgroundColor:(i==img[pi])?"#cfb991":"#ccc"}}></span>})
                }
                </div>
              </div>
              <div className="productDetail">
                <p className="productName">{data.name}</p>
                <div className="productPriceContainer">
                  <p className="productPrice" style={(data.sale==="" && !data.oos)?{}:{textDecoration:"line-through"}}>{data.price+" บาท"}</p>
                  {(data.sale==="" || data.oos)?<></>:<p className="productSale">{data.sale+" บาท ("+((+data.sale-data.price)*100/+data.price).toFixed()+"%)"}</p>}
                  {(data.oos)?<p className="productOos">{(data.oos)?"สินค้าหมด":""}</p>:<></>}
                </div>
                <br/>
                <p style={{fontSize:"small"}}>ประเภท:</p>
                {data.tag.map(ti=>{
                  for(let li=0;li<tgl.length;li++) if(ti===tgl[li].id)
                  return <Tag key={ti} data={tgl[li]}/>
                })}
                <br/><br/>
                {
                  (user!=="") ?
                    <>
                      <input type="file" accept="image/*" onChange={e=>{addimg(e)}}></input><br/>
                      <button onClick={()=>delimg()}>del img</button>
                      <form onSubmit={(e)=>{e.preventDefault();save(e);}}>
                        <input type="text" name="name" defaultValue={data.name}></input><br/>
                        <input type="number" name="price" defaultValue={data.price}></input><br/>
                        <input type="number" name="sale" defaultValue={data.sale}></input><br/>
                        <label htmlFor="oos">สินค้าหมด</label>
                        <input type="checkbox" name="oos" defaultChecked={data.oos}></input><br/>
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
                      </form>
                    </>
                    : <a href="https://www.facebook.com/jbhuri/" target="_blank"><button className="btn2" id="contactBtn">ติดต่อผู้ขาย</button></a>
                }
              </div>
              
            </div>
            <br/>
            <div id="productDescription">
              <h3>คำอธิบาย:</h3>
              <p id="productText">{dct}</p>
              {
                clip.map(i=>{
                  return <>
                    <iframe src={"https://www.youtube.com/embed/"+i} frameBorder="0"></iframe>
                    {(user!=="")?<button onClick={(e)=>{e.preventDefault(); delclip(i)}}>del</button>:<></>}
                  </>
                })
              }
              {
                (user!=="") ?
                <>
                  <form onSubmit={(e)=>{e.preventDefault();editdct(e);}}>
                    <textarea name="dctbox" id="" cols="80" rows="10" defaultValue={dct}></textarea>
                    <input type="submit" value="save"></input>
                  </form>
                  <form onSubmit={(e)=>{e.preventDefault();addclip(e);}}>
                    <input type="text" name="cliplink" placeholder="youtube link"></input><br/>
                    <input type="submit" value="add"></input>
                  </form>
                </> : <></>
              }
            </div>
            <div style={{height:"120px"}}></div>
          </div>: <></>
      )
}
