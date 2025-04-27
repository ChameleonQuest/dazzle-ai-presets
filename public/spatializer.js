import * as THREE from 'https://unpkg.com/three@0.163.0/build/three.module.js';
import { ARButton } from 'https://unpkg.com/three@0.163.0/examples/jsm/webxr/ARButton.js';

export function spatialize() {
  let camera, scene, renderer;
  const spatialElements = [];

  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(0, 0, 1);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    const arButton = ARButton.createButton(renderer, {
      requiredFeatures: ['hit-test', 'dom-overlay'],
      domOverlay: { root: document.body }
    });

    document.body.appendChild(arButton);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const elements = document.querySelectorAll('[data-spatializer]');

    elements.forEach(element => {
      const spatializerValue = element.getAttribute('data-spatializer');
      try {
        const position = JSON.parse(spatializerValue);
        if (Array.isArray(position) && position.length === 3 && position.every(num => typeof num === 'number')) {
          const { anchor } = createSpatialElement(element, position);
          const lockedTo = element.getAttribute('data-spatializer-lockedto');
          spatialElements.push({ anchor, element, lockedTo });
          element.style.display = 'none';
        } else {
          console.warn(`Invalid data-spatializer value: "${spatializerValue}" on element:`, element);
        }
      } catch (error) {
        console.error(`Error parsing data-spatializer value: "${spatializerValue}" on element:`, element, error);
      }
    });

    window.addEventListener('resize', onWindowResize);
  }

  function createSpatialElement(element, position) {
    const anchor = new THREE.Object3D();
    anchor.position.set(...position);
    scene.add(anchor);

    return { anchor, element };
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
      for (const e of spatialElements) {  
      // for (const { anchor, element, lockedTo } of spatialElements) {
        if (e.lockedTo === 'head') {
          const fixedDistance = -0.8;
          const cameraWorldPosition = new THREE.Vector3();
          camera.getWorldPosition(cameraWorldPosition);
  
          const cameraDirection = new THREE.Vector3();
          camera.getWorldDirection(cameraDirection);
          cameraDirection.multiplyScalar(fixedDistance);
  
          e.anchor.position.copy(cameraWorldPosition).add(cameraDirection);
          e.anchor.rotation.copy(camera.rotation);
        }
  
        const vector = e.anchor.position.clone().project(camera);
        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
        e.element.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        e.element.style.display = 'block';
      }
    });
  }
}

spatialize();
