import { useEffect, useRef } from "react";
import * as Three from "three";

export const useBasic = () => {
  const ref = useRef<HTMLDivElement>(null);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new Three.Scene();

  let camera: Three.PerspectiveCamera;

  let light: Three.AmbientLight;

  let renderer: Three.WebGLRenderer;

  let cube: Three.Mesh;

  useEffect(() => {
    if (ref.current !== null) {
      setRenderer();

      ref.current.appendChild(renderer.domElement);

      setCamaera();

      setLight();

      makeCube();

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

  const makeCube = () => {
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshMatcapMaterial({ color: 0x00ff00 });
    cube = new Three.Mesh(geometry, material);

    scene.add(cube);
  };

  const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  return { ref };
};
