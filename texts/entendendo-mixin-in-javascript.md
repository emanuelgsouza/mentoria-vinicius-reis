# Entendendo Mixins em JavaScript

Mixin em JavaScript nada mais são do que objetos que serão utilizados para compor outros objetos. Imaginemos que temos funcionalidades que deverão ser implementadas em vários objetos, que são "distintos" entre si, ou seja, tem construtores diferentes. Com o Mixin, tal tarefa se torna simples, pois, ele "copia" os métodos de um objeto para outro.

Vamos ao código, assim fará mais sentido:

````js
// Crio o meu objeto "abstrato"
const Pessoa = {
  falar: function () {
    console.log(this.name + " está falando.");
  },

  andar: function () {
    console.log(this.name + " está andando.");
  }
}

function Aluno (n) {
  this.name = n;

  this.alunar = function () {
    console.log(this.name + " está alunando.");
  }
}

function Professor (n) {
  this.name = n;

  this.professar = function () {
    console.log(this.name + " está professando.");
  }
}

// Minha função que tem como objetivo, copiar o meu obj mixin a um outro
const aumentar = function (objAExtender, objExtensao) {
  for (var variable in objExtensao) {
    // Se o meu obj ja tiver esta propriedade, eu nao copio, senão, ele copia
    if (!objAExtender.hasOwnProperty(variable)) {
      objAExtender.prototype[variable] = objExtensao[variable];
    }
  }
}

aumentar(Aluno, Pessoa);
aumentar(Professor, Pessoa);

const emanuel = new Aluno("Emanuel");
const anderson = new Professor("Anderson");

console.log(emanuel.falar());
console.log(emanuel.andar());
console.log(emanuel.alunar());
console.log(anderson.falar());
console.log(anderson.andar());
console.log(anderson.professar());
````
