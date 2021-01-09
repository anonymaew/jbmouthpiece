import React,{useState,useEffect} from 'react'

import ProductCard from './ProductCard'
import Tag from './Tag'

export default function Catalog({dtb,user}) {
    
    const [pdl,setpd]=useState([])
    const [tgl,settg]=useState([])
  
    useEffect(()=>{
      dtb.collection("catalog").get().then((data)=>{
        let lis=[]
        data.forEach((i)=>{
          if(i.data().name!=="null") lis.push({id:i.id,...i.data()})
        })
        setpd(()=>lis)
      })
      .catch((e)=>{console.log("error!: "+e.message); setpd(()=>[])})
  
      
      dtb.collection("tag").get().then((data)=>{
        let lis=[]
        data.forEach((i)=>{
          if(i.data().name!=="null") lis.push({id:i.id,...i.data()})
        })
        settg(()=>lis)
      })
      .catch((e)=>{console.log("error!: "+e.message); settg(()=>[])})
    },[])
  
    useEffect(()=>{
      console.log(pdl)
    },[pdl])
  
    function addCatalog(e){
      let newOb={
        name:e.target.name.value,
        price:e.target.price.value,
        sale:e.target.sale.value,
        oos:false,
        tag:[]
      }
      dtb.collection("catalog").add(newOb).then((ref)=>{
        newOb.id=ref.id;
        setpd((l)=>{return [...l,newOb]})
        console.log("save at "+ref.id);
      })
      .catch((e)=>console.log("error!: "+e.message))
    }
  
    function editCatalog(e){
      let lis=[]
      for(let ti of tgl) if(e.target[ti.id].checked) lis.push(ti.id)
      let newOb={
        id:e.target.id.value,
        name:e.target.name.value,
        price:e.target.price.value,
        sale:e.target.sale.value,
        oos:e.target.oos.checked,
        tag:lis
      }
      dtb.collection("catalog").doc(e.target.id.value).update(newOb)
      .then(()=>{
        setpd((l)=>{
          let li=[...l]
          for(let i=0;i<li.length;i++) if(li[i].id===e.target.id.value) li[i]=newOb
          return li
        })
        console.log("updated");
      })
      .catch((e)=>console.log("error!: "+e.message))
    }
  
    function deleteCatalog(id){
      dtb.collection("catalog").doc(id).delete()
      .then(()=>{
        setpd((l)=>{
          let li=[...l],iin;
          for(let i=0;i<li.length;i++) if(li[i].id===id) iin=i;
          li.splice(iin,1)
          return li
        })
        console.log("deleted");
      })
    }
  
    function addTag(e){
      let newOb={
        name:e.target.name.value,
        description:e.target.description.value,
        color:e.target.color.value
      }
      dtb.collection("tag").add(newOb).then((ref)=>{
        newOb.id=ref.id;
        settg((l)=>{return [...l,newOb]})
        console.log("save at "+ref.id);
      })
      .catch((e)=>console.log("error!: "+e.message))
    }
  
    function editTag(e){
      let newOb={
        id:e.target.id.value,
        name:e.target.name.value,
        description:e.target.description.value,
        color:e.target.color.value
      }
      dtb.collection("tag").doc(e.target.id.value).update(newOb)
      .then(()=>{
        settg((l)=>{
          let li=[...l]
          for(let i=0;i<li.length;i++) if(li[i].id===e.target.id.value) li[i]=newOb
          return li
        })
        console.log("updated");
      })
      .catch((e)=>console.log("error!: "+e.message))
    }
  
    function deleteTag(id){
      dtb.collection("tag").doc(id).delete()
      .then(()=>{
        settg((l)=>{
          let li=[...l],iin;
          for(let i=0;i<li.length;i++) if(li[i].id===id) iin=i;
          li.splice(iin,1)
          return li
        })
        console.log("deleted");
      })
    }
  
    return (
      <>
        <div id="catalog">
          {pdl.map(i=>{
            return <ProductCard key={i.id} user={user} data={i} tgl={tgl} save={editCatalog} del={deleteCatalog}/>
          })}
        </div>
        <div id="tag">
          {
            tgl.map(i=>{
              return (
              <div style={{display:(user==="")?"none":"block"}} key={i.id}>
                <Tag data={i}/>
                <form onSubmit={(e)=>{e.preventDefault();editTag(e)}}>
                  <input type="text" name="id" value={i.id} style={{display:"none"}} readOnly></input>
                  <input type="text" name="name" defaultValue={i.name}></input>
                  <input type="text" name="description" defaultValue={i.description}></input>
                  <input type="color" name="color" defaultValue={i.color}></input>
                  <button>save</button>
                  <button type="button" onClick={()=>deleteTag(i.id)}>delete</button>
                </form>
              </div>
              )
            })
          }
        </div>
        <form style={{display:(user==="")?"none":"block"}} onSubmit={(e)=>{e.preventDefault();addCatalog(e);}}>
          <input type="text" name="name" placeholder="name"></input>
          <input type="number" name="price" placeholder="price"></input>
          <input type="number" name="sale" placeholder="sale price(optional)"></input>
          <button>add</button>
        </form>
        <form style={{display:(user==="")?"none":"block"}} onSubmit={(e)=>{e.preventDefault();addTag(e);}}>
          <input type="text" name="name"></input>
          <input type="text" name="description"></input>
          <input type="color" name="color"></input>
          <button>add</button>
        </form>
      </>
    );
}
