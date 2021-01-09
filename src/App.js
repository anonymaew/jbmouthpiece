import React,{useState} from 'react'
import './App.css';

import Navbar from './Navbar'
import Catalog from './Catalog'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

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

function App() {

  const [user,setUser]=useState("")

  auth.onAuthStateChanged((u)=>{
    if(u) setUser(u.uid)
    else setUser("")
  })

  return (
    <>
      <Navbar auth={auth} user={user}/>
      <Catalog dtb={dtb} user={user}/>
    </>  
  );
}

export default App;
