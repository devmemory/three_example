import { useEffect, useRef } from "react";
import * as Three from "three";

export const useRaycasting = () => {
    const ref = useRef<HTMLDivElement>(null);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new Three.Scene();

    let camera: Three.PerspectiveCamera;

    let light: Three.AmbientLight;

    let renderer: Three.WebGLRenderer;

    const raycaster = new Three.Raycaster();

    const mousePosition = new Three.Vector2();

    let intersects: Three.Intersection<Three.Object3D<Three.Event>>[] = [];

    let debounce: number | undefined;

    let hovered: any = null;

    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveListener);

        window.addEventListener('click', clickListener);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', mouseMoveListener);

            window.removeEventListener('click', clickListener);

            window.removeEventListener('resize', handleResize);
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
        for (let i = 0; i < 3; i++) {
            const cube = makeCube();
            cube.position.set(2 - (i * 2), 0, 0);

            scene.add(cube);
        }
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
        clearTimeout(debounce);

        debounce = setTimeout(() => {
            mousePosition.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1);
            raycaster.setFromCamera(mousePosition, camera);

            intersects = raycaster.intersectObjects(scene.children);

            if (intersects.length > 0) {
                hovered = intersects[0].object as any;

                hovered.material.color.set('#229922');
            } else {
                if (hovered !== null) {
                    hovered.material.color.set('#00ff00');
                }
            }
        }, 10);
    };

    const clickListener = (e: MouseEvent) => {
        if (intersects.length > 0) {
            const selectedCube = intersects[0].object;

            const isUpScailed = selectedCube.scale.x === 1.1;

            selectedCube.scale.setScalar(isUpScailed ? 1.0 : 1.1);
        }
    };

    const handleResize = () => {
        if (ref !== null) {
            const width = ref.current!.clientWidth;
            const height = ref.current!.clientHeight;

            renderer.setSize(width, height);
            camera.aspect = width / height;

            camera.updateProjectionMatrix();
        };
    };

    return { ref };
};