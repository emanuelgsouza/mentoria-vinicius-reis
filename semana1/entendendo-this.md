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
var myObj = {
    init: function () {
        this.link = document.querySelector('a');
        this.link.onclick = function (e) {
            console.log(this);   
        };
    }
};

myObj.init(); // element a
````
