# Estudo de Vue.js

Esta pasta contem textos de resumo do meu estudo com Vue.js

## Tópicos da pasta:

+ [Templates Expressions](#templates-expressions)

### Templates Expressions:

Os famosos *mustaches* ( '{{}}' ) são usados no Vue.js para prover uma ligação entre a propriedade de data e o HTML. Basicamente sua sintaxe é:

````html
<!-- Pode ser usado dentro de uma tag html -->
<tag> {{ propriedade de data }} </tag>

<!--
  Pode ser usado dentro de uma declaração de um atributo
  ou de uma diretiva do próprio Vue
-->
<tag attribute="{{ ... }}"></tag>
````

É interessante notar que caso eu queira inserir HTML em uma variável de data, como segue:

````js
new Vue({
  el: 'elementHTML',
  data: {
    prop: '<tag></tag>',
  },
});
````

Eu preciso colocar no meu HTML 3 colchetes ( {{{  }}} ).

### Filtros:

Para eu criar um filtro no Vue eu uso a seguinte sintaxe:

````js
Vue.filter('nomeFilto', function (value) {
  // Code your filter here
});
````

+ O nome do filtro pode ser o que eu quiser
+ A função precisa maninipular o valor, no caso, value

Um exemplo de filtro e sua utilização

JS:

````js
Vue.filter('upper', (value) => value.toUpperCase());
````

HTML

````html
<p> {{ nome | upper }} </p>
````

Para eu usar um filtro, eu utilizo o caractere pipe ('|'). É possível encadear filtros utilizando os caracteres pipes os separando.

### v-bind:

Bind vem de associar, ligar, vincular. É uma diretiva do Vue que tem como função ligar uma prop de data a um atributo html, por exemplo. O mais legal do bind é que ele proporciona escrever expressões JavaScript dentro de um atributo html, por exemplo. Ele tem também, uma sintaxe pequena, ou shorthand. Sintaxe:

````html
<p v-bind:attribute="{ valueOfAtribute:expression }"> {{ ... }} </p>
<p :attribute="{ valueOfAtribute:expression }"> {{ ... }} </p>

<p v-bind:id="{ active: true }"> {{ ... }} </p>

<!-- Tem como resultado: -->
<p id="active"> {{ nome | upper }} </p>
````

### v-model:

É uma outra diretiva que tem como função estabalecer o two-way data binding, ou seja, o que se faz no HTMl, seja um no input, seja ele do tipo texto, checkbox ou afins, reflete no JavaScript. É muito usado para possibilitar modificação de alguma variável em tempo real etc.

````html
<input type="text" v-model="nome" placeholder="Digite seu nome">
````

+ Em inputs do tipo texto, ele captura o valor via onkeyup, ou seja, tudo que é digitado ou deletado, se faz automaticamente no JS.

+ Em checkbox e radio, não é necessário colocar o mesmo name, mas significar que representam a mesma informação

+ Ele irá capturar o valor de value e passá-lo para a variável.
