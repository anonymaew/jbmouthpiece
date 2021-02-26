import React,{useState,useEffect} from 'react'
import {Route,BrowserRouter as Router,Link,Switch} from 'react-router-dom'
import './App.css';

import Navbar from './Navbar'
import Home from './Home'
import Catalog from './Catalog'
import Board from './Board'
import About from './About'
import Service from './Service'
import Blank from './Blank'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

firebase.initializeApp({
    apiKey: "AIzaSyAMpPm5d6SLjOGuNYuVH-0n7ols9xi89-s",
    authDomain: "jbmouthpiece.firebaseapp.com",
    projectId: "jbmouthpiece",
    storageBucket: "jbmouthpiece.appspot.com",
    messagingSenderId: "624134839352",
    appId: "1:624134839352:web:3c1a218bc854c8657a1acd",
    measurementId: "G-5K9KK1FN6E"
})

var dtb=firebase.firestore()
var auth=firebase.auth()
var str=firebase.storage();

function App() {

  const [user,setUser]=useState("")
  const [cf,setcf]=useState()

  auth.onAuthStateChanged((u)=>{
    if(u) setUser(u.uid)
    else setUser("")
  })

  useEffect(()=>{
    dtb.collection("server").get().then((data)=>{
      let ob={}
      data.forEach((i)=>{
        ob={...ob,...i.data()};
      })
      setcf(ob)
    })
    .catch((e)=>{alert(e.message);})
  },[])

  useEffect(()=>{
    console.log(cf)
  },[cf])

  return (
    <Router>
      <Navbar auth={auth} user={user}/>
        { (cf) ?
        (!cf.maintenance) ?
        <Switch>
          <Route exact path="/">
            <Home dtb={dtb} user={user} str={str}/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/service">
            <Service/>
          </Route>
          <Route path="/products">
            <Catalog dtb={dtb} user={user} str={str}/>
          </Route>
          <Route path="/posts">
            <Board dtb={dtb} user={user}></Board>
          </Route>
          <Route path="*">
            <Blank mtn={false}/>
          </Route>
        </Switch> : <Switch>
          <Route path="*">
            <Blank mtn={true}/>
          </Route>
        </Switch> 
        : <></>}
    </Router>  
  );
}

export default App;
