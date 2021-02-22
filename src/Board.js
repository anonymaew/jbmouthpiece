import React,{useState,useEffect} from 'react'
import {Route,Switch} from 'react-router-dom'

import BoardPost from './BoardPost'
import PostPage from './PostPage'

export default function Catalog({dtb,user}) {
    
    const [psl,setps]=useState([])
    const [ssmt,setssmt]=useState([])
    const [ssw,setssw]=useState(-216)
  
    useEffect(()=>{
      dtb.collection("board").get().then((data)=>{
        let lis=[]
        data.forEach((i)=>{
          if(i.data().name!=="null") lis.push({id:i.id,...i.data()})
        })
        setps(()=>lis)
        setssmt(["Tt"])
      })
      .catch((e)=>{alert(e.message); setps(()=>[])})
    },[])

    useEffect(()=>{
      let sort=ssmt[0];
      setps((l)=>{
        let li=[...l]

        li.sort((a,b)=>{
          if(sort==="tT") return a.timeEpoch-b.timeEpoch;
          else if(sort==="Tt") return b.timeEpoch-a.timeEpoch;
        })

        return li;
      })
    },[ssmt])
  
    function addPost(e){
        let td=new Date().toString().split(" ");
        let tds=td[2]+" "+td[1]+" "+td[3]+" "+td[4]
        let newOb={
            name:e.target.name.value,
            img:"",
            time:tds,
            timeEpoch:Date.now(),
            description:"ไม่มีคำอธิบาย"
        }
      dtb.collection("board").add(newOb).then((ref)=>{
        newOb.id=ref.id;
        setps((l)=>{return [...l,newOb]})
        setssmt(i=>[...i])
        console.log("save at "+ref.id);
      })
      .catch((e)=>alert(e.message))
    }
  
    function deletePost(id){
      if(!window.confirm("Are you sure you want to delete this post?")) return;
      dtb.collection("board").doc(id).delete()
      .then(()=>{
        //cannot delete the folder?
        //str.ref().child('catalog/'+id).delete().then(sn=>{
          setps((l)=>{
            let li=[...l],iin;
            for(let i=0;i<li.length;i++) if(li[i].id===id) iin=i;
            li.splice(iin,1)
            return li
          })
          console.log("deleted");
        //})
        //.catch(e=>alert(e.message))
      })
      .catch(e=>alert(e.message))
    }
  
    return (
          <Switch>
            <Route exact path="/posts">
            <div className="menu sortsieve" style={{left:ssw+"px"}}>
              <div>
                <a href="javascript:void(0)" className="close" onClick={()=>setssw(-216)}>X</a>
              </div>
              <p>เรียงโพสต์จาก:</p>
              <select onChange={(e)=>setssmt(i=>{
                let j=[...i]
                j[0]=e.target.value;
                return j;
              })}>
                <option value="Tt" defaultValue>โพสต์ล่าสุดก่อน</option>
                <option value="tT">โพสต์เก่าสุดก่อน</option>
              </select>
            </div>
          <div style={{marginTop:"72px",marginLeft:"24px"}}>
            <a href="javascript:void(0)" onClick={()=>setssw(0)}><button className="btn1">{'>>'} ตัวเลือก</button></a>
          </div>
            <div className="shrink">
              {psl.map(i=>{
                return <BoardPost key={i.id} user={user} data={i} del={deletePost}/>
              })}
            </div>
            {
              (user!=="") ? 
                <>
                <br/>
                  <form onSubmit={(e)=>{e.preventDefault();addPost(e);}}>
                    <p>โพสต์ใหม่</p>
                    <input type="text" name="name" placeholder="head"></input>
                    <button>add</button>
                  </form>
                </> : <></>
            }
            </Route>
        {psl.map(i=>
          <Route path={"/posts/"+i.id}>
            <PostPage key={i.id} dtb={dtb} id={i.id} user={user}/>
          </Route>
        )}
        </Switch>
    );
}