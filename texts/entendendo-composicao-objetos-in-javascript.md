# Entendendo composição de Objetos em JavaScript

Composição é uma das formas de se criar herança em JavaScript, sendo herança == reaproveitamento de código. Para se fazer composição, eu não recorro a POO Clássica, em que preciso criar classes abstratas para criação de outras classes que irão extender essa classe abstrata e só depois criarão objetos.

Há um post interessantíssimo sobre o assunto no Medium, cujo autor é Pedro Barros - [leia-o aqui](https://medium.com/@pedro.barros/heran%C3%A7a-ou-composi%C3%A7%C3%A3o-eis-a-quest%C3%A3o-7ce11fad4737#.s5h02er56) - em que o autor sintetiza bem a diferença entre composição e herança e escrevo abaixo uma síntese desse pensamento:

> A herança lida com o que o objeto é, por exemplo, um ser humano é um Mamífero. Já a composição lida com o que o objeto pode fazer, um ser humano, amamenta. Isso é o que há de comum entre um ser humano e um cachorro, ambos mamíferos, que é a capacidade de amamentar.

Portanto o segredo para se entender composição em JavaScript é entender como abstrair **COMPORTAMENTOS** dos objetos. É reutilizar estes comportamentos, implementando o que se chama de herança horizontal.

Há dois métodos nativos do JavaScript que facilitam a implementação da composição:

## Object.create

Sintaxe:

````js
const object = Object.create(prototype, properties);
````

Basicamente, este método cria um **novo objeto** que receberá como protótipo um outro objeto, ou null. Todavia, se eu quiser criar este novo objeto com propriedades próprias (na maioria das vezes eu quero isso), eu as colocarei no segundo argumento. Como faço isso?

````js
const object = Object.create(null, {
  foo: {
    writable: true,
    enumerable: true,
    configurable: true,
    value: 10
  },

  bar: {
    writable: false,
    enumerable: true,
    configurable: false,
    value: 10
  },

  rawDesc: {
    writable: true,
    configurable: true,
    enumerable: false,
    value: "eu sou um objeto",
  },

  desc: {
    get: function getDesc() {
      return this.rawDesc.toUpperCase();
    },
    set: function setDesc(value) {
      this.rawDesc = value.toLowerCase();
    }
  }
});
````

Como visto, o segundo parâmetro de Object.create é um objeto que será passado para a variável no momento da chamada deste método. Dentro deste objeto, **as chaves dele serão as chaves do novo objeto**, e o **value serão os valores**. Mas o que são esses *configurable*, *writable* e *enumerable*?

+ **Configurable**: diz se o valor pode ser configurado, ou seja, se ele pode ser deletado etc.
+ **Writable**: diz se o valor pode ser modificado. É curioso porque ao tentar modificar o valor de bar, fazendo object.bar = novoValor, ele não levanta algum erro. Porem, não deixa você modificar o valor, ele ainda persiste como o da chamada do método.
+ **enumerable**: diz se num loop, tal propriedade pode ser enumerada com as demais. No caso acima, num *for...in...* as propriedades rawDesc e desc não serão mostradas.

Sim, mas e o *get* e o *set*?

+ **Get**: função que é executada quando a propriedade é acessada via *dot notation*. Exemplo: object.desc, irá retornar "EU SOU UM OBJETO".
+ **Set**: função que executada quando você for modificar o atributo, no caso, acima, o atributo rawDesc.

> IPC (Importante pra Caramba): caso você queira optar por usar um get e um set, não use as outras propriedades, como writable, configurable and enumerable, pois será levantado um erro.

## Object.assign

Sintaxe:

````js
const object = Object.assign(destino, origem1, ...);
````

É um método usado para clonar propriedades de um objeto para outro, em que o destino receberá as propriedades dos objetos da origem, que podem ser um ou mais objetos.

````js
let first = {name: 'Tony'};
let last = {lastName: 'Stark'};
let person = Object.assign( first, last );
console.log(person);
// {name: 'Tony', lastName: 'Stark'}
console.log(first);
// {name: 'Tony', lastName: 'Stark'} as the target also changed
````

Perceba que Object.assign pode poluir seu escopo, devido ao fato de que ele copia as propriedades de origem para destino e depois atribui isso a uma variável. Portanto, **uma boa prática é passar como parâmetro de destino, um objeto vazio {}**, como segue:

````js
let first = {name: 'Tony'};
let last = {lastName: 'Stark'};
let person = Object.assign( {}, last );
console.log(person);
// {name: 'Tony', lastName: 'Stark'}
console.log(first);
// {name: 'Tony'} no changed
````
