import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Model from './Model'
import ProductCard from './ProductCard'
import About from './About'

export default function Home({dtb,user,str}) {
    const [mil,setmil]=useState(false);
    const [scroll,setscroll]=useState([0,0]);
    const [fload,setfload]=useState(false);

    const [sl,setsl]=useState(0);

    const [pdl,setpd]=useState([])
    const [tgl,settg]=useState([])
    const [ssmt,setssmt]=useState([])

    const handlescroll=()=>{
        setscroll([document.documentElement.scrollTop,document.documentElement.scrollHeight])
    }

    useEffect(()=>{
        dtb.collection("catalog").get().then((data)=>{
          let lis=[]
          data.forEach((i)=>{
            if(i.data().name!=="null" && i.data().tag.includes("mtFyt7Q2MFWRvExoJ65Z")) lis.push({id:i.id,...i.data(),visible:true})
          })
          setpd(()=>lis)
          setssmt(["az",[],false])
            const interval = setInterval(() => {
                setsl(i=>{
                    print(i)
                    return (i+1)%(lis.length+1)})
            }, 4000);
            return () => clearInterval(interval);
        })
        .catch((e)=>{alert(e.message); setpd(()=>[])})

    },[])

    useEffect(()=>{
    
        
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

    useEffect(() => {
        window.addEventListener('scroll',handlescroll,{passive:true})
        return()=>{
            window.removeEventListener('scroll',handlescroll)
        }
      }, []);

      function print(t){
        if(user!=="") console.log(t)
      }

    function sortTag(){
      settg((l)=>{
        let li=[...l];
        li.sort((a,b)=>a.number-b.number)
        print(li)
        return li;
      })
    }

    useEffect(()=>{
        if(!fload && scroll[0]>scroll[1]/5*1.6) setfload(true);
    },[scroll])

    return (
        <>
            <span className="blackscreen"></span>
            <video autoPlay muted loop className="bgimg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fbg.mp4?alt=media" alt="" onCanPlay={()=>setmil(true)} style={{zIndex:((scroll[0]>scroll[1]/5*2)?-3:-1)}}/>
            <img className="bgimg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fbgimg1.jpg?alt=media" alt="" style={{display:((mil)?"":"none"),zIndex:((scroll[0]>scroll[1]/5*2)?-1:-3)}}/>
            <div className="page" style={{backgroundColor:"#000a",flexDirection:"column"}}>
                <img className={(mil)?"loaded":"loading"} id="mainicon" style={{transitionDelay:"0.5s"}} src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fmain-icon.png?alt=media" alt=""></img>
                <p id="slogan" className={(mil)?"mloaded":"mloading"} style={{transitionDelay:"1.5s",margin:"30px auto"}}>The sound you deserve</p>
                <div className={(mil)?"mloaded":"mloading"} style={{transitionDelay:"2.5s",margin:"30px auto"}}>
                    <Link to="/posts"><button className="btn1 bigbtn">อ่านบทความ</button></Link>
                    <Link to="/products"><button className="btn2 bigbtn">เลือกดูสินค้า</button></Link>
                </div>
            </div>
            <div id="showcase" className="page" style={{backgroundColor:"#333",top:"100%"}}>
                <Model scroll={scroll}/>
                <div id="des">
                    <p className="quote">❝</p>
                    <p>
                    Mouthpiece สำหรับแซกโซโฟน ผลิตโดยใช้เทคโนโลยีพิมพ์สามมิติ คิดค้นและวิจัยโดยคนไทย
                    </p>
                    <p className="quote rquote">❞</p>
                </div>
            </div>
            <div id="feature" className="page flexr" style={{backgroundColor:"#222",top:"200%"}}>
                <div className={"card featureCard flexc "+((fload)?"mloaded":"mloading")}>
                    <Link to="/posts/OoTUvmoJVaTW4Jgcaj8r">
                        <div>
                            <img className="featureImg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fft1.jpg?alt=media" alt=""/>
                        </div>
                        <div>
                            <p className="featureName shadowText">3D Printing</p>
                            <p className="featureDes">เราผลิตโดยใช้เทคโนโลยีปริ้น 3 มิติ ทำให้ mouthpiece มีความแม่นยำสูง และปรับแต่งได้ตามใจชอบ</p>
                        </div>
                    </Link>
                </div>
                <div className={"card featureCard flexc "+((fload)?"mloaded":"mloading")}  style={{transitionDelay:"0.3s"}}>
                    <Link to="/posts/eFIMfzjWgtYi7vsWeopw">
                        <div>
                            <img className="featureImg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fft2.jpg?alt=media" alt=""/>
                        </div>
                        <div>
                            <p className="featureName shadowText">Right fit</p>
                            <p className="featureDes">เรามี mouthpiece ที่ครอบคลุมหลากหลาย เหมาะสมกับทุกระดับ ตั้งแต่เริ่มต้นเล่นจนไปถึงชำนาญ</p>
                        </div>
                    </Link>
                </div>
                <div className={"card featureCard flexc "+((fload)?"mloaded":"mloading")} style={{transitionDelay:"0.6s"}}>
                    <Link to="/posts/O23Em5r8uX1Va3s2dhKZ">
                        <div>
                            <img className="featureImg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fft3.jpg?alt=media" alt=""/>
                        </div>
                        <div>
                            <p className="featureName shadowText">Researching</p>
                            <p className="featureDes">เราไม่หยุดที่จะวิจัยพัฒนา mouthpiece เพื่อคุณภาพเสียงที่ดีที่สุด และตอบโจทย์ทุกสไตล์การเล่น</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="page" style={{backgroundColor:"#320",top:"300%",flexDirection:"column",justifyContent:"space-between"}}>
                <div style={{top:"32px",margin:"10px auto"}}>
                    <h1 className="shadowText">ตัวอย่างสินค้า</h1>
                </div>
                <div className="page" style={{marginTop:"100px",height:"560px"}}>
                    <div className="productPage" style={{width:((pdl.length+1)*360)+"px",left:(((pdl.length)/2-sl)*360)+"px"}}>
                        <div className="card whatsnew" style={{backgroundColor:"#cfb991"}}>
                            <br/>&emsp;&emsp;โดยสำหรับ 2021 J&B Custom Mouthpieces ล้อตนี้เราปรับปรุงมาดังนี้เลยครับ<br/>
                            <br/>Improvement  
                            <br/>-More reeds friendly
                            <br/>-New designed facing for all model
                            <br/>-New generation of tip rail sizing
                        </div>
                    {
                        pdl.map(i=>{
                            return (
                            <div key={i.id} style={{width:"360px"}}>
                                <ProductCard user={user} str={str} data={i} tgl={tgl} fw={300}/>
                            </div>)
                        })
                    }
                    </div>

                </div>
                <div  style={{margin:"32px auto"}}>
                    <Link to="/products"><button className="btn2 bigbtn">ดูสินค้าเพิ่มเติม</button></Link>
                </div>
            </div>
            <div className="page" style={{backgroundColor:"#000a",top:"400%",display:"block"}}>
                <About/>
            </div>
        </>
    )
}
