/**
* Este codigo realiza una simulación de dos pendulos acoplados, uno debajo
* del otro, es posible variarles las masas, longitudes y condiciones iniciales.
*
* Lorena Bucurú Rodriguez; Andŕes Felipe Moreno Sarria
*/
var g = 9.81;  // Gravedad
var time = 0;  // Tiempo inicial


/**
* Este objeto corresponde al "canvas" o lienzo en el cual se realizará la
* animación
*/
var animatable = {
  element: document.getElementById("animatable"),
  width: 4000,
  height: 2000,

  init: function () {
    this.element.width = this.width;
    this.element.height = this.height;
    this.context = this.element.getContext("2d");
  },
};


animatable.init();  // Inizcializar el animatable

var pendulum1 = new Pendulum(4, [0,0], 450, -40, 0.2); // pendulo 1

var pendulum2 = new Pendulum(16, [pendulum1.length*Math.sin(pendulum1.angle),
  pendulum1.length*Math.cos(pendulum1.angle)], 50, 70, 1); // pendulo 2



/**
* Función para actualizar la pantalla
*/
function setAnimatableReset () {
  animatable.context.clearRect(0, 0, animatable.width, animatable.height);

  var h = 0.1;

  RK4Animatable(pendulum1, pendulum2, h, time);

  time += h;
  pendulum1.draw(animatable);
  pendulum2.draw(animatable);
}
