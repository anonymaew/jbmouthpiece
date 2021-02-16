import React,{useState,useEffect,useRef} from 'react'

export default function Model(scroll){
    const canvasRef=useRef(null);
    const img = new Image();
    let canvas,context;

    function scrollmap(){
        let sc=[...scroll.scroll];
        if(isNaN(sc[0]) || isNaN(sc[1])) return 0;
        if(sc[0]<sc[1]/pages*0.3) return 0;
        if(sc[0]>sc[1]/pages*1.5) return frameCount;
        return parseInt((sc[0]-sc[1]/pages*0.3)*frameCount/(sc[1]/pages*1.2));
    }

    function draw(ct){        
        let crf=scrollmap();
        if(isNaN(crf)) crf=0;
        img.src = currentFrame(crf);
        ct.drawImage(img, 0, 0);
    }

    useEffect(()=>{
        canvas = canvasRef.current;
        context = canvas.getContext("2d");
        preloadImages();
        img.src = currentFrame(0);
        canvas.width=480;
        canvas.height=480;
        img.onload=function(){
            context.drawImage(img, 0, 0);
        }

        let frame=0,anm;
        const loop=()=>{
            draw(context);
            anm=window.requestAnimationFrame(loop);
        }
        loop()

        return ()=>{window.cancelAnimationFrame(anm)}
    },[draw])


    const frameCount = 60,pages=3;
    const currentFrame = index => {
        return "https://firebasestorage.googleapis.com/v0/b/jbmouthpiece.appspot.com/o/img%2Fmodel%2F"+index.toString().padStart(2, '0')+".jpg?alt=media"
    }

    const preloadImages = () => {
        for (let i = 0; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
        }
    };

    return(
        <canvas id="model" ref={canvasRef}>

        </canvas>
    )
}