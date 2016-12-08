# Entendendo a keyword this

A keyword *this* é muito importante no JS, ela funciona como os famosos pronomes relativos da língua portuguesa. Porem, dentro do JS ela é um pouco confusa de se entender, porem, neste texto procurarei esmiuçar seu uso de maneira bem prática. ***Afinal, quais são referências de this?***

## 1 - O objeto window

Se você executar a seguinte linha de código no seu navegador:

````js
this

// Retornará:
// Window { ... }

this.nome = "Emanuel";
nome // Emanuel
````

Isso acontece por que, por padrão, o this se refere a Window, de forma que posso setar varáveis como se fossem propriedades do Window (péssima prática). No Nodejs, se você executar a linha acima, você irá ver o Objeto do Node, com as inúmeras propriedades, como title, process e afins.

## 2 - O objeto a qual ele referencia

Da mesma forma que Window, this dentro de uma função construtora tem outra referencia: o objeto em que está função é chamada, no caso, quando ela instancia um objeto.

````js
const nome = "teste";

function Pessoa(n) {
  // this aqui não acessa a variável global nome
  this.nome = n;
}

const emanuel = new Pessoa("Emanuel");
emanuel.nome // Emanuel
````

## 3 - Em funções callback

Em funções callback, this referencia o objeto pai de quem chama a função, sendo assim, por exemplo, num *addEventListener* da vida, this irá referenciar o elemento alvo deste addEventListener.

````js
const myObj = {
  init: function () {
    this.link = document.querySelector('a');
    this.link.onclick = function (e) {
      console.log(this);   
    };
  }
};

myObj.init(); // element a
````

## 4 - Em Arrow Functions

Em JS, *this* significa contexto. E também, em JS, toda vez que se há uma chamada de função, se cria um outro contexto, é um comportamento padrão da linguagem. No código anterior, quando se dá um log de this, dentro de uma function, que está dentro de um objeto, o que se espera é que this referencie este objeto, pois nos *this* anteriores, se referia a este objeto. Poreḿ, como se iniciou uma function, esta cria um outro contexto, que faz com que this, agora, referencie quem está o chamando, que no caso não é *myObj*, mas a propriedade *this.link* de myObj. Como se resolvia isto antes do ES6?

````js
const myObj = {
  init: function () {
    // Cria-se uma propriedade auxiliar, que pode ser self, ou that
    this.self = this;
    this.link = document.querySelector('a');
    this.link.onclick = function (e) {
      // Log de a
      console.log(this);   
      // Log de myObj
      console.log(self);
    };
  }
};

myObj.init(); // element a and Object
````

Porem, arrow function veio para sanar situações como esta. Sendo assim, no contexto de uma arrow function, *this* sempre será o que seu valor léxico diz, ou seja, o que seu contexto de chamada diz. No exemplo acima, o contexto de chamada é o objeto myObj.

````js
const myObj = {
  init: function () {
    this.link = document.querySelector('a');
    this.link.onclick = () => {
      console.log(this);
    };
  }
};

myObj.init(); // Object
````

## Manipulando o contexto de this: call, apply e bind

Há três métodos em JS que servem para passarmos um contexto para uma determinada função, ou seja, passar o seu this. Vejamos eles:

+ **Call** e **Apply**: são métodos para a chamada de uma função, ou seja, quando executados, eles chamam a função passando para  ela o valor de this, ou contexto. A diferença entre os dois, é o segundo argumento do método. Veja:
````js
// Geralmente usado quando eu tenho certeza de quais parâmetros estarão passando
// Para a função, tais parâmetros, serão passados separados por virgula
Function.call(context, argument1, argument2);

// Geralmente usado quando não se tem certeza da quantidade de parâmetros
// Tais parametros são passados como um array
Function.apply(context, [arguments]);
````

+ **Bind**: o bind se difere dos outros dois no sentido de que ele ***retorna uma outra função, com contexto - this - e argumentos fixos - que podem ser nenhum ou muitos***, enquanto que os outros dois chamam a função que os invoca, com os argumentos do segundo paramtro. Vamos ver um exemplo retirado do post de [Johel Carvalho, no seu blog Programador Objetivo](http://programadorobjetivo.co/call-apply-e-bind-em-javascript/)

````js
var handler = {
    id:"handlerId",
    click: function(event){
    	alert(this.id);
    }
};

var button = document.getElementById('buttonId');
var button2 = document.getElementById('buttonId2');
button.addEventListener('click', handler.click);
// Lembre-se que bind retorna uma função, é diferente de chamar uma função
// O legal aqui, é que a funçaõ retornada, agora tem handler como
// o contexto fixo
button2.addEventListener('click', handler.click.bind(handler));
````
