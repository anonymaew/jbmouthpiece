import React,{useState} from 'react'

export default function Home({data}) {
    const [mil,setmil]=useState(false);

    return (
        <>
            <img  className="bgimg" src="https://f.ptcdn.info/616/017/000/1396967277-Untitled1-o.jpg" alt=""/>
            <div className="page" style={{backgroundColor:"#000d",flexDirection:"column"}}>
                <img className={(mil)?"loaded":"loading"} id="mainicon" src="https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fmain-icon.png?alt=media&token=c6a8b789-5d8c-4182-8139-501c9850ad37" alt="" onLoad={()=>setmil(true)}></img>
                <p className={(mil)?"mloaded":"mloading"} style={{transitionDelay:"1.5s",margin:"30px auto",fontSize:"xx-large"}}>something special</p>
                <div className={(mil)?"mloaded":"mloading"} style={{transitionDelay:"5s",margin:"30px auto"}}>
                    <button className="btn2 bigbtn">เลือกดูสินค้า</button>
                    <button className="btn1 bigbtn">ติดต่อผู้ขาย</button>
                </div>
            </div>
            <div id="feature" className="page flexr" style={{backgroundColor:"#222",top:"100%"}}>
                <div className="featureCard flexc">
                    <div>
                        <p className="featureName">3D Printing</p>
                        <p className="featureDes">เราผลิตโดยใช้เทคโนโลยีปริ้น 3 มิติ ทำให้ mouthpiece มีความแม่นยำสูง และปรับแต่งได้ตามใจชอบ</p>
                    </div>
                </div>
                <div className="featureCard flexc">
                    <div>
                        <p className="featureName">Right fit</p>
                        <p className="featureDes">เรามี mouthpiece ที่ครอบคลุมหลากหลาย เหมาะสมกับทุกระดับ ตั้งแต่เริ่มต้นเล่นจนไปถึงชำนาญ</p>
                    </div>
                </div>
                <div className="featureCard flexc">
                    <div>
                        <p className="featureName">Researching</p>
                        <p className="featureDes">เราไม่หยุดที่จะวิจัยพัฒนา mouthpiece เพื่อคุณภาพเสียงที่ดีที่สุด และตอบโจทย์ทุกสไตล์การเล่น</p>
                    </div>
                </div>
            </div>
            <div className="page" style={{top:"200%"}}>
                <p>special</p>
            </div>
        </>
    )
}
