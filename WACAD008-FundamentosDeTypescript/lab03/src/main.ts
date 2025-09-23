interface Produto {
  modelo: string;
  fabricante: string;
  valor: number;
  getModelo(): string;
  setModelo(valor: string): void;

  getFabricante(): string;
  setFabricante(valor: string): void;

  getValor(): number;
  setValor(valor: number): void;

  getDescricao(): string;
}

class TV implements Produto {
  modelo: string = "";
  fabricante: string = "";
  valor: number = 0.0;

  constructor(
    private resolucao: string = "",
    private tamanhoPolegadas: number = 0
  ) {}

  getModelo(): string {
    return this.modelo;
  }
  setModelo(valor: string): void {
    this.modelo = valor;
  }

  getFabricante(): string {
    return this.fabricante;
  }
  setFabricante(valor: string): void {
    this.fabricante = valor;
  }

  getValor(): number {
    return this.valor;
  }
  setValor(valor: number): void {
    this.valor = valor;
  }

  getResolucao(): string {
    return this.resolucao;
  }
  setResolucao(valor: string): void {
    this.resolucao = valor;
  }

  getTamanhoPolegadas(): number {
    return this.tamanhoPolegadas;
  }
  setTamanhoPolegadas(valor: number): void {
    this.tamanhoPolegadas = valor;
  }

  getDescricao(): string {
    return `Tv - ${this.getFabricante()} - ${this.getModelo()} - ${this.getResolucao()} - ${this.getTamanhoPolegadas()}"`;
  }
}

class Celular implements Produto {
  modelo: string = "";
  fabricante: string = "";
  valor: number = 0.0;

  constructor(private memoriaGB: number = 0) {}

  getModelo(): string {
    return this.modelo;
  }
  setModelo(valor: string): void {
    this.modelo = valor;
  }

  getFabricante(): string {
    return this.fabricante;
  }
  setFabricante(valor: string): void {
    this.fabricante = valor;
  }

  getValor(): number {
    return this.valor;
  }
  setValor(valor: number): void {
    this.valor = valor;
  }

  getMemoriaGB(): number {
    return this.memoriaGB;
  }
  setMemoriaGB(valor: number): void {
    this.memoriaGB = valor;
  }

  getDescricao(): string {
    return `Celular - ${this.getFabricante()} - ${this.getModelo()} - ${this.getMemoriaGB()} Gb`;
  }
}

class Bicicleta implements Produto {
  modelo: string = "";
  fabricante: string = "";
  valor: number = 0.0;

  constructor(private tamanhoDoAro: number = 0) {}

  getModelo(): string {
    return this.modelo;
  }
  setModelo(valor: string): void {
    this.modelo = valor;
  }

  getFabricante(): string {
    return this.fabricante;
  }
  setFabricante(valor: string): void {
    this.fabricante = valor;
  }

  getValor(): number {
    return this.valor;
  }
  setValor(valor: number): void {
    this.valor = valor;
  }

  getTamanhoDoAro(): number {
    return this.tamanhoDoAro;
  }
  setTamanhoDoAro(valor: number): void {
    this.tamanhoDoAro = valor;
  }

  getDescricao(): string {
    return `Bicicleta - ${this.getFabricante()} - ${this.getModelo()} - ${this.getTamanhoDoAro()}`;
  }
}

class Carrinho<T extends Produto> {
  constructor(private itens: T[] = []) {}

  adiciona(item: T): void {
    this.itens.push(item);
  }

  getItens(): T[] {
    return this.itens;
  }

  getValorTotal(): number {
    return this.itens.reduce((soma, item) => soma + item.getValor(), 0);
  }

  remove(index: number): void {
    this.itens.splice(index, 1);
  }
}

const carrinho = new Carrinho<Produto>();

function renderCarrinho() {
  const tbody = document.getElementById("tableBody") as HTMLTableSectionElement;
  tbody.innerHTML = "";

  carrinho.getItens().forEach((item, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.getDescricao()}</td>
      <td>R$ ${item.getValor().toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm" data-index="${index}">Remover</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  tbody.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const index = parseInt((ev.target as HTMLButtonElement).dataset.index!);
      carrinho.remove(index);
      renderAll();
    });
  });
}

function renderEstatisticas() {
  const statsList = document.getElementById("statsList") as HTMLUListElement;
  statsList.innerHTML = "";

  const itens = carrinho.getItens();
  const totalItens = itens.length;
  const valorTotal = carrinho.getValorTotal();

  const liQtd = document.createElement("li");
  liQtd.className = "list-group-item";
  liQtd.textContent = `Quantidade de produtos: ${totalItens}`;

  const liValor = document.createElement("li");
  liValor.className = "list-group-item";
  liValor.textContent = `Valor total: R$ ${valorTotal.toFixed(2)}`;

  statsList.appendChild(liQtd);
  statsList.appendChild(liValor);
}

function renderAll() {
  renderCarrinho();
  renderEstatisticas();
}

document.querySelector("#modalTv form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const modelo = (document.getElementById("modeloTv") as HTMLInputElement)
    .value;
  const fabricante = (
    document.getElementById("fabricanteTv") as HTMLInputElement
  ).value;
  const valor = parseFloat(
    (document.getElementById("priceTv") as HTMLInputElement).value
  );
  const resolucao = (document.getElementById("resolução") as HTMLInputElement)
    .value;
  const polegadas = parseInt(
    (document.getElementById("polegadas") as HTMLInputElement).value
  );

  const tv = new TV(resolucao, polegadas);
  tv.setModelo(modelo);
  tv.setFabricante(fabricante);
  tv.setValor(valor);

  carrinho.adiciona(tv);
  renderAll();

  (event.target as HTMLFormElement).reset();
});

document
  .querySelector("#modalCelular form")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();

    const modelo = (
      document.getElementById("modeloCellphone") as HTMLInputElement
    ).value;
    const fabricante = (
      document.getElementById("fabricanteCellphone") as HTMLInputElement
    ).value;
    const valor = parseFloat(
      (document.getElementById("priceCellphone") as HTMLInputElement).value
    );
    const memoria = parseInt(
      (document.getElementById("memory") as HTMLInputElement).value
    );

    const celular = new Celular(memoria);
    celular.setModelo(modelo);
    celular.setFabricante(fabricante);
    celular.setValor(valor);

    carrinho.adiciona(celular);
    renderAll();

    (event.target as HTMLFormElement).reset();
  });

document
  .querySelector("#modalBicicleta form")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();

    const modelo = (document.getElementById("modeloBike") as HTMLInputElement)
      .value;
    const fabricante = (
      document.getElementById("fabricanteBike") as HTMLInputElement
    ).value;
    const valor = parseFloat(
      (document.getElementById("priceBike") as HTMLInputElement).value
    );
    const aro = parseInt(
      (document.getElementById("aro") as HTMLInputElement).value
    );

    const bike = new Bicicleta(aro);
    bike.setModelo(modelo);
    bike.setFabricante(fabricante);
    bike.setValor(valor);

    carrinho.adiciona(bike);
    renderAll();

    (event.target as HTMLFormElement).reset();
  });

renderAll();
