import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

import Post from './PostBox'

export default function PostPage({dtb,user,id}) {

  const [data,setdata]=useState()
  const [ld,setld]=useState(0)

  useEffect(()=>{
    dtb.collection("board").doc(id).get().then((data)=>{
        console.log(data.data())
      setdata(data.data())
      setld(i=>i+1)
    })
    .catch((e)=>{alert(e.message); setdata()})
  },[])

  function save(e){
    dtb.collection("board").doc(id).update({name:e.target.name.value})
    .then(()=>{
      setdata({
          name:e.target.name.value,
          time:data.time,
          timeEpoch:data.timeEpoch,
          description:data.description
        })
      console.log("updated");
    })
    .catch((e)=>alert(e.message))
  }

    return (
      <>
        <div style={{marginTop:"72px"}}>
          <Link to="/posts" className="option">กลับสู่หน้าบอร์ด</Link>
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
