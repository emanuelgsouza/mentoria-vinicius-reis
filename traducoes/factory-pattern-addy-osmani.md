# Tradução livre do Tópico *Factory Pattern* do Addy Osmani

[Ver o original](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)

O Factory Pattern é outro padrão de criação interessado com o conceito de criação de objetos. Onde difere dos outros padrões em sua categoria é que ele não exige explicitamente que usemos um construtor. Ao invés disso, um Factory pode prover uma interface genérica para criação de objetos, onde nós podemos especificar o tipo de objeto fábrica que nós desejamos criar.

Imagine que nós temos uma UI Factory onde nós somos convidados a criar um tipo de componente UI. Ao invés de criar este componente diretamente usando o operador *new* ou via outro construtor, pedimos um objeto de fábrica por um novo componente. Nós informamos ao Factory qual o tipo de objeto queremos (ex. Butão, Panel) e instanciamos isso, retornando a nós para uso.

Isto é particularmente útil se o processo de criação de objeto é relativamente complexo, por exemplo, se ele depende fortemente de fatores dinâmicos ou configurados pela aplicação.

Exemplos deste padrão podem ser encontrados em bibliotecas UI como a ExtJS onde os métodos para criação de objetos ou componentes poder sem adicionalmente subclassificados.

O seguinte é um exemplo que se baseia em nossos snippets anteriores usando a lógica do padrão Constructor para definir carros. Ele demonstra como um VehicleFactory pode ser implementado usando Factory Pattern:

````js
// Types.js - Constructors used behind the scenes

// A constructor for defining new cars
function Car( options ) {

  // some defaults
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";

}

// A constructor for defining new trucks
function Truck( options){

  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}


// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function ( options ) {

  switch(options.vehicleType){
    case "car":
      this.vehicleClass = Car;
      break;
    case "truck":
      this.vehicleClass = Truck;
      break;
    //defaults to VehicleFactory.prototype.vehicleClass (Car)
  }

  return new this.vehicleClass( options );

};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
            vehicleType: "car",
            color: "yellow",
            doors: 6 } );

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log( car instanceof Car );

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log( car );
````

Abordagem #1: Modificar uma instancia de VehicleFactory para usar na class Truck

````js
var movingTruck = carFactory.createVehicle( {
                      vehicleType: "truck",
                      state: "like new",
                      color: "red",
                      wheelSize: "small" } );

// Test to confirm our truck was created with the vehicleClass/prototype Truck

// Outputs: true
console.log( movingTruck instanceof Truck );

// Outputs: Truck object of color "red", a "like new" state
// and a "small" wheelSize
console.log( movingTruck );
````

Abordagem #2: Subclassiar VehicleFactory para criar uma class Factory que constrói trucks

````js
function TruckFactory () {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle( {
                    state: "omg..so bad.",
                    color: "pink",
                    wheelSize: "so big" } );

// Confirms that myBigTruck was created with the prototype Truck
// Outputs: true
console.log( myBigTruck instanceof Truck );

// Outputs: Truck object with the color "pink", wheelSize "so big"
// and state "omg. so bad"
console.log( myBigTruck );
````

## Quando usar o Factory Pattern

O Factory Pattern pode ser útil quando aplicado as seguintes situações:

+ Quando a configuração de nosso objeto ou componente envolve um grande nível de complexidade;
+ Quando necessitamos de gerar diferentes instancias de nossos objetos dependendo do ambiente em que estamos;
+ Quando trabalhamos com muitos objetos ou componentes pequenos que compartilham as mesmas propriedades;
+ Quando compomos objetos com instancias de outros objetos que precisam apenas satisfazer um contrato API para o trabalho. Isto é útil para dissociação.

## Quando não usar o Factory Pattern

Quando aplicado ao tipo de problema errado, este padrão pode introduzir uma complexidade desnecessariamente grande para uma aplicação. A menos que a criação de uma interface para a criação de objetos seja uma meta de projeto para a biblioteca ou estrutura que estamos escrevendo, eu sugeriria colocar explicitamente construtores para evitar uma sobrecarga desnecessária.

Devido ao fato de que o processo de criação de objetos é efetivamente abstraído por trás de uma interface, isto também pode causar problemas com testes unitários em sobre o quão complexo este processo pode ser.

## Factories Abstratas

Também é útil estar ciente do padrão Abstract Factory, que visa encapsular um grupo de Factories individuais com um objetivo comum. Ele separa os detalhes da implementação de um conjunto de objetos de seu uso geral.

Um Abstract Factory deverá ser usado onde um sistema deve ser independente da forma como os objetos que cria são gerados ou ele precisa trabalhar com vários tipos de objetos.

Um exemplo que é simples e mais fácil de entender é uma Factory de veículos, que define maneiras de obter ou registrar tipos de veículos. A Abstract Factory pode ser chamada de AbstractFactoryVehicle. A Abstract Factory permitirá a definição de tipos de veículo como "carro" ou "caminhao" e as Factories concretas implementarão somente as classes que cumprem o contrato de veículo (por exemplo, Vehicle.prototype.drive e Vehicle.prototype.breakDown).

````js
var abstractVehicleFactory = (function () {

  // Storage for our vehicle types
  var types = {};

  return {
      getVehicle: function ( type, customizations ) {
          var Vehicle = types[type];

          return (Vehicle ? new Vehicle(customizations) : null);
      },

      registerVehicle: function ( type, Vehicle ) {
          var proto = Vehicle.prototype;

          // only register classes that fulfill the vehicle contract
          if ( proto.drive && proto.breakDown ) {
              types[type] = Vehicle;
          }

          return abstractVehicleFactory;
      }
  };
})();


// Usage:

abstractVehicleFactory.registerVehicle( "car", Car );
abstractVehicleFactory.registerVehicle( "truck", Truck );

// Instantiate a new car based on the abstract vehicle type
var car = abstractVehicleFactory.getVehicle( "car", {
            color: "lime green",
            state: "like new" } );

// Instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle( "truck", {
            wheelSize: "medium",
            color: "neon yellow" } );
````
