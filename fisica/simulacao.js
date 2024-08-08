const canvas = document.getElementById('canvasSimulacao');
const ctx = canvas.getContext('2d');

let bloco1, bloco2;
let contadorColisoes = 0;
let velocidadeTempo = 1;

function inicializarBlocos() {
    const massa1 = parseFloat(document.getElementById('massa1').value);
    const velocidade1 = parseFloat(document.getElementById('velocidade1').value);
    const massa2 = parseFloat(document.getElementById('massa2').value);
    const velocidade2 = parseFloat(document.getElementById('velocidade2').value);

    bloco1 = {
        x: 150,
        y: 80,
        largura: 40,
        altura: 40,
        cor: 'blue',
        vx: velocidade1,
        massa: massa1
    };

    bloco2 = {
        x: 650,
        y: 80,
        largura: 40,
        altura: 40,
        cor: 'red',
        vx: velocidade2,
        massa: massa2
    };

    // Resetar contador de colisões
    contadorColisoes = 0;
    atualizarContadorColisoes();
}

function desenharBloco(bloco) {
    ctx.fillStyle = bloco.cor;
    ctx.fillRect(bloco.x, bloco.y, bloco.largura, bloco.altura);
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText(`v: ${bloco.vx.toFixed(2)}`, bloco.x, bloco.y - 5);
}

function atualizarPosicaoBloco(bloco) {
    bloco.x += bloco.vx * velocidadeTempo;
}

function verificarColisaoParede(bloco) {
    if (bloco.x <= 0 || bloco.x + bloco.largura >= canvas.width) {
        bloco.vx *= -1;
    }
}

function verificarColisao(bloco1, bloco2) {
    const colidindo = bloco1.x < bloco2.x + bloco2.largura &&
                      bloco1.x + bloco1.largura > bloco2.x &&
                      bloco1.y < bloco2.y + bloco2.altura &&
                      bloco1.y + bloco1.altura > bloco2.y;

    if (colidindo) {
        const massaTotal = bloco1.massa + bloco2.massa;
        const novaVx1 = (bloco1.vx * (bloco1.massa - bloco2.massa) + (2 * bloco2.massa * bloco2.vx)) / massaTotal;
        const novaVx2 = (bloco2.vx * (bloco2.massa - bloco1.massa) + (2 * bloco1.massa * bloco1.vx)) / massaTotal;

        bloco1.vx = novaVx1;
        bloco2.vx = novaVx2;

        // Ajustar as posições para evitar sobreposição
        const sobreposicao = (bloco1.x + bloco1.largura) - bloco2.x;
        bloco1.x -= sobreposicao / 2;
        bloco2.x += sobreposicao / 2;

        // Incrementar contador de colisões
        contadorColisoes++;
        atualizarContadorColisoes();
    }
}

function atualizarContadorColisoes() {
    document.getElementById('contadorColisoes').innerText = contadorColisoes;
}

function limparCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function atualizar() {
    limparCanvas();
    desenharBloco(bloco1);
    desenharBloco(bloco2);
    atualizarPosicaoBloco(bloco1);
    atualizarPosicaoBloco(bloco2);
    verificarColisaoParede(bloco1);
    verificarColisaoParede(bloco2);
    verificarColisao(bloco1, bloco2);
    requestAnimationFrame(atualizar);
}

function iniciarSimulacao() {
    inicializarBlocos();
    atualizar();
}
