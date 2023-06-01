import { Vector3, useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { Mesh } from 'three';

type BoxProps = {
    position: Vector3;
};

const Box = (props: BoxProps) => {
    const mesh = useRef<Mesh>(null);

    const [active, setActive] = useState(false);

    const [hover, setHover] = useState(false);

    useFrame((state, delta) => {
        if (mesh.current !== null) {
            mesh.current!.rotation.x += delta;
            mesh.current!.rotation.y += delta;
        }
    });

    return (
        <mesh
            ref={mesh}
            position={props.position}
            scale={active ? 1.2 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hover ? 'white' : 'green'} />
        </mesh>
    );
};

export default Box;