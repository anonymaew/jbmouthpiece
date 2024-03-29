import React,{ useState } from "react";
import {Link} from 'react-router-dom'

export default function Navbar({auth,user}) {

    const [mmw,setmmw]=useState(-216);
    const [amf,setamf]=useState(false)

    function logIn(e){
        e.preventDefault();
        auth.signInWithEmailAndPassword(e.target.user.value+"@napatsc.com",e.target.pass.value)
        .then((u)=>{
            print("log in")
        })
        .catch((e)=>{alert(e.message)})
    }

    function logOut(){
        auth.signOut()
        .then(
            print("log out")
        )
        .catch((e)=>{alert(e.message)})
    }

    function print(t){
      if(user!=="") console.log(t)
    }

    return (
        <>
            <div id="mainmenu" className="menu" style={{left:mmw+"px"}}>
              <div>
                <a href="javascript:void(0)" className="close" onClick={()=>setmmw(-216)}>X</a>
              </div>
              <div style={{height:"64px"}}></div>
                <Link to="/"><div className="menuItem">
                    <p>{"🏠 หน้าหลัก"}</p>
                </div></Link>
                <Link to="/products"><div className="menuItem">
                    <p>{"🛍️ สินค้า"}</p>
                </div></Link>
                <Link to="/posts"><div className="menuItem">
                    <p>{"📰 บอร์ดข้อความ"}</p>
                </div></Link>
                <Link to="/service"><div className="menuItem">
                    <p>{"🛠️ บริการอื่น ๆ"}</p>
                </div></Link>
                <Link to="/about"><div className="menuItem">
                    <p>{"🔍 เกี่ยวกับเรา"}</p>
                </div></Link>
                <a href="javascript:void(0)"  onClick={()=>setamf(i=>!i)}><div className="menuItem">
                    <p>{"👨‍💻 สำหรับผู้ดูแลระบบ"}</p>
                </div></a>
                <div className="admin" style={{display:(amf)?"block":"none"}}>
                    <form style={{display:(user==="")?"block":"none"}} onSubmit={logIn}>
                        <input type="text" name="user" placeholder="username"></input>
                        <input type="password" name="pass" placeholder="password"></input><br></br>
                        <input type="submit" value="log in"></input>
                    </form>
                    <button style={{display:(user==="")?"none":"block"}} onClick={()=>logOut()}>log out</button>
                </div>
            </div>
            <div className="Navbar">
                <a href="javascript:void(0)" id="hamburger" onClick={()=>setmmw(0)}>☰</a>
                <Link to="/">
                    <img id="navbarIcon" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fnavbar-icon.png?alt=media&token=f442a2d3-5994-48fb-81f9-4b467db9730c"></img>
                </Link>
            </div>
        </>
    )
}
