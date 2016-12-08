/*
Exercise one
*/
// Create the class Animal
function Animal(n, g) {
  this.nome = n;
  this.familia = g;
}

Animal.prototype.respirar = function () {
  console.log(this.nome + " está respirando.");
};

Animal.prototype.andar = function () {
  console.log(this.nome + " está andando.");
};

Animal.prototype.comer = function () {
  console.log(this.nome + " está comendo.");
};

// Create the class Mamifero
function Mamifero(n, g, p) {
  Animal.call(this, n, "mamífero");
  this.genero = g;
  this.pelos = p;
}

Mamifero.prototype = new Animal();
Mamifero.prototype.constructor = Mamifero;

Mamifero.prototype.copular = function () {
  console.log(this.nome + " está copulando.");
}

Mamifero.prototype.falar = function () {
  console.log(this.nome + " está falando.");
}

// Create the class Pessoa
function Pessoa(n, g, p, na, a) {
  Mamifero.call(this, n, g, p);
  this.nascionalidade = n;
  this.altura = a;
}

Pessoa.prototype = new Mamifero();
Pessoa.prototype.constructor = Pessoa;

Pessoa.prototype.ler = function () {
  console.log(this.nome + " está lendo.");
};

Pessoa.prototype.dirigir = function () {
  console.log(this.nome + " está dirigindo.");
};

const emanuel = new Pessoa("Emanuel", "masculino", "brasileiro", 1.69, "castanhos");
console.log(emanuel.dirigir());
console.log(emanuel.ler());
console.log(emanuel.copular());
console.log(emanuel.falar());
console.log(emanuel.respirar());
console.log(emanuel.andar());
console.log(emanuel.comer());
