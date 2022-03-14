const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li){
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    li.appendChild(botaoApagar);
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'apagar essa tarefa');
}

function criaLi(){
    const li = document.createElement('li');
    return li;
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefa();
}

btnTarefa.addEventListener('click', function(){
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefa();
    }
});

function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaTarefas = [];
    
    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function addTarefaSalva(){
    const tarefas = localStorage.getItem('tarefas');
    const listaTarefas = JSON.parse(tarefas);

    for (let tarefa of listaTarefas) {
        criaTarefa(tarefa);
    }
}

addTarefaSalva();