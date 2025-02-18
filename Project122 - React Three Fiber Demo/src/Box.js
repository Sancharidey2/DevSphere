import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";

function Box({color}){

    const box = useRef();
    const time = useRef(0);
    const [xRotSpeed] = useState(()=>Math.random()*3);
    const [yRotSpeed] = useState(()=>Math.random()*3);
    const [scale] = useState(()=> Math.pow(Math.random(),2.0)*0.5 + 0.05);
    
    
    const [pos,setPos] =useState(getPos());


    function getPos(){
        let v = new Vector3((Math.random()*2 - 1)*3,Math.random()*2.5+0.1, (Math.random()*2 - 1)*15 );
        if (v.x<0){
            v.x -= 1.75;
        }

        if (v.x>0){
            v.x += 1.75;
        }
        return v;
    }

    function resetPos(){
        let v = new Vector3((Math.random()*2 - 1)*3,Math.random()*2.5+0.1, (Math.random()+10)+10 );
        if (v.x<0){
            v.x -= 1.75;
        }

        if (v.x>0){
            v.x += 1.75;
        }
        setPos(v);
    }

    useFrame((state, delta)=>{
        time.current += delta*1.2;
        let newz = pos.z - (time.current);

        if (newz < -10){
            resetPos();
            time.current = 0;
        }

        box.current.position.set(pos.x,pos.y,newz*1.5);
        box.current.rotation.x += xRotSpeed * delta;
        box.current.rotation.y += yRotSpeed * delta;

    },[pos,xRotSpeed,yRotSpeed]);


    return(
        <mesh ref = {box} scale={scale} castShadow>
            <boxGeometry args={[1,1.5,1]}/>
            <meshStandardMaterial color={color} envMapIntensity={.2}/>
        </mesh>
    )
}

export function Boxes(){
    const [arr] = useState(()=>{
        let a = [];
        for (let i=0;i<200;i++)a.push(0);
        return a;
    });

    return <>
        {arr.map((e,i)=>
        <Box key={i} color={i%2===0?[0.8,0.05,0.15]:[0.05,0.15,0.8]}/>
        )}
    </>
}