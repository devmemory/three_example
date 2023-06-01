import { useEffect, useRef } from "react";
import * as Three from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const useGauge = () => {
  const ref = useRef<HTMLDivElement>(null);

  let renderer: Three.WebGLRenderer;

  let scene: Three.Scene;

  let camera: Three.PerspectiveCamera;

  let arrow: Three.Mesh;

  const minimumAngle = Math.PI * 0.25;

  const maximumAngle = Math.PI * -1.25;

  const division = Math.PI * 0.166667;

  let value = 0;

  let controls: OrbitControls;

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

      makePanel();

      makeArrow();

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

  // 배경 mesh
  const makePanel = () => {
    const geometry = new Three.CircleGeometry();

    const texture = new Three.TextureLoader().load('/assets/img/panel.jpg');

    const material = new Three.MeshBasicMaterial({ map: texture });
    const panel = new Three.Mesh(geometry, material);
    scene.add(panel);
  };

  // 지침 mesh
  const makeArrow = () => {
    const triangle = new Three.Shape();
    triangle.moveTo(0, 0);
    triangle.lineTo(0, 0.1);
    triangle.lineTo(-0.8, 0);
    triangle.lineTo(0, -0.1);
    triangle.lineTo(0, 0);

    const geometry = new Three.ShapeGeometry(triangle);

    const material = new Three.MeshBasicMaterial({ color: 0xD32F2F });

    arrow = new Three.Mesh(geometry, material);

    arrow.rotation.z = minimumAngle;

    scene.add(arrow);
  };

  // custom animation
  const moveTo = async () => {
    const zPosition = arrow.rotation.z;

    const destination = minimumAngle - (division * value);

    let velocity = Math.abs(Math.abs(zPosition) - Math.abs(destination)) * 2;

    if (velocity < 1) {
      velocity = 1;
    }

    // 시계 방향
    if (zPosition > destination) {
      arrow.rotation.z -= division * 0.05 * velocity;

      if (arrow.rotation.z < maximumAngle) {
        arrow.rotation.z = maximumAngle;
      }
    } else {
      // 반시계 방향
      arrow.rotation.z += division * 0.05 * velocity;

      if (arrow.rotation.z > minimumAngle) {
        arrow.rotation.z = minimumAngle;
      }
    }
  };

  // render screen
  const animate = () => {
    controls.update();

    moveTo();
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
    setValue: (num: number) => {
      value = num;
    },
    resetCamera: () => {
      controls.reset();
    }
  };
};