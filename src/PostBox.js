import React,{useState} from 'react'

export default function PostBox({dtb,admin}) {
    const [dct,setdct]=useState(()=>{
        dtb.get().then((data=>{
            console.log(admin)
            setdct(data.data().description)
        }))
        .catch(e=>alert(e.message))
    })

    function editdct(e){
        dtb.update({description:e.target.dctbox.value}).then(rs=>{
          setdct(e.target.dctbox.value);
        })
        .catch(e=>alert(e.message))
      }

    return (
        <div className="postText shrink">
            <div dangerouslySetInnerHTML={{__html:dct}}></div>
            {
                (admin!="") ?
                <>
                  <form onSubmit={(e)=>{e.preventDefault();editdct(e);}}>
                    <textarea name="dctbox" id="" cols="80" rows="10" defaultValue={dct}></textarea>
                    <p>
                      กดช่องว่าง - {'&nbsp;'}<br/>
                      ขึ้นบรรทัดใหม่ - {'<br/>'}<br/>
                      กดแท็บ - {'&emsp;'}<br/>
                      เน้นข้อความ - {"<b>"}ข้อความ{"</b>"}<br/>
                      โยงลิงค์ข้อความ - {'<a href="ลิงค์">'+"ข้อความ"+"<a>"}<br/>
                      ใส่รูป - {'<img src="'+"ลิงค์รูป"+'"/>'}<br/>
                      ใส่คลิปยูทูป - {'<iframe src="https://www.youtube.com/embed/'+"ไอดีคลิป"+'" frameBorder="0"/>'}
                    </p>
                    <input type="submit" value="save"></input>
                  </form>
                </> : <></>
            }
        </div>
    )
}
