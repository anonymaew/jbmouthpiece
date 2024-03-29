import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

import Post from './PostBox'

export default function PostPage({dtb,user,id}) {

  const [data,setdata]=useState()
  const [ld,setld]=useState(0)

  useEffect(()=>{
    dtb.collection("board").doc(id).get().then((data)=>{
        print(data.data())
      setdata(data.data())
      setld(i=>i+1)
    })
    .catch((e)=>{alert(e.message); setdata()})
  },[])

  function save(e){
    dtb.collection("board").doc(id).update({name:e.target.name.value,img:e.target.img.value})
    .then(()=>{
      setdata({
          name:e.target.name.value,
          img:e.target.img.value,
          time:data.time,
          timeEpoch:data.timeEpoch,
          description:data.description
        })
      print("updated");
    })
    .catch((e)=>alert(e.message))
  }
  
  function print(t){
    if(user!=="") console.log(t)
  }

    return (
      <>
        <div style={{marginTop:"72px",marginLeft:"24px"}}>
          <Link to="/posts"><button className="btn1">กลับสู่หน้าบอร์ด</button></Link>
        </div>
        <div style={{height:"24px"}}></div>
        {
            (ld>=1) ?
            <>
            <div className={"shrink card postPage "+((ld>=1)?"loaded":"loading")}>
              <div className="postText">
                <p className="productName shadowText">{data.name}</p>
                <p className="postDate">&emsp;{"โพสต์เมื่อ "+data.time}</p>
                <div style={{height:"30px"}}></div>
                {
                  (user!=="") ?
                    <>
                      <form onSubmit={(e)=>{e.preventDefault();save(e);}}>
                        <input type="text" name="name" defaultValue={data.name}></input><br/>
                        <input type="text" name="img" defaultValue={data.img}></input><br/>
                        <input type="submit" value="save"></input>
                      </form>
                    </>
                    : <></>
                }
              </div>
            <Post dtb={dtb.collection("board").doc(id)} admin={user}/>
          </div>
          <div style={{height:"120px"}}></div>
          </> : <h1 style={{marginTop:"120px",textAlign:"center",color:"#ddd"}}> . . Loading . . </h1> 
        }
        
        </>
      )
}
