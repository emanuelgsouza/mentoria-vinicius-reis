# Herança Prototípica em JavaScript

JavaScript não é uma linguagem POO comum. Apesar de tudo em JavaScript ser objetos, conceitos comuns em outras linguagens como estender uma classe, visibilidades, poliformismo não são implementados da mesma maneira. Aliás, como JavaScript implementa a Herança é muito diferente: conheça o conceito de **Prototipagem**.

## O que são Protótipos em JS?

JavaScript, para implementar Herança entre objetos, se utiliza de prototipos, que são simplesmente modelos para outros objetos. Quando se utiliza um prototipo, é como se utiliza o *extends* na criação de uma classe. Eu digo para o interpretadador: "Este objeto, utiliza como modelo aquele outro". Mas como implementar isso na prática?

### Maneira 1 - Utilizando a propriedade __proto__:

+ Quando eu criar o objeto, eu referencio um outro através da propriedade proto deste objeto.
+ **Contra**: não é suportado por todos os interpretadadores.

````js

let Homem = {
  sexo: "masculino"
}

let emanuel = {
  nome: "Emanuel",
  idade: 19,
  __proto__: Homem
}

console.log(emanuel.sexo);

````

### Maneira 2 - Utilizando o Object.create

+ Na criação do objeto eu utilizo o Object.create referenciar o seu protótipo

````js

let Homem = {
  sexo: "masculino"
}

let emanuel = Object.create( Homem );
emanuel.nome = "Emanuel";
emanuel.idade = 19;

console.log(emanuel.sexo);

````

### Maneira 3 - Utilizando o prototype

+ Só é possível mediante o uso de função construtora, pois as funções tem uma propriedade que se chama ***prototype***, que é um objeto.

````js
// Criando a função construtora
let Homem = function(n, i) {
  this.nome = n;
  this.idade = i;
}

// Setando o atributo sexo para esta função, assim, todos os objetos criados a partir dela terão esta propriedade
// É possível criar métodos para o objeto e etc...
Homem.prototype.sexo = "masculino";

let emanuel = new Homem("Emanuel", 19);

//O método acima é similar a: emanuel.__proto__ = Homem;

// Acessando a propriedade sexo do objeto prototipo Homem
console.log(emanuel.sexo);
````

## Como funciona a herança por prototipagem?

Bem, como já dito, um protótipo é um modelo para a criação de outros objetos. Assim, o interpretador JavaScript irá buscar no objeto *emanuel* a propriedade *sexo*, não achando, irá em seu protótipo, e assim por diante, até chegar em Odin, o Pai de Todos, chamado ***Object.prototype*** que retornará **null**. No final das contas, teremos uma cadeia de protótipos, em que um sempre referenciará o outro, terminando a cadeia no Object.prototype.
