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
var nonFriction = {
  element: document.getElementById("non-friction"),
  width: 4000,
  height: 2000,

  init: function () {
    this.element.width = this.width;
    this.element.height = this.height;
    this.context = this.element.getContext("2d");
  },
};


nonFriction.init();  // Inizcializar el nonFriction

var pendulum1N = new Pendulum(4, [0,0], 450, -40, 0.2); // pendulo 1

var pendulum2N = new Pendulum(16, [pendulum1N.length*Math.sin(pendulum1N.angle),
  pendulum1N.length*Math.cos(pendulum1N.angle)], 50, 70, 1); // pendulo 2

/**
* Función para actualizar la pantalla
*/
function setNonFrictionReset () {
  nonFriction.context.clearRect(0, 0, nonFriction.width, nonFriction.height);

  var h = 0.1;

  RK4Animatable(pendulum1N, pendulum2N, h, time);

  time += h;
  pendulum1N.draw(nonFriction);
  pendulum2N.draw(nonFriction);
}
