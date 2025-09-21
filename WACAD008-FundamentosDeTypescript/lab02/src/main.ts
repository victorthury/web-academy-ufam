class Aluno {
  static contadorId: number = 0;

  static getContador(): number {
    return Aluno.contadorId;
  }

  constructor(
    private id: number = ++Aluno.contadorId,
    private nome: string = "",
    private idade: number = 0,
    private altura: number = 0.0,
    private peso: number = 0.0
  ) {}

  public getId(): number {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getIdade(): number {
    return this.idade;
  }

  public setIdade(idade: number): void {
    this.idade = idade;
  }

  public getAltura(): number {
    return this.altura;
  }

  public setAltura(altura: number): void {
    this.altura = altura;
  }

  public getPeso(): number {
    return this.peso;
  }

  public setPeso(peso: number): void {
    this.peso = peso;
  }
}

interface ITurma {
  getNumAlunos(): number;
  getMediaIdades(): string;
  getMediaAlturas(): string;
  getMediaPesos(): string;
  adicionaAluno(aluno: Aluno): void;
  removeAlunoPorId(id: number): void;
  getAlunoPorId(id: number): Aluno | undefined;
}

class Turma implements ITurma {
  static contadorId: number = 0;

  constructor(
    private id: number = ++Turma.contadorId,
    private nome: string = "",
    private listaDeAlunos: Aluno[] = []
  ) {}

  public getId(): number {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getListaDeAlunos(): Aluno[] {
    return this.listaDeAlunos;
  }

  public setListaDeAlunos(lista: Aluno[]): void {
    this.listaDeAlunos = lista;
  }

  public getNumAlunos(): number {
    return this.getListaDeAlunos().length;
  }

  public adicionaAluno(aluno: Aluno): void {
    this.listaDeAlunos.push(aluno);
  }

  public setListaAlunos(alunos: Aluno[]): void {
    this.listaDeAlunos = alunos;
  }

  public removeAlunoPorId(id: number): void {
    const alunos = this.listaDeAlunos.filter((aluno) => aluno.getId() !== id);
    this.setListaAlunos(alunos);
  }

  public getAlunoPorId(id: number): Aluno | undefined {
    return this.listaDeAlunos.find((aluno) => aluno.getId() === id);
  }

  private getMedia(func: (aluno: Aluno) => number): string {
    const totalAlunos = this.getNumAlunos();
    if (totalAlunos === 0) return "0.00";

    const acumulador = this.getListaDeAlunos().reduce(
      (acc, aluno) => acc + func(aluno),
      0
    );
    return (acumulador / totalAlunos).toFixed(2);
  }

  public getMediaIdades(): string {
    return this.getMedia((aluno: Aluno) => aluno.getIdade());
  }

  public getMediaAlturas(): string {
    return this.getMedia((aluno: Aluno) => aluno.getAltura());
  }

  public getMediaPesos(): string {
    return this.getMedia((aluno: Aluno) => aluno.getPeso());
  }
}

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

const cardsContainer = document.getElementById(
  "cardsContainer"
) as HTMLDivElement;

const formEdicao = document.getElementById("editForm") as HTMLFormElement;
const edicaoNome = document.getElementById("editName") as HTMLInputElement;
const edicaoAltura = document.getElementById("editHeight") as HTMLInputElement;
const edicaoPeso = document.getElementById("editWeight") as HTMLInputElement;
const edicaoIdade = document.getElementById("editAge") as HTMLInputElement;
const elementoModalEdicao = document.getElementById("editModal")!;
const elementoEstatistica = document.getElementById(
  "estatistica"
) as HTMLDivElement;

const formAdicao = document.getElementById("addForm") as HTMLFormElement;
const adicionaNome = document.getElementById("name") as HTMLInputElement;
const adicionaAltura = document.getElementById("height") as HTMLInputElement;
const adicionaPeso = document.getElementById("weight") as HTMLInputElement;
const adicionaIdade = document.getElementById("age") as HTMLInputElement;
const adicionaModalElemento = document.getElementById("addModal")!;

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
  const target = e.target as HTMLElement;

  if (target.classList.contains("btn-delete")) {
    const id = parseInt(target.dataset.index!);
    turma.removeAlunoPorId(id);
    renderEstatisticas();
    renderAlunos();
  }

  if (target.classList.contains("btn-edit")) {
    const id = parseInt(target.dataset.index!);
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

  const id = parseInt(formEdicao.dataset.id!);
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
