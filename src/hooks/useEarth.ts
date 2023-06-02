import { useEffect, useRef } from "react";
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface LatLngModel {
  lat: number;
  lng: number;
}

export const useEarth = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scene = new Three.Scene();

  let renderer: Three.WebGLRenderer;

  let camera: Three.PerspectiveCamera;

  let controls: OrbitControls;

  let latLng: LatLngModel = { lat: 52.520008, lng: 13.404954 }; //{ lat: 37.532600, lng: 127.024612 };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    window.addEventListener("click", clickListener);

    return () => {
      window.removeEventListener("resize", handleResize);

      window.removeEventListener("click", clickListener);
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

      renderer.render(scene, camera);

      makeEarth();

      // makePoint();

      animate();
    }
  };

  // 카메라 셋팅
  const setCamera = () => {
    camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

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

    const texture = new Three.TextureLoader().load("/assets/img/earth.jpg");

    const material = new Three.MeshBasicMaterial({ map: texture });

    const sphere = new Three.Mesh(geometry, material);

    scene.add(sphere);
  };

  const makePoint = (x: number, y: number, z: number) => {
    const geometry = new Three.SphereGeometry(0.02);

    const material = new Three.MeshBasicMaterial({ color: 0xff0000 });

    const point = new Three.Mesh(geometry, material);

    // const { x, y, z } = latLngToXYZ();

    // const { lat, lng } = XYZToLatLng(x, y, z);

    // console.log({ latLng, x, y, z, lat, lng });

    point.position.set(x, y, z);

    scene.add(point);
  };

  const latLngToXYZ = () => {
    const phi = (90 - latLng.lat) * (Math.PI / 180);
    const theta = (latLng.lng + 180) * (Math.PI / 180);

    const x = -Math.sin(phi) * Math.cos(theta);
    const z = Math.sin(phi) * Math.sin(theta);
    const y = Math.cos(phi);

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
    }
  };

  const clickListener = (e: MouseEvent) => {
    const mousePosition = new Three.Vector2();

    const raycaster = new Three.Raycaster();

    const width = window.innerWidth;
    const height = window.innerHeight;

    mousePosition.set(
      (e.clientX / width) * 2 - 1,
      -(e.clientY / height) * 2 + 1
    );

    raycaster.setFromCamera(mousePosition, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const point = intersects[0].point;

      makePoint(point.x, point.y, point.z);
    }
  };

  return {
    ref,
    setValue: () => {},
    resetCamera: () => {
      controls.reset();
    },
  };
};
