import React,{useState} from 'react'
import {Route,BrowserRouter as Router,Link,Switch} from 'react-router-dom'
import './App.css';

import Navbar from './Navbar'
import Home from './Home'
import Catalog from './Catalog'
import Board from './Board'

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

  auth.onAuthStateChanged((u)=>{
    if(u) setUser(u.uid)
    else setUser("")
  })

  return (
    <Router>
      <Navbar auth={auth} user={user}/>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/products">
        <Catalog dtb={dtb} user={user} str={str}/>
      </Route>
      <Route path="/posts">
        <Board dtb={dtb} user={user}></Board>
      </Route>
    </Router>  
  );
}

export default App;
