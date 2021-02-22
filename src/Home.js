import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Model from './Model'
import ProductCard from './ProductCard'

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
                    console.log(i)
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

    function sortTag(){
      settg((l)=>{
        let li=[...l];
        li.sort((a,b)=>a.number-b.number)
        console.log(li)
        return li;
      })
    }

    useEffect(()=>{
        if(!fload && scroll[0]>scroll[1]/5*1.6) setfload(true);
    },[scroll])

    return (
        <>
            <video autoPlay muted loop className="bgimg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fbg.mp4?alt=media" alt="" onCanPlay={()=>setmil(true)} style={{zIndex:((scroll[0]>scroll[1]/5*2)?-2:-1)}}/>
            <img className="bgimg" src="https://scontent.fkkc2-1.fna.fbcdn.net/v/t1.15752-9/146778168_1806917486136419_8910607922575159946_n.jpg?_nc_cat=100&ccb=3&_nc_sid=ae9488&_nc_eui2=AeHRI34-oujgMARJCJPM3y_aWgjq3DiDTdpaCOrcOINN2lKLEwB1eLQTxanEXQjCiml9Z7UQNABRv4X3N_yB_-E0&_nc_ohc=hI0CwPkT6L0AX9S9f4n&_nc_ht=scontent.fkkc2-1.fna&oh=c1ad79779f7757f5528e91c678916d1d&oe=6056FF84" alt="" style={{display:((mil)?"":"none"),zIndex:((scroll[0]>scroll[1]/5*2)?-1:-2)}}/>
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
                <div style={{height:"1px"}}>

                </div>
            </div>
            <div className="page" style={{backgroundColor:"#000a",top:"400%",padding:"0",display:"block"}}>
                    <h1 className="shadowText" style={{textAlign:"center",marginTop:"40px"}}>เกี่ยวกับเรา</h1>
                <div style={{maxWidth:"800px",display:"flex",flexWrap:"wrap",justifyContent:"center",margin:"auto"}}>
                    <div className={"card aboutCard "+((fload)?"mloaded":"mloading")} style={{backgroundSize:"100%",backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fpp1.jpg?alt=media)"}}>
                        <div style={{padding:"4px 16px 0 0"}}>
                            <p className="aboutName shadowText">Bhuri Jearanaitanakij</p>
                            <p className="aboutWork shadowText">Co-founder, Researcher</p>
                            <p className="aboutWork shadowText">and Artist</p>
                        </div>
                        <div style={{width:"210px",marginTop:"16px",marginLeft:"140px",textAlign:"right"}}>
                            <a href="https://www.facebook.com/jbhuri/"><span className="aboutContact">
                                <img src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Ffb.png?alt=media" alt=""/>
                                <span>Bhuri Jearanaitanakij</span>
                            </span></a>
                            <a href="https://www.instagram.com/bhuri.jea/"><span className="aboutContact">
                                <img src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fig.png?alt=media" alt=""/>
                                <span>bhuri.jea</span>
                            </span></a>
                        </div>
                    </div>
                    <div className={"card aboutCard "+((fload)?"mloaded":"mloading")} style={{backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fpp2.jpg?alt=media)"}}>
                        <div style={{padding:"16px 16px 0 0"}}>
                            <p className="aboutName shadowText">Josh Espinosa</p>
                            <p className="aboutWork shadowText">Co-founder and Artist</p>
                        </div>
                        <div style={{width:"210px",marginTop:"16px",marginLeft:"140px",textAlign:"right"}}>
                            <a href="https://www.facebook.com/joshua.espinosa.98/"><span className="aboutContact">
                                <img src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Ffb.png?alt=media" alt=""/>
                                <span>Josh Espinosa</span>
                            </span></a>
                            <a href="https://www.youtube.com/channel/UCXBVt8tSCN4Us1dLyjTkBbw"><span className="aboutContact">
                                <img src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fyt.png?alt=media" alt=""/>
                                <span>Josh Sax Espinosa</span>
                            </span></a>
                        </div>
                    </div>
                    <div className={"card aboutCard "+((fload)?"mloaded":"mloading")} style={{backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fpp3.jpg?alt=media)"}}>
                        <div style={{padding:"16px 16px 0 0"}}>
                            <p className="aboutName shadowText">Napat Srichan</p>
                            <p className="aboutWork shadowText">Programmer and Web Designer</p>
                        </div>
                        <div style={{width:"210px",marginTop:"16px",marginLeft:"140px",textAlign:"right"}}>
                            <a href="https://www.facebook.com/napatsc01/"><span className="aboutContact">
                                <img src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Ffb.png?alt=media" alt=""/>
                                <span>Napat Srichan</span>
                            </span></a>
                            <a href="https://www.instagram.com/napatsc/"><span className="aboutContact">
                                <img src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fig.png?alt=media" alt=""/>
                                <span>napatsc</span>
                            </span></a>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
