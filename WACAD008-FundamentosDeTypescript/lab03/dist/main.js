"use strict";
var _a, _b, _c;
class TV {
    constructor(resolucao = "", tamanhoPolegadas = 0) {
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
        this.modelo = "";
        this.fabricante = "";
        this.valor = 0.0;
    }
    getModelo() {
        return this.modelo;
    }
    setModelo(valor) {
        this.modelo = valor;
    }
    getFabricante() {
        return this.fabricante;
    }
    setFabricante(valor) {
        this.fabricante = valor;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getResolucao() {
        return this.resolucao;
    }
    setResolucao(valor) {
        this.resolucao = valor;
    }
    getTamanhoPolegadas() {
        return this.tamanhoPolegadas;
    }
    setTamanhoPolegadas(valor) {
        this.tamanhoPolegadas = valor;
    }
    getDescricao() {
        return `Tv - ${this.getFabricante()} - ${this.getModelo()} - ${this.getResolucao()} - ${this.getTamanhoPolegadas()}"`;
    }
}
class Celular {
    constructor(memoriaGB = 0) {
        this.memoriaGB = memoriaGB;
        this.modelo = "";
        this.fabricante = "";
        this.valor = 0.0;
    }
    getModelo() {
        return this.modelo;
    }
    setModelo(valor) {
        this.modelo = valor;
    }
    getFabricante() {
        return this.fabricante;
    }
    setFabricante(valor) {
        this.fabricante = valor;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getMemoriaGB() {
        return this.memoriaGB;
    }
    setMemoriaGB(valor) {
        this.memoriaGB = valor;
    }
    getDescricao() {
        return `Celular - ${this.getFabricante()} - ${this.getModelo()} - ${this.getMemoriaGB()}`;
    }
}
class Bicicleta {
    constructor(tamanhoDoAro = 0) {
        this.tamanhoDoAro = tamanhoDoAro;
        this.modelo = "";
        this.fabricante = "";
        this.valor = 0.0;
    }
    getModelo() {
        return this.modelo;
    }
    setModelo(valor) {
        this.modelo = valor;
    }
    getFabricante() {
        return this.fabricante;
    }
    setFabricante(valor) {
        this.fabricante = valor;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getTamanhoDoAro() {
        return this.tamanhoDoAro;
    }
    setTamanhoDoAro(valor) {
        this.tamanhoDoAro = valor;
    }
    getDescricao() {
        return `Bicicleta - ${this.getFabricante()} - ${this.getModelo()} - ${this.getTamanhoDoAro()}`;
    }
}
class Carrinho {
    constructor(itens = []) {
        this.itens = itens;
    }
    adiciona(item) {
        this.itens.push(item);
    }
    getItens() {
        return this.itens;
    }
    getValorTotal() {
        return this.itens.reduce((soma, item) => soma + item.getValor(), 0);
    }
    remove(index) {
        this.itens.splice(index, 1);
    }
}
const carrinho = new Carrinho();
function renderCarrinho() {
    const tbody = document.getElementById("tableBody");
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
            const index = parseInt(ev.target.dataset.index);
            carrinho.remove(index);
            renderAll();
        });
    });
}
function renderEstatisticas() {
    const statsList = document.getElementById("statsList");
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
(_a = document.querySelector("#modalTv form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
    event.preventDefault();
    const modelo = document.getElementById("modeloTv")
        .value;
    const fabricante = document.getElementById("fabricanteTv").value;
    const valor = parseFloat(document.getElementById("priceTv").value);
    const resolucao = document.getElementById("resolução")
        .value;
    const polegadas = parseInt(document.getElementById("polegadas").value);
    const tv = new TV(resolucao, polegadas);
    tv.setModelo(modelo);
    tv.setFabricante(fabricante);
    tv.setValor(valor);
    carrinho.adiciona(tv);
    renderAll();
    event.target.reset();
});
(_b = document
    .querySelector("#modalCelular form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (event) => {
    event.preventDefault();
    const modelo = document.getElementById("modeloCellphone").value;
    const fabricante = document.getElementById("fabricanteCellphone").value;
    const valor = parseFloat(document.getElementById("priceCellphone").value);
    const memoria = parseInt(document.getElementById("memory").value);
    const celular = new Celular(memoria);
    celular.setModelo(modelo);
    celular.setFabricante(fabricante);
    celular.setValor(valor);
    carrinho.adiciona(celular);
    renderAll();
    event.target.reset();
});
(_c = document
    .querySelector("#modalBicicleta form")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", (event) => {
    event.preventDefault();
    const modelo = document.getElementById("modeloBike")
        .value;
    const fabricante = document.getElementById("fabricanteBike").value;
    const valor = parseFloat(document.getElementById("priceBike").value);
    const aro = parseInt(document.getElementById("aro").value);
    const bike = new Bicicleta(aro);
    bike.setModelo(modelo);
    bike.setFabricante(fabricante);
    bike.setValor(valor);
    carrinho.adiciona(bike);
    renderAll();
    event.target.reset();
});
renderAll();
//# sourceMappingURL=main.js.map