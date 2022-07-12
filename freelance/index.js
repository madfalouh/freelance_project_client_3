import * as THREE from 'three'


import ThreeGlobe from 'three-globe';
import { WebGLRenderer, Scene } from "three";
import {
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  // AxesHelper,
  // DirectionalLightHelper,
  // CameraHelper,
  PointLight,
  SphereGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "./files/globe-data-min.json";
import travelHistory from "./files/my-flights.json";
import airportHistory from "./files/my-airports.json";


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Flow } from 'three/examples/jsm/modifiers/CurveModifier';


			const params = {
				exposure: 1,
				bloomStrength: .05,
				bloomThreshold: 0,
				bloomRadius: 215,
				scene: 'Scene with Glow'

			};

const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

		const bloomLayer = new THREE.Layers();
			bloomLayer.set( BLOOM_SCENE );
var renderer, camera, scene, controls,composer,cylinderc,curve,flow,fraction=0.1;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
var Globe;
import {MeshLine,MeshLineMaterial,MeshLineRaycast} from 'three.meshline'
init()
animate();

// SECTION Initializing core ThreeJS elements
function init() {
  // Initialize renderer
  renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  // Initialize scene, light
  scene = new Scene();
  scene.add(new AmbientLight(0xbbbbbb, 0.3));
  scene.background = new Color(0x040d21);

  // Initialize camera, light
  camera = new PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  var dLight = new DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new DirectionalLight(0x7982f6, 1);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  var dLight2 = new PointLight(0x8566cc, 0.5);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);

  camera.position.z = 900;
  camera.position.x = 0;
  camera.position.y = 0;
  scene.add(camera);
  scene.fog = new Fog(0x535ef3, 400, 2000);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dynamicDampingFactor = 0.01;
  controls.enablePan = false;

  controls.rotateSpeed = 0.8;
  controls.zoomSpeed = 1;
  controls.autoRotate = false;
const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );
const renderScene = new RenderPass( scene, camera );
const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;
composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );


 curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( 0, 50 ,0),
	new THREE.Vector3( 0, 10 ,0),
	new THREE.Vector3( 0, -90 ,0),
	new THREE.Vector3( 0, -80,150 )
] );

const points = curve.getPoints( 250 );
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new MeshLine();
line.setGeometry(geometry);


const curve1 = new THREE.SplineCurve( [
	new THREE.Vector2( 0, 0 ),
	new THREE.Vector2(0, 0 ),
	new THREE.Vector2( 30, 10 ),
	new THREE.Vector2( 40, 30 ),
	new THREE.Vector2( 100, 30 ),

] );

const points1 = curve1.getPoints( 250 );
const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
const line1 = new MeshLine();
line1.setGeometry(geometry1);

var material1 = new MeshLineMaterial({color: new THREE.Color(0xff0000), lineWidth:2 }) ; 

const curve2 = new THREE.SplineCurve( [
	new THREE.Vector2( 0, 0 ),
	new THREE.Vector2(0, 0 ),
	new THREE.Vector2( 30, 10 ),
	new THREE.Vector2( 40, 30 ),
	new THREE.Vector2( 100, 30 ),

] );

const points2 = curve2.getPoints( 250 );
const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
const line2 = new MeshLine();
line2.setGeometry(geometry2);

var material2 = new MeshLineMaterial({color: new THREE.Color(0xff0000), lineWidth:2 }) ; 

var mesh1 = new THREE.Mesh(line2 , material2)





var material = new MeshLineMaterial({color: new THREE.Color(0xFF0000), lineWidth:5 }) ; 

var mesh = new THREE.Mesh(line , material)
var mesh1 = new THREE.Mesh(line1 , material1)
var mesh2 = new THREE.Mesh(line2 , material2)
scene.add(mesh1)
scene.add(mesh2)



mesh.layers.disable(BLOOM_SCENE)
mesh1.rotateX(15)
mesh1.rotateY(0)
mesh1.rotateZ(5)

mesh2.rotateX(15)
mesh2.rotateY(3)
mesh2.rotateZ(5)

mesh1.position.x=1
mesh1.position.y=-100

mesh2.position.y=-60
scene.add(mesh)
const geometryc = new THREE.CylinderGeometry( 1, 1, 20, 32 );
const materialc = new THREE.MeshBasicMaterial( {color: 0xffff00} );
cylinderc = new THREE.Mesh( geometryc, materialc );
scene.add( cylinderc );

cylinderc.position.y=0
cylinderc.position.z=0
cylinderc.rotateX(Math.PI/2-0.3)


const geometryr = new THREE.BoxGeometry( 0.2, 0.08, 0.05 );
const materialr = new THREE.MeshPhongMaterial( { color: 0x99ffff, wireframe: false } );
const objectToCurver = new THREE.Mesh( geometryr, materialr );

flow = new Flow( objectToCurver ); 
flow.updateCurve( 0, curve );
scene.add( flow.object3D );


}

function animate() {

  requestAnimationFrame(animate);
	composer.render();



fraction += 0.001; 


cylinderc.position.x=curve.getPoint(fraction).x
cylinderc.position.y=curve.getPoint(fraction).y
cylinderc.position.z=curve.getPoint(fraction).z










  //controls.update();
  //renderer.render(scene, camera);










}




