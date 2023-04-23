import { useEffect, useRef } from "react";
import * as Three from "three";

const useRaycasting = () => {
    const ref = useRef<HTMLDivElement>(null);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new Three.Scene();

    let camera: Three.PerspectiveCamera;

    let light: Three.AmbientLight;

    let renderer: Three.WebGLRenderer;

    let cube1: Three.Mesh;
    let cube2: Three.Mesh;

    const raycaster = new Three.Raycaster();
    const mousePosition = new Three.Vector2();

    let intersects: Three.Intersection<Three.Object3D<Three.Event>>[] = [];

    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveListener);

        window.addEventListener('click', clickListener);

        return () => {
            window.removeEventListener('mousemove', mouseMoveListener);

            window.removeEventListener('click', clickListener);
        };
    }, []);

    useEffect(() => {
        if (ref.current !== null) {
            setRenderer();

            ref.current.appendChild(renderer.domElement);

            setCamaera();

            setLight();

            setMeshes();

            animate();
        }
    }, [ref]);

    const setRenderer = () => {
        renderer = new Three.WebGLRenderer();

        renderer.setSize(width, height);
    };

    const setCamaera = () => {
        camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);

        camera.position.z = 5;
    };

    const setLight = () => {
        light = new Three.AmbientLight(0xffffff, 5);
        scene.add(light);
    };

    const setMeshes = () => {
        cube1 = makeCube();
        cube1.position.set(2, 0, 0);

        cube2 = makeCube();
        cube2.position.set(-2, 0, 0);

        scene.add(cube1);
        scene.add(cube2);
    };

    const makeCube = () => {
        const geometry = new Three.BoxGeometry(1, 1, 1);
        const material = new Three.MeshMatcapMaterial({ color: 0x00ff00 });
        return new Three.Mesh(geometry, material);
    };

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    const mouseMoveListener = (e: MouseEvent) => {
        mousePosition.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1);
        raycaster.setFromCamera(mousePosition, camera);

        intersects = raycaster.intersectObjects(scene.children);


    };

    const clickListener = (e: MouseEvent) => {
        if (intersects.length > 0) {
            const selectedCube = intersects[0].object;

            const isUpScailed = selectedCube.scale.x === 1.1;

            selectedCube.scale.setScalar(isUpScailed ? 1.0 : 1.1);
        }
    };

    return { ref };
};

export default useRaycasting;