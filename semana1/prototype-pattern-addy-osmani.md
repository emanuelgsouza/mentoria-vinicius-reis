# Tradução livre do Tópico *Prototype Pattern* do Addy Osmani

O GoF (Gang of Four) refere-se ao Padrão de Protótipo como um que cria objetos com base em um modelo de um objeto já existente através da clonagem.

Nós podemos pensar em em Prototype Pattern como sendo baseado em herança de protótipo em que nós criamos objetos que agem como protótipos para outros objetos. O próprio objeto protótipo é efetivamente usado como um modelo para cada objeto que o construtor cria. Se o protótipo da função construtora usado contem uma propriedade chamada ***name*** por exemplo, então cada objeto criado pelo mesmo construtor também terá a mesma propriedade.

Recapitulando as definições para este padrão na literatura (não-JavaScript) existente, nós podemos encontrar referências para classes mais uma vez. A realidade é que herança por protótipo evita usar classes inteiramente. Não há um objeto de "definição" ou um objeto central, em teoria. Nós simplesmente criamos cópias de objetos funcionais existentes.

Um dos benefícios de usar o Prototype Pattern é que nós estamos trabalhando com o força prototípica que JavaScript tem para oferecer nativamente ao invés de tentar imitar características de outras linguagens. Com outros design patterns, isto nem sempre é o caso.

Não somente o padrão é uma forma fácil de implementar herança, mas tambem pode vir com um aumento de desempenho: quando definimos uma função em um objeto, elas são criadas por referência (assim todos os objetos filhos estarão apontando para a mesma função) em vez de criar suas próprias cópias individuais.

Para os interessados, herança prototípica real, como definida no padrão EcmaScript 5, requerem o uso do ***Object.create***. Para relembramos, ***Object.create*** cria um objeto que tem um protótipo específico e opcionalmente contem propriedades também (Ex.: Object.create( protótipo, opções )).

Nós podemos ver isto demonstrado no exemplo abaixo:

````js
var myCar = {
  name: "Ford Escort",

  drive: function() {
    console.log("Aeee. Eu estou dirigindo!");
  },

  panic: function () {
    console.log("Espera. Como podemos parar esta coisa?");
  }
};

// Usando o Object.create para instanciar um novo carro
var yourCar = Object.create( myCar );

// Agora nós podemos ver que um é protótipo do outros
console.log( yourCar.name );
````

Object.create também permíte-nos facilmente implementar conceitos avançados como heraça por diferença aonde objetos são capazes para diretamente herdarem de outros objetos. Vimos anteriormente que Object.create nos permite inicializar as propriedades do objeto usando o segundo argumento fornecido. Por exemplo:

````js
var vehicle = {
  getModel: function () {
    console.log( "O modelo do carro é.." + this.model );
  }
};

var car = Object.create(vehicle, {

  "id": {
    value: MY_GLOBAL.nextId(),
    enumerable: true
  },

  "model": {
    value: "Ford",
    enumerable: true
  }

});
````

Aqui as propriedades podem ser inicializadas no segundo argumento do Object.create usando um objeto literal com uma sintaxe similar à que usada pelos métodos ***Object.defineProperties*** e ***Object.defineProperty*** que nós olhamos anteriormente.

Vale a pena notar que relações prototípicas podem causar problemas ao enumerar propriedades de objetos e (como Crockford recomenda) envolvendo o conteúdo do loop em um hasOwnProperty() check

Se nós desejamos implementar o Prototype Pattern sem diretamente usar o Object.create, nós podemos simular o padrão conforme o exemplo a seguir:

````js
var vehiclePrototype = {

  init: function ( carModel ) {
    this.model = carModel;
  },

  getModel: function () {
    console.log( "O modelo do carro é.." + this.model);
  }
};


function vehicle( model ) {

  function F() {};
  F.prototype = vehiclePrototype;

  var f = new F();

  f.init( model );
  return f;

}

var car = vehicle( "Ford Escort" );
car.getModel();
````

**Nota**: esta alternativa não permite ao usuário definir propriedades de *read-only* da mesma maneira ( como o vehiclePrototype pode ser alterado, se não cuidado ).

Uma implementação alternativa final para o Prototype Pattern poderia ser como a seguinte:

````js
var beget = (function () {

  function F() {}

  return function ( proto ) {
      F.prototype = proto;
      return new F();
  };
})();
````

Pode-se referenciar este método a partir da função do veículo. Note, contudo que *vehicle* aqui é uma emulação de um construtor, Uma vez que o Prototype Pattern não inclui qualquer noção de inicialização além de ligar um objeto a um protótipo.
