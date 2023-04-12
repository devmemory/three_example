import { useEffect, useRef } from "react";
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface LatLngModel {
    lat: number,
    lng: number;
}

const useThree = () => {
    const ref = useRef<HTMLDivElement>(null);

    let renderer: Three.WebGLRenderer;

    let scene: Three.Scene;

    let camera: Three.PerspectiveCamera;

    let controls: OrbitControls;

    let latLng: LatLngModel = { lat: 52.520008, lng: 13.404954 };//{ lat: 37.532600, lng: 127.024612 };


    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        init();
    }, [ref]);

    const init = () => {
        // div에 ref 바인딩 된 이후에 작동
        if (ref.current !== null) {
            setCamera();

            setRenderer();

            controls = new OrbitControls(camera, ref.current);

            scene = new Three.Scene();

            renderer.render(scene, camera);

            makeEarth();

            makePoint();

            animate();
        }
    };

    // 카메라 셋팅
    const setCamera = () => {
        camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        camera.position.z = 5;
    };

    // renderer 기본 셋팅
    const setRenderer = () => {
        renderer = new Three.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);

        ref.current!.appendChild(renderer.domElement);
    };

    const makeEarth = () => {
        const geometry = new Three.SphereGeometry(1);

        const texture = new Three.TextureLoader().load('/assets/img/earth.jpg');

        const material = new Three.MeshBasicMaterial({ map: texture });

        const sphere = new Three.Mesh(geometry, material);

        scene.add(sphere);
    };

    const makePoint = () => {
        const geometry = new Three.SphereGeometry(0.02);

        const material = new Three.MeshBasicMaterial({ color: 0xff0000 });

        const point = new Three.Mesh(geometry, material);

        const { x, y, z } = latLngToXYZ();

        const { lat, lng } = XYZToLatLng(x, y, z);

        console.log({ latLng, x, y, z, lat, lng });

        point.position.set(x, y, z);

        scene.add(point);
    };

    const latLngToXYZ = () => {
        // const latRad = latLng.lat * Math.PI / 180;
        // const lngRad = latLng.lng * Math.PI / 180;

        // const x = -Math.cos(latRad) * Math.cos(lngRad);
        // const y = Math.cos(latRad) * Math.sin(lngRad);
        // const z = Math.sin(latRad);

        const phi = (90 - latLng.lat) * (Math.PI / 180);
        const theta = (latLng.lng + 180) * (Math.PI / 180);

        const x = -(Math.sin(phi) * Math.cos(theta));
        const z = (Math.sin(phi) * Math.sin(theta));
        const y = (Math.cos(phi));

        return { x, y, z };
    };

    const XYZToLatLng = (x: number, y: number, z: number) => {
        const lat = Math.asin(z / 1);
        const lng = Math.atan2(y, x);

        return { lat, lng };
    };

    // render screen
    const animate = () => {
        controls.update();

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    // 브라우저 크기 변경 대응
    const handleResize = () => {
        if (ref !== null) {
            const width = ref.current!.clientWidth;
            const height = ref.current!.clientHeight;

            renderer.setSize(width, height);
            camera.aspect = width / height;

            camera.updateProjectionMatrix();
        };
    };

    return {
        ref,
        setValue: () => {
        },
        resetCamera: () => {
            controls.reset();
        }
    };
};

export default useThree;