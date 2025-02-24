    let scene, camera, renderer, particles;

    function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
    let x = (Math.random() - 0.5) * 10;
    let y = (Math.random() - 0.5) * 10;
    let z = (Math.random() - 0.5) * 10;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
}

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const textureLoader = new THREE.TextureLoader();
    const starTexture = textureLoader.load('https://threejs.org/examples/textures/sprites/spark1.png');

    const material = new THREE.PointsMaterial({
    size: 0.2,
    map: starTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false
});

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    animate();
}

    function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
}

    window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

    init();
