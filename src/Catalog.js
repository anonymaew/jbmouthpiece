import React,{useState,useEffect} from 'react'
import {Route,BrowserRouter as Router,Link,useParams,Switch} from 'react-router-dom'

import ProductCard from './ProductCard'
import Product from './Product'
import Tag from './Tag'

export default function Catalog({dtb,user,str}) {
    
    const [pdl,setpd]=useState([])
    const [tgl,settg]=useState([])
    const [ssmt,setssmt]=useState([[],[],[]])
    const [ssw,setssw]=useState(-216)
  
    useEffect(()=>{
      dtb.collection("catalog").get().then((data)=>{
        let lis=[]
        data.forEach((i)=>{
          if(i.data().name!=="null") lis.push({id:i.id,...i.data(),visible:true})
        })
        setpd(()=>lis)
        setssmt(["az",[],false])
      })
      .catch((e)=>{alert(e.message); setpd(()=>[])})
  
      
      dtb.collection("tag").get().then((data)=>{
        let lis=[]
        data.forEach((i)=>{
          if(i.data().name!=="null") lis.push({id:i.id,...i.data()})
        })
        settg(()=>lis)
        sortTag()
      })
      .catch((e)=>{alert(e.message); settg(()=>[])})
    },[])
  
    useEffect(()=>{
      print(pdl)
    },[pdl])

    useEffect(()=>{
      let sort=ssmt[0],sieve=ssmt[1],seeoos=!ssmt[2];
      print(ssmt)
      setpd((l)=>{
        let li=[]
        for(let i of l){
          i.visible=!i.oos || seeoos;
          for(let ti of sieve) if(!i.tag.includes(ti)){ i.visible=false; break; }
          li.push(i)
        }
        
        li.sort((a,b)=>{
          let ap=(a.sale==="")?a.price:a.sale,bp=(b.sale==="")?b.price:b.sale;
          if(sort==="pP") return ap-bp;
          else if(sort==="Pp") return bp-ap;
          else if(sort==="az") return (a.name<b.name)?-1:1;
          else if(sort==="za") return (a.name>b.name)?-1:1;
        })

        return li;
      })
    },[ssmt])

    function print(t){
      if(user!=="") console.log(t)
    }

    function selectType(t){
      if(t==""){
        setssmt(l=>{
          let li=[];
          for(let i of l[1]) if(i!="p5cynSZjdSXpv94NjL3Z" && i!="s0hbu7wo467k4ThB8Prr" && i!="VrhmZk40qxL2SqyEVfpJ") li.push(i);
          return [l[0],li,l[2]]
        })
      }
      else{
        setssmt(l=>{
          let li=[];
          for(let i of l[1]) if(i!="p5cynSZjdSXpv94NjL3Z" && i!="s0hbu7wo467k4ThB8Prr" && i!="VrhmZk40qxL2SqyEVfpJ") li.push(i);
          li.push(t);
          return [l[0],li,l[2]]
        })
      }
    }
  
    function addCatalog(e){
      let newOb={
        name:e.target.name.value,
        price:e.target.price.value,
        sale:e.target.sale.value,
        oos:false,
        hide:false,
        tag:[],
        img:0,
        shortdct:"ไม่มีคำอธิบาย",
        description:"ไม่มีคำอธิบาย"
      }
      dtb.collection("catalog").add(newOb).then((ref)=>{
        newOb.id=ref.id; newOb.visible=true;
        setpd((l)=>{return [...l,newOb]})
        print("save at "+ref.id);
      })
      .catch((e)=>alert(e.message))
    }

    function hideCatalog(id,hd){
      dtb.collection("catalog").doc(id).update({hide:hd}).then(()=>{
        setpd((l)=>{
          let j=[...l];
          for(let i=0;i<j.length;i++) if(j[i].id==id) j[i].hide=hd;
          return j;
        })
      })
    }
  
    function deleteCatalog(id){
      if(!window.confirm("Are you sure you want to delete this product?")) return;
      dtb.collection("catalog").doc(id).delete()
      .then(()=>{
        //cannot delete the folder?
        //str.ref().child('catalog/'+id).delete().then(sn=>{
          setpd((l)=>{
            let li=[...l],iin;
            for(let i=0;i<li.length;i++) if(li[i].id===id) iin=i;
            li.splice(iin,1)
            return li
          })
          print("deleted");
        //})
        //.catch(e=>alert(e.message))
      })
      .catch(e=>alert(e.message))
    }
  
    function addTag(e){
      let newOb={
        name:e.target.name.value,
        description:e.target.description.value,
        color:e.target.color.value,
        number:(e.target.order.value=="")?"9":e.target.order.value==""
      }
      dtb.collection("tag").add(newOb).then((ref)=>{
        newOb.id=ref.id;
        settg((l)=>{return [...l,newOb]})
        print("save at "+ref.id);
      })
      .catch((e)=>alert(e.message))
    }
  
    function editTag(e,id){
      let newOb={
        name:e.target.name.value,
        description:e.target.description.value,
        color:e.target.color.value,
        number:e.target.order.value
      }
      dtb.collection("tag").doc(id).update(newOb)
      .then(()=>{
        settg((l)=>{
          let li=[...l]
          for(let i=0;i<li.length;i++) if(li[i].id===id) li[i]={...newOb,id:id}
          return li
        })
        sortTag();
        print("updated");
      })
      .catch((e)=>alert(e.message))
    }

    function sortTag(){
      settg((l)=>{
        let li=[...l];
        li.sort((a,b)=>a.number-b.number)
        return li;
      })
    }
  
    function deleteTag(id){
      if(!window.confirm("Are you sure you want to delete this tag?")) return;
      dtb.collection("tag").doc(id).delete()
      .then(()=>{
        settg((l)=>{
          let li=[...l],iin;
          for(let i=0;i<li.length;i++) if(li[i].id===id) iin=i;
          li.splice(iin,1)
          return li
        })
        print("deleted");
      })
    }

    return (
          <Switch>
            <Route exact path="/products">
            <div className="menu sortsieve" style={{left:ssw+"px"}}>
              <div>
                <a href="javascript:void(0)" className="close" onClick={()=>setssw(-216)}>X</a>
              </div>
              <p>เรียงสินค้าจาก:</p>
              <select onChange={(e)=>setssmt(i=>{
                let j=[...i]
                j[0]=e.target.value;
                return j;
              })}>
                <option value="az" defaultValue>ตัวอักษร a-z</option>
                <option value="za">ตัวอักษร z-a</option>
                <option value="pP">ราคาน้อยไปมาก</option>
                <option value="Pp">ราคามากไปน้อย</option>
              </select><br></br><br></br>
              <p>ตัวกรอง</p>
              <span onClick={()=>setssmt(i=>{
                let j=[...i]
                j[2]=!ssmt[2];
                return j;
              })} className={"checkbox "+((ssmt[2])?"check":"uncheck")}></span>
              <label htmlFor="seeoos">ไม่เลือกดูสินค้าที่หมดแล้ว</label>
              {tgl.map(i=>{
                return(
                  <div key={i.id}>
                    <span onClick={()=>{
                      if(!ssmt[1].includes(i.id)) setssmt((ossmt)=>{
                        let j=[...ossmt]
                        j[1]=[...j[1],i.id]
                        return j;
                      })
                      else  setssmt((ossmt)=>{
                        let j=[];
                        for(let nt of ossmt[1]) if(nt!==i.id) j.push(nt)
                        return [ossmt[0],j,ossmt[2]]
                      })
                    }} className={"checkbox "+((ssmt[1].includes(i.id))?"check":"uncheck")}></span>
                    <Tag data={i}/>
                  </div>
                )
              })}
            </div>
          <div style={{margin:"60px 0px 12px 0px"}}>
            <button className={"typebtn "+((!ssmt[1].includes("p5cynSZjdSXpv94NjL3Z") && !ssmt[1].includes("s0hbu7wo467k4ThB8Prr") && !ssmt[1].includes("VrhmZk40qxL2SqyEVfpJ"))?"btn2":"btn1")} onClick={()=>{selectType("")}}>All</button>
            <button className={"typebtn "+((ssmt[1].includes("p5cynSZjdSXpv94NjL3Z"))?"btn2":"btn1")} onClick={()=>{selectType("p5cynSZjdSXpv94NjL3Z")}}>Soprano</button>
            <button className={"typebtn "+((ssmt[1].includes("s0hbu7wo467k4ThB8Prr"))?"btn2":"btn1")} onClick={()=>{selectType("s0hbu7wo467k4ThB8Prr")}}>Alto</button>
            <button className={"typebtn "+((ssmt[1].includes("VrhmZk40qxL2SqyEVfpJ"))?"btn2":"btn1")} onClick={()=>{selectType("VrhmZk40qxL2SqyEVfpJ")}}>Tenor</button>
          </div>
          <div style={{margin:"0px 0px 36px 1%"}}>
            <a href="javascript:void(0)" onClick={()=>setssw(0)}><button className="btn1">&emsp;ตัวเลือก&emsp;</button></a>
          </div>
            <div id="catalog">
              {pdl.map(i=>{
                if(i.visible && (!i.hide || user!="")) return <ProductCard key={i.id} user={user} str={str} data={i} tgl={tgl} del={deleteCatalog} hide={hideCatalog} fw={-1}/>
              })}
            </div>
            <div id="tag">
              {
                tgl.map(i=>{
                  if(user!=="") return (
                  <div key={i.id}>
                    <Tag data={i}/>
                    <form onSubmit={(e)=>{e.preventDefault();editTag(e,i.id)}}>
                    <input type="text" name="name" placeholder="name" defaultValue={i.name}></input>
                    <input type="text" name="description" placeholder="description" defaultValue={i.description}></input>
                    <input type="number" name="order" placeholder="order (optional)" defaultValue={i.number}></input>
                    <input type="color" name="color" defaultValue={i.color}></input>
                      <button>save</button>
                      <button type="button" onClick={()=>deleteTag(i.id)}>delete</button>
                    </form>
                  </div>
                  )
                })
              }
            </div>
            {
              (user!=="") ? 
                <>
                <br/>
                  <form onSubmit={(e)=>{e.preventDefault();addCatalog(e);}}>
                    <p>เพิ่มสินค้า</p>
                    <input type="text" name="name" placeholder="name"></input>
                    <input type="number" name="price" placeholder="price"></input>
                    <input type="number" name="sale" placeholder="sale price(optional)"></input>
                    <button>add</button>
                  </form><br/>
                  <form onSubmit={(e)=>{e.preventDefault();addTag(e);}}>
                    <p>เพิ่มแท็ก</p>
                    <input type="text" name="name" placeholder="name"></input>
                    <input type="text" name="description" placeholder="description"></input>
                    <input type="number" name="order" placeholder="order (optional)"></input>
                    <input type="color" name="color"></input>
                    <button>add</button>
                  </form>
                </> : <></>
            }
            <div style={{height:"120px"}}></div>
            </Route>
        {pdl.map(i=>
          <Route path={"/products/"+i.id}>
            <Product dtb={dtb} str={str} user={user} id={i.id}></Product>
          </Route>
        )}
        </Switch>
    );
}
