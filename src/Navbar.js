import React from 'react'

export default function Navbar({auth,user}) {

    function logIn(e){
        e.preventDefault();
        auth.signInWithEmailAndPassword(e.target.user.value+"@napatsc.com",e.target.pass.value)
        .then((u)=>{
            console.log("log in")
        })
        .catch((e)=>{console.log("error!: "+e.message)})
    }

    function logOut(){
        auth.signOut()
        .then(
            console.log("log out")
        )
        .catch((e)=>{console.log("error!: "+e.message)})
    }

    return (
        <div className="Navbar">
            <form style={{display:(user==="")?"block":"none"}} onSubmit={logIn}>
                <input type="text" name="user" placeholder="username"></input>
                <input type="password" name="pass" placeholder="password"></input>
                <input type="submit" value="log in"></input>
            </form>
            <button style={{display:(user==="")?"none":"block"}} onClick={()=>logOut()}>log out</button>
        </div>
    )
}
