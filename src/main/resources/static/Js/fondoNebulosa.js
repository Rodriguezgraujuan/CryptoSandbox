/**
 * Esta función muestra el fondo de estrellas en todas las páginas menos en Registro, Login y Entrada (Invitado).
 *
 */

// Declaración de variables globales
let scene, camera, renderer, particles;

// Función de inicialización
function init() {
    // Creación de la escena
    scene = new THREE.Scene();

    // Creación de la cámara perspectiva
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Creación del renderizador WebGL
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Configuración de las partículas (estrellas)
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    // Generación de posiciones aleatorias para las partículas
    for (let i = 0; i < particleCount; i++) {
        let x = (Math.random() - 0.5) * 10;
        let y = (Math.random() - 0.5) * 10;
        let z = (Math.random() - 0.5) * 10;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }

    // Asignación de las posiciones a la geometría
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Carga de la textura de la estrella
    const textureLoader = new THREE.TextureLoader();
    const starTexture = textureLoader.load('https://threejs.org/examples/textures/sprites/spark1.png');

    // Creación del material de las partículas
    const material = new THREE.PointsMaterial({
        size: 0.2,
        map: starTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false
    });

    // Creación de las partículas y añadirlas a la escena
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Llamada a la función de animación
    animate();
}

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.001; // Rotación de las partículas
    renderer.render(scene, camera); // Renderizado de la escena
}

// Evento de redimensionamiento de la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Ajuste del tamaño del renderizador
    camera.aspect = window.innerWidth / window.innerHeight; // Ajuste del aspecto de la cámara
    camera.updateProjectionMatrix(); // Actualización de la matriz de proyección de la cámara
});

// Inicialización de la escena
init();