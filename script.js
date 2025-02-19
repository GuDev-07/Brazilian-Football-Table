function mostrarAlerta(time) {
    window.alert('Este time foi rebaixado!');
}

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

// Configura o tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Classe para os fogos de artifício
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 8 + 8; // Velocidade dos fogos
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Cores aleatórias
        this.alpha = 1;
        this.size = Math.random() * 10 + 2;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.y -= this.speed;
        this.alpha -= 0.02;
    }
}

let fireworks = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach(fw => {
        fw.update();
        fw.draw();
    });

    fireworks = fireworks.filter(fw => fw.alpha > 0);
    requestAnimationFrame(animate);
}

// Criar fogos automaticamente a cada 500ms
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    
    for (let i = 0; i < 10; i++) {
        fireworks.push(new Firework(x + (Math.random() * 20 - 10), y));
    }
}, 500);

// Inicia a animação
animate();
