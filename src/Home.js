import React,{useState,useEffect} from 'react'
import Model from './Model'

export default function Home({data}) {
    const [mil,setmil]=useState(false);
    const [scroll,setscroll]=useState([0,0]);
    const [fload,setfload]=useState(false);

    const handlescroll=()=>{
        setscroll([document.documentElement.scrollTop,document.documentElement.scrollHeight])
    }

    useEffect(()=>{
        window.addEventListener('scroll',handlescroll,{passive:true})
        return()=>{
            window.removeEventListener('scroll',handlescroll)
        }
    },[])

    useEffect(()=>{
        if(!fload && scroll[0]>scroll[1]/3*1.6) setfload(true);
    },[scroll])

    return (
        <>
            <video autoPlay muted loop className="bgimg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fbg.mp4?alt=media" alt="" onCanPlay={()=>setmil(true)}/>
            <div className="page" style={{backgroundColor:"#000a",flexDirection:"column"}}>
                <img className={(mil)?"loaded":"loading"} id="mainicon" style={{transitionDelay:"0.5s"}} src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fmain-icon.png?alt=media" alt=""></img>
                <p id="slogan" className={(mil)?"mloaded":"mloading"} style={{transitionDelay:"1.5s",margin:"30px auto"}}>The sound you deserve</p>
                <div className={(mil)?"mloaded":"mloading"} style={{transitionDelay:"2.5s",margin:"30px auto"}}>
                    <a href="https://jbmouthpiece.web.app/products"><button className="btn2 bigbtn">เลือกดูสินค้า</button></a>
                    <a href="https://www.facebook.com/jbhuri/"><button className="btn1 bigbtn">ติดต่อผู้ขาย</button></a>
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
                    <div>
                        <img className="featureImg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fft1.jpg?alt=media" alt=""/>
                    </div>
                    <div>
                        <p className="featureName shadowText">3D Printing</p>
                        <p className="featureDes">เราผลิตโดยใช้เทคโนโลยีปริ้น 3 มิติ ทำให้ mouthpiece มีความแม่นยำสูง และปรับแต่งได้ตามใจชอบ</p>
                    </div>
                </div>
                <div className={"card featureCard flexc "+((fload)?"mloaded":"mloading")}>
                    <div>
                        <img className="featureImg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fft2.jpg?alt=media" alt=""/>
                    </div>
                    <div>
                        <p className="featureName shadowText">Right fit</p>
                        <p className="featureDes">เรามี mouthpiece ที่ครอบคลุมหลากหลาย เหมาะสมกับทุกระดับ ตั้งแต่เริ่มต้นเล่นจนไปถึงชำนาญ</p>
                    </div>
                </div>
                <div className={"card featureCard flexc "+((fload)?"mloaded":"mloading")}>
                    <div>
                        <img className="featureImg" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fft3.jpg?alt=media" alt=""/>
                    </div>
                    <div>
                        <p className="featureName shadowText">Researching</p>
                        <p className="featureDes">เราไม่หยุดที่จะวิจัยพัฒนา mouthpiece เพื่อคุณภาพเสียงที่ดีที่สุด และตอบโจทย์ทุกสไตล์การเล่น</p>
                    </div>
                </div>
            </div>
        </>
    )
}
