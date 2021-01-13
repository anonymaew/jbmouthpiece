import React,{useState,useEffect} from 'react'

import ProductCard from './ProductCard'
import Tag from './Tag'

export default function Catalog({dtb,user}) {
    
    const [pdl,setpd]=useState([])
    const [tgl,settg]=useState([])
    const [ssmt,setssmt]=useState(["az",[],false])
    const [ssw,setssw]=useState(-216)
  
    useEffect(()=>{
      dtb.collection("catalog").get().then((data)=>{
        let lis=[]
        data.forEach((i)=>{
          if(i.data().name!=="null") lis.push({id:i.id,...i.data(),visible:true})
        })
        setpd(()=>lis)
      })
      .catch((e)=>{alert(e.message); setpd(()=>[])})
  
      
      dtb.collection("tag").get().then((data)=>{
        let lis=[]
        data.forEach((i)=>{
          if(i.data().name!=="null") lis.push({id:i.id,...i.data()})
        })
        settg(()=>lis)
      })
      .catch((e)=>{alert(e.message); settg(()=>[])})
    },[])
  
    useEffect(()=>{
      console.log(pdl)
    },[pdl])

    useEffect(()=>{
      let sort=ssmt[0],sieve=ssmt[1],seeoos=!ssmt[2];
      console.log(ssmt)
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
  
    function addCatalog(e){
      let newOb={
        name:e.target.name.value,
        price:e.target.price.value,
        sale:e.target.sale.value,
        oos:false,
        tag:[]
      }
      dtb.collection("catalog").add(newOb).then((ref)=>{
        newOb.id=ref.id; newOb.visible=true;
        setpd((l)=>{return [...l,newOb]})
        console.log("save at "+ref.id);
      })
      .catch((e)=>alert(e.message))
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
          for(let i=0;i<li.length;i++) if(li[i].id===e.target.id.value) li[i]={...newOb,visible:e.target.visible.checked}
          return li
        })
        console.log("updated");
      })
      .catch((e)=>alert(e.message))
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
      .catch((e)=>alert(e.message))
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
      .catch((e)=>alert(e.message))
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
        <div id="sortsieve" style={{left:ssw+"px"}}>
          <div>
            <a href="javascript:void(0)" class="close" onClick={()=>setssw(-216)}>X</a>
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
          <input onChange={(e)=>setssmt(i=>{
            let j=[...i]
            j[2]=e.target.checked;
            return j;
          })} type="checkbox" name="seeoos"></input>
          <label htmlFor="seeoos">ไม่เลือกสินค้าหมด</label>
          {tgl.map(i=>{
            return(
              <div key={i.id}>
                <input onChange={(e)=>{
                  if(e.target.checked) setssmt((ossmt)=>{
                    let j=[...ossmt]
                    j[1]=[...j[1],i.id]
                    return j;
                  })
                  else  setssmt((ossmt)=>{
                    let j=[];
                    for(let nt of ossmt[1]) if(nt!==i.id) j.push(nt)
                    return [ossmt[0],j,ossmt[2]]
                  })
                }} type="checkbox" name={i.id}></input>
                <Tag data={i}/>
               </div>
            )
          })}
        </div><br></br>
      <div>
        <a href="javascript:void(0)" class="close" onClick={()=>setssw(0)}>{'>>'} ตัวเลือก</a>
      </div>
        <div id="catalog">
          {pdl.map(i=>{
            if(i.visible) return <ProductCard key={i.id} user={user} data={i} tgl={tgl} save={editCatalog} del={deleteCatalog}/>
          })}
        </div>
        <div id="tag">
          {
            tgl.map(i=>{
              if(user!=="") return (
              <div key={i.id}>
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
        {
          (user!=="") ? 
            <>
              <form onSubmit={(e)=>{e.preventDefault();addCatalog(e);}}>
                <input type="text" name="name" placeholder="name"></input>
                <input type="number" name="price" placeholder="price"></input>
                <input type="number" name="sale" placeholder="sale price(optional)"></input>
                <button>add</button>
              </form>
              <form onSubmit={(e)=>{e.preventDefault();addTag(e);}}>
                <input type="text" name="name"></input>
                <input type="text" name="description"></input>
                <input type="color" name="color"></input>
                <button>add</button>
              </form>
            </> : <></>
        }
      </>
    );
}
