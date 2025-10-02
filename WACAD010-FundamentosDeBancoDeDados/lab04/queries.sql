CREATE TABLE clientes (
  cpf CHAR(11) PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  celular VARCHAR(14) NOT NULL,
  data_de_nascimento DATE NOT NULL
);

CREATE TABLE enderecos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cep CHAR(8) NOT NULL,
  rua VARCHAR(255) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  bairro VARCHAR(255) NOT NULL,
  cidade VARCHAR(255) NOT NULL,
  estado CHAR(2) NOT NULL,
  cpf_cliente CHAR(11) NOT NULL,
  FOREIGN KEY (cpf_cliente) REFERENCES clientes (cpf)
);

CREATE TABLE compra (
  id INT AUTO_INCREMENT PRIMARY KEY,
  desconto INT UNSIGNED NOT NULL,
  forma_de_pagamento VARCHAR(255) NOT NULL,
  cpf_cliente CHAR(11) NOT NULL,
  id_endereco INT NOT NULL,
  FOREIGN KEY (cpf_cliente) REFERENCES clientes (cpf),
  FOREIGN KEY (id_endereco) REFERENCES enderecos (id)
);

CREATE TABLE categoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL
);

CREATE TABLE sub_categoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  id_categoria INT NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categoria (id)
);

CREATE TABLE produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fabricante VARCHAR(255) NOT NULL,
  modelo VARCHAR(255) NOT NULL,
  preco_base DECIMAL(10, 2) NOT NULL,
  qtd_disponivel INT UNSIGNED NOT NULL,
  id_sub_categoria INT NOT NULL,
  FOREIGN KEY (id_sub_categoria) REFERENCES sub_categoria (id)
);

CREATE TABLE item_compra (
  id_compra INT NOT NULL,
  id_produto INT NOT NULL,
  quantidade INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_compra, id_produto),
  FOREIGN KEY (id_produto) REFERENCES produto (id),
  FOREIGN KEY (id_compra) REFERENCES compra (id)
);

