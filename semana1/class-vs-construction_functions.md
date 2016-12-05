# Class vs Constructions Functions

Em JavaScript, como no texto sobre [herança via prototipagem](heraca-prototipo.md), foi mostrado, em praticamente todos os exemplos, o uso da função construtora. Neste texto, irei abordar o uso dela e como a nova especificação do JavaScript, o ES6, trouxe de melhorias na forma como se implementa classes, herança e tudo mais.

## Mas, que raios é isso de função construtora?

Primeiramente, na criação de classes em JavaScript (lembrando que classes == objetos, em JS), há três métodos:

1 - Usando a notação literal. Pouco indicada, a menos que você só vai ter somente um objeto.

+ Pró: é mais simples de se manter
+ Contra: porem, desta forma, não é possível implementar herança via prototype

````js
const emanuel = {
  nome: "Emanuel",
  idade: 19,

  fala: function() {
    console.log("Olá, sou " + this.nome + " e tenho " + this.idade + " anos.");
  }
}

console.log(emanuel.nome); // Emanuel
console.log(emanuel.idade); // 19
console.log(emanuel.fala()); // Olá, sou Emanuel e tenho 19 anos.
````

2 - Usando uma função fábrica (Factory). Também pouco usual. É basicamente uma função que retorna um objeto.

+ Pró: é quase uma evolução da outra, no sentindo de reaproveitamento de código
+ Contra: numa função fábrica não é possível setar prototype, de forma que não é possível criar herança via prototype

````js
function Pessoa(n, i) {
  return {
    nome: n,
    idade: i,

    fala: function() {
      console.log("Olá, sou " + this.nome + " e tenho " + this.idade + " anos.");
    }
  }
}

const emanuel = Pessoa("Emanuel", 19)
console.log(emanuel.nome); // Emanuel
console.log(emanuel.idade); // 19
console.log(emanuel.fala()); // Olá, sou Emanuel e tenho 19 anos.
````

3 - Usando a função construtora. Ela é importante pois utiliza o operador *new*. Ela vem de construtora porque ela "constrói" um objeto pelos parâmetros que passam para ela.

+ Pró: possibilita reúso e herança via prototipagem
+ Contra: complexo de escrever e manter e é bastante verboso

````js
function Pessoa(n, i) {
  this.nome = n;
  this.idade = i;
}

Pessoa.prototype.fala = function() {
  console.log("Olá, sou " + this.nome + " e tenho " + this.idade + " anos.");
}

const emanuel = new Pessoa("Emanuel", 19)
console.log(emanuel.nome); // Emanuel
console.log(emanuel.idade); // 19
console.log(emanuel.fala()); // Olá, sou Emanuel e tenho 19 anos.
````

Porém, esta última, apesar de ser mais usada, não é a mais clara, tanto para quem não conhece de POO quanto para quem já veio de outras linguagens POO, como Java, Python e PHP. Sendo assim, a ES6 trouxe uma melhoria no sentido de deixar a sintaxe mais clara na hora de criar um objeto quanto na hora de extendê-lo - criando herança.

## O uso da class

O uso de class é muito simples de entender, se você entedeu como funciona a função construtora. Para mais informações, leia o texto sobre Prototipagem, neste mesmo repositório.

+ Pró: tem uma sintaxe mais limpa, mais clara e objetiva, principalmente para quem veio de linguagens POO tradicionais
+ Contra: é mais limitado que funções construtoras e o uso do new é obrigatório, sem ser possível contorná-lo


````js
// Trocamos function por class
class Pessoa() {

  // Quem tem parametros é o constructor
  constructor(n, i) {
    this.nome = n;
    this.idade = i;
  }

  // Esta forma é identica a esta: Pessoa.prototype.fala = ...
  fala() {
    console.log("Olá, sou " + this.nome + " e tenho " + this.idade + " anos.");
  }
}

// Na hora de chamar, funciona da mesma forma que usando a função construtora
const emanuel = new Pessoa("Emanuel", 19)
console.log(emanuel.nome); // Emanuel
console.log(emanuel.idade); // 19
console.log(emanuel.fala()); // Olá, sou Emanuel e tenho 19 anos.
````

Repare que *fala()* está definido dentro da class, se eu quisesse defini-la fora, eu teria que usar prototype, pois o método fala(), dentro da class, vai direto para o prototype da class Pessoa.

````js
// Informações interessantes:

console.log(typeof Pessoa); // function
console.log(typeof Pessoa.prototype); // {} ou object
console.log(typeof Pessoa.prototype.fala); // function
````

Sendo assim, vemos que class veio para dar uma ajuda semantica a implementação de classes no JS.

## Mas como criar herança usando o class?

Simples, como em outras linguagens, use a palavrinha mágica ***extends***. Se você quiser acessar um método da classe pai, use a palavra *super*.

````js
// Extendendo a classe Pessoa

// Esta linha de baixo se assemelha ao seguinte trecho
// PessoaFisica.prototype = new Pessoa();
// PessoaFisica.prototype.constructor = PessoaFisica;
class PessoaFisica extends Pessoa {
  constructor (n, i, cpf) {
    // Acessando o método constructor da classe pai
    // Esta linha é igual a esta: Pessoa.call(this, n, i);
    super(n, i);
    this.cpf = cpf;
  }

  dizCpf() {
    // Acessando o método fala do pai
    super.fala();
    console.log("Meu cpf é: " + this.cpf);
  }
}

const emanuel = new PessoaFisica("Emanuel", 19, "123.456.789-10");
console.log(emanuel.nome); // Emanuel
console.log(emanuel.idade); // 19
console.log(emanuel.fala()); // Olá, sou Emanuel e tenho 19 anos.
console.log(emanuel.dizCpf()); // Olá, sou Emanuel e tenho 19 anos. Meu cpf é: 123.456.789-10
````
