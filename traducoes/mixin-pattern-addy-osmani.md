# Tradução livre do Tópico *Mixin Pattern* do Addy Osmani

[Ver o original](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#mixinpatternjavascript)

Em linguagens de programações tradicionais como C++ e Lisp, Mixins são classes que oferecem funcionalidades que podem ser facilmente herdadas por sub-classees ou grupos de sub-classes para fins de reutilização de funções.

## Sub-classing

Para desenvolvedores não familiares com sub-classing, nós iremos passar brevemente por ele antes de falar sobre Mixin e Decorator.

Sub-classing é um termo que se refere a propriedades herdadas por um novo objeto baseado em um objeto superclass. Em POO clássico, uma classe B está apta a extender outra class A. Aqui nós consideramos A uma superclass de B. Como tal, todas as instancias de B herdam metodos de A. B é, contudo ainda ábil a definir seus próprios métodos, incluindo aqueles que sobrepoem os definidos originalmente por A.

Caso B precise invocar um método em A que tenha sido sopreposto, nós nos referimos a isso como um encadeamento de métodos. Caso B precise invocar o construtor de A (a superclass), nós chamaremos encadeamento de construtor.

Para demonstrar a sub-classing, primeiramente definiremos um objeto base que tem novas instancias dele mesmo criadas. Vamos modelar isso em torno do conceito de uma pessoa.

````js
var Person = function( firstName, lastName ){

  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = "male";

};
````

Nós queremos especificar uma nova classe (objeto) que será uma sub-classe da existente do objeto *Person*. Vamos imaginar que nós queremos adicionar propriedades para distinguir uma Person de SuperHero enquanto herda as propriedades da superclass Person. Como super-herois compartilham muitos traços comuns com pessoas normais (ex., nome e genero), isso deve ilustrar como a subclasse funciona adequadamente:

````js
// a new instance of Person can then easily be created as follows:
var clark = new Person( "Clark", "Kent" );

// Define a subclass constructor for for "Superhero":
var Superhero = function( firstName, lastName, powers ){

    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.

    Person.call( this, firstName, lastName );

    // Finally, store their powers, a new array of traits not found in a normal "Person"
    this.powers = powers;
};

Superhero.prototype = Object.create( Person.prototype );
var superman = new Superhero( "Clark", "Kent", ["flight","heat-vision"] );
console.log( superman );

// Outputs Person attributes as well as powers
````

O SuperHero construtor cria um objeto que descende de Person. Objetos deste tipo têm atributos dos objetos que estão acima dele na cadeia e se tivéssemos definido valores padrão no objeto Pessoa, Superhero é capaz de substituir quaisquer valores herdados com valores específicos para o objeto.

## Mixins

Em JavaScript, podemos olhar para herança de mixins como um meio de coleta de funcionalidades através de extensões. Cada novo objeto que nós definirmos tem um prototipo a partir do qual pode herdar outras propriedades. Prototipos podem herdar de outros objetos prototipos mas, ainda mais importante, podem definir propriedades para qualquer números de objetos instanciados. Nós podemos alavancar este fato para promover funções reutilizáveis.

Mixins permitem que os objetos emprestem (ou herdam) a funcionalidade deles com uma quantidade mínima de complexidade. Como o padrão trabalha bem com objetos prototipos em JavaScript, isto nos dá uma forma flexível para compartilhar funcionalidades não apenas de um único Mixin, mas efetivamente de múltiplos através da herança.

Eles podem ser visualizados como objetos com atributos e métodos que podem ser facilmente compartilhados entre um número de outros prototipos de objetos. Imagine que nós definimos um Mixin contendo funções úteis em um objeto literal padrão como a seguir:

````js
var myMixins = {

  moveUp: function(){
    console.log( "move up" );
  },

  moveDown: function(){
    console.log( "move down" );
  },

  stop: function(){
    console.log( "stop! in the name of love!" );
  }

};
````

Podemos então facilmente extender o prototipo de uma função construtora existente para incluir o comportamento usando um helper como o método *_extend()* do Underscore.js:

````js
// A skeleton carAnimator constructor
function CarAnimator(){
  this.moveLeft = function(){
    console.log( "move left" );
  };
}

// A skeleton personAnimator constructor
function PersonAnimator(){
  this.moveRandomly = function(){ /*..*/ };
}

// Extend both constructors with our Mixin
_.extend( CarAnimator.prototype, myMixins );
_.extend( PersonAnimator.prototype, myMixins );

// Create a new instance of carAnimator
var myAnimator = new CarAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();

// Outputs:
// move left
// move down
// stop! in the name of love!
````

Como podemos ver, isto nos permite facilmente misturar comportamentos em comum entre constructores de objetos bastante trivial.

No proximo exemplo, nos temos dois constructores: um Car e um Mixin. O que nós faremos é um aumento (outra forma de dizer extensão) de Car de modo que ele pode herdar métodos específicos definidos no Mixin, nomeados *driveForward()* e *driveBackward()*. Desta vez não iremos usar o Underscore.js.

Ao inves disso, este exemplo irá demonstrar como aumentar um constructor para incluir funcionalidades sem a necessidade de duplicar este processo para cada função construtora que possamos ter.

````js
// Define a simple Car constructor
var Car = function ( settings ) {

    this.model = settings.model || "no model provided";
    this.color = settings.color || "no colour provided";

};

// Mixin
var Mixin = function () {};

Mixin.prototype = {

    driveForward: function () {
        console.log( "drive forward" );
    },

    driveBackward: function () {
        console.log( "drive backward" );
    },

    driveSideways: function () {
        console.log( "drive sideways" );
    }

};


// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {

    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {

            // check to make sure the receiving class doesn't
            // have a method of the same name as the one currently
            // being processed
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }

            // Alternatively (check prototype chain as well):
            // if ( !receivingClass.prototype[methodName] ) {
            // receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
}


// Augment the Car constructor to include "driveForward" and "driveBackward"
augment( Car, Mixin, "driveForward", "driveBackward" );

// Create a new Car
var myCar = new Car({
    model: "Ford Escort",
    color: "blue"
});

// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();

// Outputs:
// drive forward
// drive backward

// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
augment( Car, Mixin );

var mySportsCar = new Car({
    model: "Porsche",
    color: "red"
});

mySportsCar.driveSideways();

// Outputs:
// drive sideways
````

## Vantagens e desvantagens


Mixins ajudar a diminuir a repetição funcional e aumentar a reutilização da função em um sistema. Onde uma aplicação é susceptível de exigir comportamento compartilhado entre instâncias de objeto, podemos facilmente evitar qualquer duplicação, mantendo esta funcionalidade compartilhada em um Mixin e, portanto, incidindo sobre a implementação apenas a funcionalidade do nosso sistema que é verdadeiramente distinto.

Dito isto, as desvantagens para Mixins são um pouco mais discutíveis. Alguns desenvolvedores acham que a injeção de funcionalidades em um protótipo de objeto é uma má idéia, pois leva a poluição de protótipo e um nível de incerteza quanto à origem de nossas funções. Em sistemas grandes isso pode muito bem ser o caso.

Gostaria de argumentar que a documentação forte pode ajudar a minimizar a quantidade de confusão sobre a fonte de funções misturadas, mas como com todos os padrões, se o cuidado é tomado durante a implementação, tudo estará bem.
