import React,{useState,useEffect} from 'react'

export default function Service({}) {
    const rate={
        data:[
            {
                name:"Flatten table",
                img:"https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/service%2Fsv1.JPG?alt=media",
                description:["Table ของเม้านั้น จำเป็นจะต้อง seal กับลิ้นให้ได้มากที่สุด เพื่อเอื้ออำนวยให้ลิ้น และลิเกเจอร์ตอบสนองมากขึ้น ดังนั้นเม้าที่มีปัญหา จึงจะต้องนำมาแก้ด้วยการ flattening บนผิวกระจกที่เรียบ และแรงมือที่คงที่ เพื่อให้มันใจว่าTable ของเม้าไม่นูนหรือเว้า"],
                option:{
                    false:{
                        name:"พื้นเรียบ"
                    },
                    true:{
                        name:"พื้นไม่เรียบ",
                        choicetype:"เลือกประเภทเม้า",
                        choice:[
                            {
                                name:"ยางแข็ง,ไม้,พลาสติก",
                                price:[700,900]
                            },
                            {
                                name:"โลหะ",
                                price:[1500]
                            }
                        ]
                    }
                }
            },
            {
                name:"Change, maintenance tip rail",
                img:"https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/service%2Fsv2.JPG?alt=media",
                description:["Tip rail เป็นหัวใจที่สำคัญมากของตัวเม้า โดยปัญหาของ Tip rail นั้น คือความหนา-บาง และบริเวณใกล้เคียง ที่มักถูกขึ้นรูปออกมาไม่สมบูรณ์ การสร้าง Tip rail ที่เสถียร จึงต้องใช้ความชำนาญ และประสบการณ์ เพื่อให้ลิ้นตอบสนองได้ดีขึ้น ทำ Articulation ง่าย เสียงน้ำลายน้อย และยังเอื้อให้ Curve ทำงานได้อย่างมีประสิทธิภาพ","Tip Opening หรือความกว้างที่ปลายปากของเม้า เป็นจุดที่กำหนด เบอร์เม้า โดยรวมๆแล้ว เม้าเบอร์ใหญ่ จะให้เสียงที่กว้าง และ ดังกว่าเม้าเบอร์เล็ก แต่ก็ขึ้นกับ รูปทรงภายในด้วย ซึ่ง Tip opening ของเม้าอาจไม่ถูกต้องตามเบอร์ที่เขียนไว้ข้างเม้า การตรวจเช็คในขั้นตอนนี้ จึงทำให้เจ้าของ ทราบเบอร์ที่แท้จริงของเม้า และสามารถปรับเปลี่ยนเบอร์ได้เล็กน้อย"],
                option:{
                    false:{
                        name:"ไม่ต้องการปรับแก้"
                    },
                    true:{
                        name:"ต้องการปรับแก้",
                        choicetype:"เลือกการปรับแก้",
                        choice:[
                            {
                                name:"แก้เล็กน้อย (≤0.003 in)",
                                price:[200]
                            },
                            {
                                name:"แก้น้อย (≤0.005 in)",
                                price:[500]
                            },
                            {
                                name:"แก้บางส่วน (≤0.010 in)",
                                price:[900]
                            },
                            {
                                name:"แก้มาก (≤0.015 in)",
                                price:[1400]
                            }
                        ]
                    }
                }
            },
            {
                name:"Analyze, fix side rails curve",
                img:"https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/service%2Fsv3.JPG?alt=media",
                description:['เมื่อได้ Table ที่ เรียบเป็นระนาบ และ ขนาด Tip ที่แม่นยำแล้ว ขั้นตอนนี้ จะเป็นส่วนที่มีผลมากที่สุดถึงแม้จะมองไม่ออกด้วยตาเปล่า นั่นคือการวิเคราะห์และปรับแก้ Curve ซึ่ง ตัวรูปร่างภายในของเม้านั้น เปรียบเสมือน กล่องเสียง, Tip rail นั้นเหมือนไมโครโฟน และ Side rail คือ Equalizer คอย Balance ย่านเสียงต่างๆ และอำนวยให้ลิ้นสั่น ดังนั้น Curve ต่างๆ จะแตกต่างกันตามรูปร่างและลักษณะของเม้า การแค่ทำให้ Side rails โค้ง และ เรียบอาจไม่ได้ทำให้เป่าดีขึ้น ดังนั้น การทำ refaceจำเป็นต้องใช้ความเข้าใจและประสปการณ์ในการทำ \n','"ขั้นตอนนี้ สำคัญ และมีผลมากที่สุดในการแก้เม้า แม้ 2 ขั้นตอนก่อนหน้าจะสมบูรณ์ แต่ Curve ผิด อาจส่งผลรุนแรงถึงขั้นเป่าไม่ออก"'],
                option:{
                    false:{
                        name:"ไม่ต้องการปรับ"
                    },
                    true:{
                        name:"ต้องการปรับ",
                        choicetype:"เลือกการปรับแก้",
                        choice:[
                            {
                                name:"Low Bb to Altissimo Range",
                                price:[800,1200]
                            }
                        ]
                    }
                }
            }
        ]
    }
    const [sl,setsl]=useState()
    const [sum,setsum]=useState("0")
    const [ss,setss]=useState()

    useEffect(()=>{
        setsl(j=>{
            let l=[]
            for(let i of rate.data) l.push([-1,[0]])
            return l; 
        })

        setss(j=>{
            let l=[]
            for(let i of rate.data) l.push(["72px"])
            return l;
        }
        )
    },[])

    useEffect(()=>{
        let s=[0,0]
        if(sl==null) return;
        for(let i of sl){
            if(i[1].length==0){
                setsum("-");
                return;
            }
            s[0]+=i[1][0];
            if(i[1][1]) s[1]+=i[1][1];
            else s[1]+=i[1][0];
        }
        if(s[0]==s[1]) s=[s[0]]
        setsum(s.toString().replace(",","-"))
    },[sl])

    return (
        <div style={{margin:"72px 0 0 0"}}>
            {
                (sl!=null) ? rate.data.map((i,index)=>{
                    return <div className="card shrink" style={{margin:"32px auto",padding:"16px"}}>
                        <h2 className="shadowText" style={{textAlign:"center",color:"#cfb991"}}>{i.name}</h2>
                        <div style={{}}>
                            <img className="sc" src={i.img} alt=""style={{width:"240px",height:"240px",margin:"auto",textAlign:"center"}}/>
                            <div className="sr" style={{margin:"16px",width:"360px"}}>
                                <div style={{height:ss[index][0],overflow:"hidden"}}>
                                {
                                    i.description.map(j=>{
                                        return <p>{j}</p>
                                    })
                                }
                                </div>
                                <a href="javascript:void(0)" style={{textDecoration:"underline",fontSize:"small"}} onClick={()=>{setss(l=>{let li=[...l]; li[index][0]=(li[index][0]=="")?"72px":""; return li;})}}>{(ss[index][0]=="")?"ซ่อนข้อความ":"...อ่านเพิ่มเติม"}</a>
                                <br/><br/>
                                <div style={{paddingLeft:"32px"}}>
                                    <div>
                                        <span className={"checkbox "+((sl[index][0]<0)?"check":"uncheck")} onClick={()=>{
                                            setsl(li=>{
                                                let l=[...li]
                                                l[index]=[-Math.abs(li[index][0]),[0]]
                                                return l;
                                            })
                                        }}></span>&nbsp;{i.option.false.name}
                                    </div>
                                    <div>
                                        <span className={"checkbox "+((sl[index][0]>0)?"check":"uncheck")} onClick={()=>{
                                            setsl(li=>{
                                                let l=[...li]
                                                l[index][0]=Math.abs(li[index][0])
                                                l[index][1]=(Math.abs(li[index][0])==1)?[]:i.option.true.choice[Math.abs(li[index][0])-2].price
                                                return l;
                                            })
                                        }}></span>&nbsp;{i.option.true.name}
                                    </div>
                                    <select name="" id="" onChange={(e)=>{
                                        setsl(li=>{
                                            let l=[...li]
                                            l[index][0]=e.target.value;
                                            if(e.target.value==1) l[index][1]=[]
                                            else l[index][1]=i.option.true.choice[e.target.value-2].price
                                            return l
                                        })
                                    }} disabled={sl[index][0]<0}>
                                        <option value="1" defaultValue disabled={Math.abs(sl[index][0])!=1}>{i.option.true.choicetype}</option>
                                        {i.option.true.choice.map((j,jindex)=>{
                                            return <option value={jindex+2}>{j.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div style={{paddingRight:"16px",textAlign:"right"}}>
                                    <h2>{
                                        (sl[index][1].length==0)?"-":(sl[index][1].length==1)?sl[index][1][0]:sl[index][1].toString().replace(",","-")
                                    } บาท</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }) : <></>
            }
            <div className="card shrink sumprice" style={{margin:"32px auto",padding:"8 px 16px",textAlign:"right",backgroundColor:"#cfb991"}}><h2 style={{color:"#000"}}>รวม {sum} บาท&emsp;</h2></div>
            <div style={{height:"150px"}}></div>
        </div>
    )
}
