const input = document.querySelector('input'),
    adivinhe = document.querySelector('.adivinhe'),
    checkButton = document.querySelector('button'),
    chancesRestantes = document.querySelector('.chances');

// Função para inicializar ou reiniciar o jogo
function iniciarJogo() {
    input.focus();
    randomNum = Math.floor(Math.random() * 100);
    chance = 7;
    input.disabled = false;
    input.value = "";
    adivinhe.textContent = "Adivinhe o número";
    adivinhe.style.color = "#000";
    chancesRestantes.textContent = chance;
    checkButton.textContent = "Checar";
}

iniciarJogo();

checkButton.addEventListener('click', () => {
    if (checkButton.textContent === "Recomeçar") {
        iniciarJogo();
        return;
    }
    
    // Pega o valor que está no input
    let valorInput = input.value;
    
    // Verifica se o valor do input é o mesmo que o número aleatório
    if (valorInput == randomNum) {
        // Texto de adivinhe vira parabens, o botão de check é desabilitado
        [adivinhe.textContent, input.disabled] = ["Parabéns", true];
        [checkButton.textContent, adivinhe.style.color] = ["Recomeçar", '#333'];
    } else {
        // Diminui uma chance a cada clique no botão de checar
        chance--;

        // Checa se o valor do input é maior que o aleatorio e menor que 100
        if (valorInput > randomNum && valorInput < 100) {
            [adivinhe.textContent, chancesRestantes.textContent] = ["Seu chute é maior", chance];
            adivinhe.style.color = "#333";
        } else if (valorInput < randomNum && valorInput > 0) {
            // Checa se o valor do input é menor que o aleatorio e maior que 0
            [adivinhe.textContent, chancesRestantes.textContent] = ["Seu chute é menor", chance];
            adivinhe.style.color = "#333";
        } else {
            // Se o número não for valido (não for de 0 a 100)
            [adivinhe.textContent, chancesRestantes.textContent] = ["Seu chute é inválido", chance];
            adivinhe.style.color = "#DE6011";
        }

        // Verifica se as chances acabaram
        if (chance == 0) {
            [checkButton.textContent, input.disabled] = ["Recomeçar", true];
            [adivinhe.textContent, adivinhe.style.color] = ["Você perdeu, o número era " + randomNum, "#DE0611"];
        }
    }
});

// Ao dar enter no input, o botão de check é clicado
input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        checkButton.click();
    }
});
