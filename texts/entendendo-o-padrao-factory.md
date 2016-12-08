# Entendo o padrão Factory

Basicamente, uma Factory, do inglês, Fábrica, é uma função que fabrica objetos. Ela difere da função construtora no fato de não precisar do operador new na instanciação do objeto e também de que não necessita, obrigatoriamente, de herança. Ela é uma abstração muito importante na construção de objetos.

Uma definição formal seria:

> Uma interface para criação de objetos, mas que delega as subclasses a decisão de qual objeto instanciar.

Um exemplo simples de Factory, seria as linhas abaixo:

````js

// Factory
function user(name, type) {
  if(type == "adm") {
    return new AdmUser(name);
  } else if (type == "normal") {
    return new NormalUser(name);
  } else {
    console.log("User type invalid!");
  }
}

const adm = user("pessoa1", "adm");
````

Perceba que a Factory é uma abstração na criação de objetos. Ficando as nuancias, com cada objeto especificamente.

## Quando usar este padrão?

+ Quando a criação do nosso objeto for complexa;
+ Quando precisamos variar as instancias do nosso objeto, ou seja, varias instancias e cada uma com suas nuancias;
+ Quando desejamos fazer uma herança horizontal, ou seja, que vários objetos diferentes compartilhem dos mesmos blocos de código.

## Quando não usá-lo?

+ Devido a sua complexidade, em alguns casos, não é recomendável por ser de difícil manutenção;
+ Implementação exige trabalho extra para testes e afins.
