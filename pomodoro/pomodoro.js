const botoes = document.querySelectorAll('.pomodoro-card-button');

const focoBtn = document.getElementById('foco');
const descansoCurtoBtn = document.getElementById('curto');
const descansoLongoBtn = document.getElementById('longo');
const temporizador = document.querySelector('.temporizador');
const startPauseBtn = document.querySelector('#btn-time');

const tarefaInput = document.querySelector('#tarefa-input');
const tarefaList = document.querySelector('#tarefa-list');
const btnTarefa = document.querySelector('#btn-pomodoro');

let tarefas = [];

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto();
    focoBtn.classList.add('active');
})

descansoCurtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto();
    descansoCurtoBtn.classList.add('active');
})

descansoLongoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto();
    descansoLongoBtn.classList.add('active');
})

function alterarContexto() {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
}


function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'});
    console.log(tempoFormatado)
    temporizador.innerHTML = `${tempoFormatado}`;

}

const contagemRegressiva = () => {
    
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        alert('Tempo finalizado!');
        return
    }
    
    tempoDecorridoEmSegundos -= 1
    return mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar () {
    
    if (intervaloId) {
        zerar();
        return
    }
    
    intervaloId = setInterval(contagemRegressiva, 1000);
    startPauseBtn.textContent = "Pausar";
}

function zerar() {
    clearInterval(intervaloId);
    startPauseBtn.textContent = "Começar"
    intervaloId = null;
}

btnTarefa.addEventListener('click', () => {
    adicionarTarefa();
    console.log(tarefaInput.value);
});

function adicionarTarefa() {
    
    if (tarefaInput.value.trim() !== '') {
        const novaTarefa = {
            id: tarefas.length + 1,
            name: tarefaInput.value.trim(),
        };

        tarefas.push(novaTarefa);
        tarefaInput.value = '';
    }

 

    function deletarTarefa (tarefaId) {
        tarefas = tarefas.filter(tarefa => tarefa.id !== tarefaId);
    }
}