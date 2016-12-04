/* Exercise two: Create the class Maquina */

// Create the class Maquina
function Maquina(n, m, a) {
    this.nome = n;
    this.modelo = m;
    this.altura = a;
}
Maquina.prototype.falar = function () {
  console.log("A máquina " + this.nome + " do modelo " + this.modelo + " está falando.");
}
Maquina.prototype.andar = function () {
  console.log("A máquina " + this.nome + " do modelo " + this.modelo + " está andando.");
}
Maquina.prototype.matar = function () {
  console.log("A máquina " + this.nome + " do modelo " + this.modelo + " está matando.");
}

// Instantiating class Maquina
const c3po = new Maquina("C3PO", "Robô da Revolução", 1.3);
console.log(c3po);
c3po.falar();
c3po.andar();
c3po.matar();
