import * as THREE from "three";

export const $sketch = (p: HTMLCanvasElement) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    p.clientWidth / p.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ canvas: p });

  const geometry = new THREE.BoxGeometry();
  // バーテックスシェーダ
  const vertexShader = `
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    attribute vec3 position;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // フラグメントシェーダ
  const fragmentShader = `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec3 color = vec3(uv.x + sin(time), uv.y + cos(time), sin(time));
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // RawShaderMaterial
  const material = new THREE.RawShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      projectionMatrix: { value: camera.projectionMatrix },
      modelViewMatrix: { value: new THREE.Matrix4() },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Update modelViewMatrix
    material.uniforms.modelViewMatrix.value =
      camera.matrixWorldInverse.multiply(cube.matrixWorld);

    renderer.render(scene, camera);
  };

  animate();
};
