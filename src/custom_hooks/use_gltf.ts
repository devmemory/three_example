import { useEffect, useRef } from "react";
import util from "src/util/common_util";
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface AnimationType {
    survey?: Three.AnimationAction,
    walk?: Three.AnimationAction,
    run?: Three.AnimationAction;
}

export const useGLTF = () => {
    const ref = useRef<HTMLDivElement>(null);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new Three.Scene();

    const gtlfLoader = new GLTFLoader();

    let camera: Three.PerspectiveCamera;

    let light: Three.AmbientLight;

    let renderer: Three.WebGLRenderer;

    const clock = new Three.Clock();

    let mixer: Three.AnimationMixer;

    let animations: AnimationType;

    useEffect(() => {
        window.onresize = handleResize;

        window.onkeydown = handleKeydown;

        window.onkeyup = handleKeyup;
    }, []);

    useEffect(() => {
        if (ref.current !== null) {
            setRenderer();

            ref.current.appendChild(renderer.domElement);

            setCamaera();

            new OrbitControls(camera, ref.current);

            setLight();

            loadGTLF();

            animate();
        }
    }, [ref]);

    // renderer setting
    const setRenderer = () => {
        renderer = new Three.WebGLRenderer();

        renderer.setSize(width, height);
    };

    // camera setting
    const setCamaera = () => {
        camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);

        camera.position.z = 5;
    };

    // light setting
    const setLight = () => {
        light = new Three.AmbientLight(0xffffff, 5);
        scene.add(light);
    };

    // gltf load, animation setting
    const loadGTLF = () => {
        gtlfLoader.load('/assets/gltf/Fox.gltf',
            (gltf) => {
                console.log({ gltf });

                gltf.scene.scale.set(0.01, 0.01, 0.01);

                scene.add(gltf.scene);

                mixer = new Three.AnimationMixer(gltf.scene);

                animations = {
                    survey: mixer.clipAction(gltf.animations[0]),
                    walk: mixer.clipAction(gltf.animations[1]),
                    run: mixer.clipAction(gltf.animations[2])
                };
            },
            (progress) => {
                console.log({ progress });
            },
            (error) => {
                console.log({ error });
            });
    };

    // frame update
    const animate = () => {
        mixer?.update(clock.getDelta());

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    // 브라우저 사이즈 조정시 크기 재조정
    const handleResize = () => {
        if (ref !== null) {
            const width = ref.current!.clientWidth;
            const height = ref.current!.clientHeight;

            renderer.setSize(width, height);
            camera.aspect = width / height;

            camera.updateProjectionMatrix();
        };
    };

    // 이벤트 시작
    const handleKeydown = async (e: globalThis.KeyboardEvent) => {
        if (e.key === '1') {
            animations.walk?.play();
        } else if (e.key === '2') {
            animations.run?.play();
        } else if (e.key === '3') {
            animations.survey?.play();
        }
    };

    // 이벤트 중단
    const handleKeyup = () => {
        Object.values(animations).forEach((value: Three.AnimationAction) => {
            value.stop();
        });
    };

    return { ref };
};