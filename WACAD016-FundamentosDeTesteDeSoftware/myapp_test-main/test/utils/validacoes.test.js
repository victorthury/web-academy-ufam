const {
  primeiroNome,
  verificarDisponibilidadeEstoque,
  calcularPrecoTotal,
} = require("../../src/utils/validacoes");

describe("primeiroNome()", () => {
  it("deve retornar o primeiro nome quando o nome completo é fornecido", () => {
    const fullName = "John Doe Etc";
    const result = primeiroNome(fullName);
    expect(result).toBe("John");
  });

  it("deve retornar o mesmo nome quando não há espaço em branco", () => {
    const name = "Alice";
    const result = primeiroNome(name);
    expect(result).toBe("Alice");
  });

  it("Deve retornar o primeiro nome corretamente quando há espaço em branco no ínicio", () => {
    const name = " Alice test";
    const result = primeiroNome(name);
    expect(result).toBe("Alice");
  });

  it("Deve retornar o primeiro nome corretamente quando há espaço em branco no final", () => {
    const name = "Alice Test ";
    const result = primeiroNome(name);
    expect(result).toBe("Alice");
  });
});

describe("verificarDisponibilidadeEstoque()", () => {
  it("Deve retornar true quando a quantidade for 10 para o produto 'laptop'", () => {
    const result = verificarDisponibilidadeEstoque("laptop", 10);
    expect(result).toBe(true);
  });

  it("Deve retornar false quando a quantidade for diferente da disponível", () => {
    const result = verificarDisponibilidadeEstoque("laptop", 9);
    expect(result).toBe(false);
  });

  // Acredito que fazer pra cada produto não seja necessário
});

describe("calcularPrecoTotal()", () => {
  it("Deve retornar o valor total para dado array de produtos", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    const valorEsperado = 70;
    const result = calcularPrecoTotal(produtos);
    expect(result).toEqual(valorEsperado);
  });
});
