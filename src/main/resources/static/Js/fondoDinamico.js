// Clase para manejar las estrellas
let Stars = function(args) {
    if (args === undefined) args = {};
    let _scope = this;

    this.stars = [];
    this.vel = args.vel || 1;
    this.radius = args.radius || 1;
    this.alpha = 0.5;
    this.starsCounter = args.stars || 300;
    let center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    let canvas, context;

    // Inicializa el canvas y los eventos necesarios
    this.init = function() {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        context = canvas.getContext("2d");
        context.lineCap = "round";
        this.start();
        this.resize();
        // Escucha el evento de redimensionamiento para ajustar el canvas
        //
        window.addEventListener("resize", this.resize.bind(this));
    }

    // Comienza la creación de estrellas
    this.start = function() {
        this.stars = [];
        for (let i = 0; i < this.starsCounter; i++) {
            setTimeout(function() {
            setTimeout(function(){
                _scope.stars.push(new Star());
            }, i * 30);
            }, i*30);
        }
    }

    // Ajusta el tamaño del canvas a las dimensiones de la ventana
    this.resize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        center.x = canvas.width / 2;
        center.y = canvas.height / 2;
    }

    // Anima las estrellas continuamente
    this.animate = function() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    // Renderiza el fondo de estrellas
    this.render = function() {
        context.fillStyle = 'rgba(1, 4, 35, 0.8)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "white";
        for (let i = 0; i < this.stars.length; i++) this.stars[i].update();
    }

    // Clase interna para representar una estrella
    let Star = function() {
        this.x = center.x;
        this.y = center.y;

        // Inicializa las propiedades de la estrella
        this.init = function() {
            this.radius = Math.random() * _scope.radius;
            this.x = center.x;
            this.y = center.y;
            this.lineWidth = 0;
            this.vel = {
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5
            }
        }

        // Actualiza el estado de la estrella
        this.update = function() {
            this.vel.x *= 1;
            this.vel.y *= 1;
            this.lineWidth += 0.035;
            this.x0 = this.x;
            this.y0 = this.y;
            this.x += this.vel.x;
            this.y += this.vel.y;
            this.draw();
            if (this.isDead()) this.init();
        }

        // Dibuja la estrella en el canvas
        this.draw = function() {
            context.beginPath();
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x, this.y);
            context.lineWidth = this.lineWidth;
            context.stroke();
        }

        // Comprueba si la estrella se ha salido de los límites del canvas
        this.isDead = function() {
            return (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height);
        }

        this.init();
        return this;
    }

    this.init();
    this.animate();
    return this;
}

let _stars = new Stars();
