function cameraInit() {
    camera = new THREE.PerspectiveCamera(55, 1, 1, 1500);
    camera.position.set(-141, 158, -127);
    camera.rotation.set(-2.7420254950766147, -0.795000662793939953, -2.848803611924398);
}

function lightsInit() {
    light = new THREE.AmbientLight(0x444444);
    light.intensity = 1.5
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-141, 158, -127);
    light.rotation.set(-2.7420254950766147, -0.795000662793939953, -2.848803611924398);
    light.intensity = .5
    scene.add(light);
}


function createSkyBox() {

    let size = 512
    let skyGeometry = new THREE.CubeGeometry(size, size*.75, size);

    let materialArray = [];
    for (let j = 0; j < 6; j++)
        materialArray.push(new THREE.MeshPhongMaterial({
            map: textureLoader.load("./textures/Scifi_Panel8_512_albedo.png"),
            // normalMap: THREE.ImageUtils.loadTexture("textures/Scifi_Panel8_512_normal.png"),
            side: THREE.BackSide,
        }));

    var skyBox = new THREE.Mesh(skyGeometry, materialArray);

    skyBox.position.x += 150
    skyBox.position.y += 150
    skyBox.position.z += 100

    scene.add(skyBox);
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(500, 500);
    renderer.setClearColor(0x666666, 1);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
}

function createControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 100, 0);
    controls.update();
}

function createMesh(geom, imageFile, normal) {
    if (normal) {
        var t = textureLoader.load("./textures/" + imageFile);
        var m = textureLoader.load("./textures/" + normal);

        // console.log(t, m)
        var mat2 = new THREE.MeshPhongMaterial({
            map: t,
            normalMap: m,
            transparent: true
        });

        var mesh = new THREE.Mesh(geom, mat2);
        // console.log(mesh)
        return mesh;
    } else {
        var t = textureLoader.load("./textures/" + imageFile);
        var mat1 = new THREE.MeshPhongMaterial({
            map: t
        })
        var mesh = new THREE.Mesh(geom, mat1);
        return mesh;
    }

    return mesh;
}