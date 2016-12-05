# Herança Prototípica em JavaScript

JavaScript não é uma linguagem POO comum. Apesar de tudo em JavaScript ser objetos, conceitos comuns em outras linguagens como estender uma classe, visibilidades, poliformismo não são implementados da mesma maneira. Aliás, como JavaScript implementa a Herança é muito diferente: conheça o conceito de **Prototipagem**.

## O que são Protótipos em JS?

JavaScript, para implementar Herança entre objetos, se utiliza de prototipos, que são simplesmente modelos para outros objetos. Quando se utiliza um prototipo, é como se utiliza o *extends* na criação de uma classe. Eu digo para o interpretadador: "Este objeto, utiliza como modelo aquele outro". Mas como implementar isso na prática?

Uma observação importante é que em JavaScript, toda função tem um atributo, ou propriedade, chamado *prototype* - não confundir com o prototype de prototipo. Tal atributo tem a função de garantir a herança, pois quando acessamos o prototype de uma função construtora e passamos para ele um atributo ou método, todos os objetos construídos a partir dela herdaram o que estiver no prototype da função. Por isso que em JavaScript, falamos que temos herança via protótipos, e não a herança clássica. Olhe o código abaixo:

````js
function dizOla () {
  console.log("Olá!");
}

console.log(dizOla.prototype); // Retorna um Objeto

// Exemplo com prototype
function Pessoa (n, i) {
  this.nome = n;
  if(idadeIsValid(i))
    this.idade = i;
  else {
    console.log("Digite uma idade válida");
  }
}

// Todos os objetos que forem instanciados por Pessoa
// Herdaram o método abaixo
Pessoa.prototype.falar = function () {
  console.log(this.nome + " está falando");
}
````

Vejamos abaixo as principais maneiras de se construir herança em JavaScript

### Maneira 1 - Utilizando a propriedade __proto__:

A propriedade __proto__ é muito interessante, por que ela é uma forma de referenciar um outro objeto como protótipo. Trocando em miúdos: ***o famoso extends das linguagens POO clássicas***.

+ Quando eu criar o objeto, eu referencio um outro através da propriedade proto deste objeto;
+ **Contra**: não é suportado por todos os interpretadores;
+ **Contra**: não é recomendado.

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

Este método foi primeiramente construído por Douglas Crockford, um [artigo de 2008](Douglas Crockford). Este artigo foi tão importante, que a partir do EcmaScript 5 virou implementação oficial do JavaScript.

+ Na criação do objeto eu utilizo o Object.create para referenciar o seu protótipo;
+ **Contra**: não há um construtor para ser executado.

````js

let Homem = {
  sexo: "masculino"
}

let emanuel = Object.create( Homem );
emanuel.nome = "Emanuel";
emanuel.idade = 19;

console.log(emanuel.sexo);

````

Um detalhe importante é que nesta função há um segundo parâmetro, um pouco complexo, que é um objeto para que você coloque suas próprias propriedades e métodos no novo objeto. Para mais informações, há o [artigo do MDN sobre o assunto](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

### Maneira 3 - Utilizando o prototype

Como descrito acima, você pode acessar o atribut prototype das funções acrescentando atributos ou métodos. Lembre-se: o prototype de uma função é um objeto!

+ Só é possível mediante o uso de função construtora, pois as funções tem uma propriedade que se chama ***prototype***, que é um objeto. Na hora da instanciação, é usado o operador **new**, que só vale com funções construtoras.

````js
// Criando a função construtora
let Homem = function(n, i) {
  this.nome = n;
  this.idade = i;
}

// Setando o atributo sexo para esta função, assim,
// todos os objetos criados a partir dela terão esta propriedade
// É possível criar métodos para o objeto e etc...
Homem.prototype.sexo = "masculino";

let emanuel = new Homem("Emanuel", 19);

//O método acima é similar à: emanuel.__proto__ = Homem;
// Pois o operador new, ao usar uma função construtora
// 'seta' ao objeto instanciado a linha acima

// Acessando a propriedade sexo do objeto prototipo Homem
console.log(emanuel.sexo);
````

## Como funciona a herança por prototipagem?

Bem, como já dito, um protótipo é um modelo para a criação de outros objetos. Assim, o interpretador JavaScript irá buscar no objeto *emanuel* a propriedade *sexo*, não achando, irá em seu protótipo, e assim por diante, até chegar em Odin, o Pai de Todos, chamado ***Object.prototype*** que retornará **undefined**. No final das contas, teremos uma cadeia de protótipos, em que um sempre referenciará o outro, terminando a cadeia no Object.prototype.

## Mas, e se eu quisesse criar uma cadeia de protótipos?

Há vários métodos, mas o mais perfomático [segundo um benchmark do pessoal da Caelum](https://github.com/leocwolter/javascriptInheritance), é o que usa os protótipos mais o Constructor Stealing (não se assuste com o nome :) ). Demonstro-o a seguir:

````js
// Crio uma função para saber se a idade é válida
function idadeIsValid (idade) {
  if(idade < 0)
    return false;
  else
    return true;
}

// Crio o meu protótipo Pessoa
function Pessoa (n, i) {
  this.nome = n;
  if(idadeIsValid(i))
    this.idade = i;
  else {
    console.log("Digite uma idade válida");
  }
}

// Crio um método para este protótipo
Pessoa.prototype.falar = function () {
  console.log("Ola! Sou " + this.nome + " e tenho " + this.idade " anos");
};

// Crio o meu segundo protótipo
function PessoaFisica (n, i, cpf) {
  // Uso do Constructor Stealing
  Pessoa.call(this, n, i);
  // O uso do call serve para passar para Pessoa o objeto PessoaFisica
  // Assim, PessoaFisica irá herdar todas as características de Pessoa
  this.cpf = cpf;
};

// Digo a ele que o protótipo dele será Pessoa
PessoaFisica.prototype = new Pessoa();

// E digo que o constructor será ele mesmo
PessoaFisica.prototype.constructor = PessoaFisica;

// Crio um método para PessoaFisica
PessoaFisica.prototype.dizCpf = function () {
  console.log("Meu cpf é " + this.cpf);
};

let bebe = new Pessoa("Bebe", 0);
let emanuel = new PessoaFisica("Emanuel", 19, "139.935.397-70");
console.log(emanuel); // Retorna uma instancia de PessoaFísica
console.log(emanuel.falar()); // Retorna a function de Pessoa
console.log(emanuel.dizCpf()); // Retorna a function de PessoaFisica
console.log(bebe); // Retorna uma instancia de Pessoa
// Esta linha levantará um erro,
// pois bebe é uma Pessoa, não PessoaFisica
// portanto, não poderá acessar o método desta classe
console.log(bebe.dizCpf()); // ERRO!
````
