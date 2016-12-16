function Animal(n) {
  return {
    nome: n,
    respirar: function respirar() {
      console.log(`${this.nome}  está respirando.`);
    },
    andar: function andar() {
      console.log(`${this.nome}  está andando.`);
    },
    comer: function comer() {
      console.log(`${this.nome}  está comendo.`);
    },
  };
}

function Mamifero(g, p) {
  return {
    genero: g,
    pelos: p,
    copular: function copular() {
      console.log(`${this.nome}  está copulando.`);
    },
    falar: function falar() {
      console.log(`${this.nome}  está falando.`);
    },
  };
}

function Pessoa(na, a) {
  return {
    nascionalidade: na,
    altura: a,
    ler: function ler() {
      console.log(`${this.nome}  está lendo.`);
    },

    dirigir: function dirigir() {
      console.log(`${this.nome}  está dirigindo.`);
    },
  };
}

function criarPessoa(n, g, p, na, a) {
  return Object.assign({}, Animal(n), Mamifero(g, p), Pessoa(na, a));
}

const emanuel = criarPessoa('Emanuel', 'masculino', 'brasileiro', 1.69, 'castanhos');
console.log(emanuel);
console.log(emanuel.dirigir());
console.log(emanuel.ler());
console.log(emanuel.copular());
console.log(emanuel.falar());
console.log(emanuel.respirar());
console.log(emanuel.andar());
console.log(emanuel.comer());
