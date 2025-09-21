"use strict";
class Aluno {
    static getContador() {
        return Aluno.contadorId;
    }
    constructor(id = ++Aluno.contadorId, nome = "", idade = 0, altura = 0.0, peso = 0.0) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getIdade() {
        return this.idade;
    }
    setIdade(idade) {
        this.idade = idade;
    }
    getAltura() {
        return this.altura;
    }
    setAltura(altura) {
        this.altura = altura;
    }
    getPeso() {
        return this.peso;
    }
    setPeso(peso) {
        this.peso = peso;
    }
}
Aluno.contadorId = 0;
class Turma {
    constructor(id = ++Turma.contadorId, nome = "", listaDeAlunos = []) {
        this.id = id;
        this.nome = nome;
        this.listaDeAlunos = listaDeAlunos;
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getListaDeAlunos() {
        return this.listaDeAlunos;
    }
    setListaDeAlunos(lista) {
        this.listaDeAlunos = lista;
    }
    getNumAlunos() {
        return this.getListaDeAlunos().length;
    }
    adicionaAluno(aluno) {
        this.listaDeAlunos.push(aluno);
    }
    setListaAlunos(alunos) {
        this.listaDeAlunos = alunos;
    }
    removeAlunoPorId(id) {
        const alunos = this.listaDeAlunos.filter((aluno) => aluno.getId() !== id);
        this.setListaAlunos(alunos);
    }
    getAlunoPorId(id) {
        return this.listaDeAlunos.find((aluno) => aluno.getId() === id);
    }
    getMedia(func) {
        const totalAlunos = this.getNumAlunos();
        if (totalAlunos === 0)
            return "0.00";
        const acumulador = this.getListaDeAlunos().reduce((acc, aluno) => acc + func(aluno), 0);
        return (acumulador / totalAlunos).toFixed(2);
    }
    getMediaIdades() {
        return this.getMedia((aluno) => aluno.getIdade());
    }
    getMediaAlturas() {
        return this.getMedia((aluno) => aluno.getAltura());
    }
    getMediaPesos() {
        return this.getMedia((aluno) => aluno.getPeso());
    }
}
Turma.contadorId = 0;
const turma = new Turma();
const aluno1 = new Aluno();
const aluno2 = new Aluno();
const aluno3 = new Aluno();
aluno1.setAltura(170);
aluno1.setIdade(40);
aluno1.setNome("kleber");
aluno1.setPeso(80);
aluno2.setAltura(175);
aluno2.setIdade(13);
aluno2.setNome("ramilson");
aluno2.setPeso(73);
aluno3.setAltura(172);
aluno3.setIdade(14);
aluno3.setNome("Jeff");
aluno3.setPeso(72);
turma.adicionaAluno(aluno1);
turma.adicionaAluno(aluno2);
turma.adicionaAluno(aluno3);
// Manipulação Dom
const cardsContainer = document.getElementById("cardsContainer");
const formEdicao = document.getElementById("editForm");
const edicaoNome = document.getElementById("editName");
const edicaoAltura = document.getElementById("editHeight");
const edicaoPeso = document.getElementById("editWeight");
const edicaoIdade = document.getElementById("editAge");
const elementoModalEdicao = document.getElementById("editModal");
const elementoEstatistica = document.getElementById("estatistica");
const formAdicao = document.getElementById("addForm");
const adicionaNome = document.getElementById("name");
const adicionaAltura = document.getElementById("height");
const adicionaPeso = document.getElementById("weight");
const adicionaIdade = document.getElementById("age");
const adicionaModalElemento = document.getElementById("addModal");
function renderEstatisticas() {
    elementoEstatistica.innerHTML = `
    <p><strong>Número de alunos:</strong> ${turma.getNumAlunos()}</p>
    <p><strong>Média de Idade:</strong> ${turma.getMediaIdades()} anos</p>
    <p><strong>Média de Altura:</strong> ${turma.getMediaAlturas()} cm</p>
    <p><strong>Média de Peso:</strong> ${turma.getMediaPesos()} Kg</p>
  `;
}
function renderAlunos() {
    cardsContainer.innerHTML = "";
    for (let aluno of turma.getListaDeAlunos()) {
        const col = document.createElement("div");
        col.className = "col";
        col.innerHTML = `
      <div class="card">
        <div class="card-body bg-light">
          <h5 class="card-title">${aluno.getNome()}</h5>
          <p class="card-text"><small class="text-muted">
            Altura: ${aluno.getAltura()} cm
          </small></p>
          <p class="card-text"><small class="text-muted">
            Peso: ${aluno.getPeso()} Kg
          </small></p>
          <p class="card-text"><small class="text-muted">
            Idade: ${aluno.getIdade()}
          </small></p>
          
          <button 
            class="btn btn-warning w-100 mb-2 btn-edit" 
            data-bs-toggle="modal" 
            data-bs-target="#editModal"
            data-index="${aluno.getId()}">
            Editar
          </button>
          
          <button 
            class="btn btn-danger w-100 btn-delete" 
            data-index="${aluno.getId()}">
            Excluir
          </button>
        </div>
      </div>
    `;
        cardsContainer.appendChild(col);
    }
}
cardsContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("btn-delete")) {
        const id = parseInt(target.dataset.index);
        turma.removeAlunoPorId(id);
        renderEstatisticas();
        renderAlunos();
    }
    if (target.classList.contains("btn-edit")) {
        const id = parseInt(target.dataset.index);
        const aluno = turma.getAlunoPorId(id);
        if (aluno) {
            edicaoNome.value = aluno.getNome();
            edicaoAltura.value = aluno.getAltura().toString();
            edicaoPeso.value = aluno.getPeso().toString();
            edicaoIdade.value = aluno.getIdade().toString();
            formEdicao.dataset.id = id.toString();
        }
    }
});
formEdicao.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = parseInt(formEdicao.dataset.id);
    const aluno = turma.getAlunoPorId(id);
    if (aluno) {
        aluno.setNome(edicaoNome.value);
        aluno.setAltura(parseFloat(edicaoAltura.value));
        aluno.setPeso(parseFloat(edicaoPeso.value));
        aluno.setIdade(parseInt(edicaoIdade.value));
        renderEstatisticas();
        renderAlunos();
    }
});
formAdicao.addEventListener("submit", (e) => {
    e.preventDefault();
    const novoAluno = new Aluno();
    novoAluno.setNome(adicionaNome.value);
    novoAluno.setAltura(parseFloat(adicionaAltura.value));
    novoAluno.setPeso(parseFloat(adicionaPeso.value));
    novoAluno.setIdade(parseInt(adicionaIdade.value));
    turma.adicionaAluno(novoAluno);
    formAdicao.reset();
    renderAlunos();
    renderEstatisticas();
});
renderEstatisticas();
renderAlunos();
//# sourceMappingURL=main.js.map