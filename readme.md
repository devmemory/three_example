## 사용 라이브러리
- react-router-dom : routing 관리
- three : 3d 전용

## 폴더 구조

### src

#### components
- common_btn : 공통 버튼 컴포넌트
- sized_box : 공통 사이즈 컴포넌트

#### custom_hooks
- use_basic : basic example hooks
- use_earth : earth example hooks
- use_gaugage : gauge example hooks
- use_gltf : gltf example hooks
- use_raycasting : raycasting example hooks

#### routes
- basic
- earth
- error
- fiber(작업중)
- guage
- gltf
- raycasting
- index(main)

#### util
- common_util : 공통 util
- route_util : route관련 util

## 번들러
- vite
- settings
```
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [react()],
    build: {
      outDir: 'build'
    },
    resolve: {
      alias: {
        src: '/src'
      }
    },
    server: {
      port: 3000
    },
    esbuild: {
      drop: mode === 'build' ? ['console'] : undefined
    }
  };
});
```