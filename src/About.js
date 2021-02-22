import React from 'react'

export default function About({}) {
    return (
        <div style={{margin:"72px 0 0 0"}}>
            <h1 className="shadowText" style={{textAlign:"center",marginTop:"40px"}}>เกี่ยวกับเรา</h1>
            <div style={{maxWidth:"800px",display:"flex",flexWrap:"wrap",justifyContent:"center",margin:"auto"}}>
                <div className={"card aboutCard "} style={{backgroundSize:"100%",backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fpp1.jpg?alt=media)"}}>
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
                <div className={"card aboutCard "} style={{backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fpp2.jpg?alt=media)"}}>
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
                <div className={"card aboutCard "} style={{backgroundImage:"url(https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fpp3.jpg?alt=media)"}}>
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
    )
}
