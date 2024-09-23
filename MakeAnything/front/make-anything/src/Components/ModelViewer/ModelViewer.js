import React, { useContext, useEffect } from 'react'

import "./ModelViewer.css";

// import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { DDSLoader } from "three-stdlib";
import { FrontBackURLContext } from '../FrontBackURLContext';


// THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

function ModelViewer({ model }) {

    const [frontURL, backURL] = useContext(FrontBackURLContext);

    let file = model.files[0];
    const fileType = file.split('.').pop();
    let loader;
    switch (fileType) {
        // case '3mf': loader = ThreeMFLoader; break;
        case 'obj': loader = OBJLoader; break;
        default: loader = STLLoader; break;
    }

    const Scene = () => {

        const obj = useLoader(loader, backURL + "/getFile/" + model._id);

        let toRet = loader == STLLoader ?
         <mesh geometry={obj} position={[0, -20, 0]}> :
            <meshStandardMaterial attach="material" color="lightgrey" />
          </mesh>
         : <primitive object={obj} position={[0, -20, 0]} />;
        return toRet;
    
    };

    if (fileType !== 'obj' && fileType !== 'stl') {
        return(
            <div className='modelviewer'>
                <h1>Le format de fichier n'est pas supporté</h1>
            </div>);
    }

    return (
        <div className='modelviewer'>
            <Canvas>
                    <Scene />
                    <OrbitControls />
                    <ambientLight intensity={0.2}/>
                    <pointLight position={[100, 200, 80]} intensity={15000.5} penumbra={0} />
                    <Center />
                    <gridHelper args={[200, 200, 'red']} position={[0, -40, 0]} />
            </Canvas>
        </div>
    )
}

export default ModelViewer