/**
* Esta función retorna un pendulo
*
* @param mass {number} - La masa del pendulo
*
* @param anchor {object} - El anclaje del pendulo
*
* @param lenght {number} - La longitud del pendulo
*
* @param angle {number} - El angulo del pendulo respecto a la vertical
* (en grados)
*
* @param angularVelocity {number} - la velocidad angular del pendulo
*
* @return un pendulo nuevo
*/
var Pendulum = function (mass, anchor, length, angle, angularVelocity) {
  this.mass = mass;
  this.anchor = anchor;
  this.length = length;
  this.angle = angle*Math.PI/180;
  this.angularVelocity = angularVelocity;


  /**
  * Esta función imprime en pantalla los pendulos, a partir del centro del
  * element
  */
  this.draw = function (element) {
    xInitial = this.anchor[0];
    yInitial = this.anchor[1];
    xFinal = this.length*Math.sin(this.angle);
    yFinal = this.length*Math.cos(this.angle);

    element.context.beginPath();
    element.context.moveTo(xInitial + element.width/2, yInitial +
      element.height/2);
    element.context.lineTo(xInitial + xFinal + element.width/2, yInitial +
      yFinal + element.height/2);
    element.context.lineWidth = 5;
    element.context.stroke();

    element.context.beginPath();
    element.context.arc(xInitial + xFinal + element.width/2, yInitial + yFinal +
       element.height/2, 20, 0, 2 * Math.PI);
    element.context.fillStyle = "#3400aa";
    element.context.fill();
    element.context.lineWidth = 5;
    element.context.stroke();
  };

  return this;
};


/**
* Ecuaciones diferenciales para los pendulos acoplados, para la implementación
* de Runge-Kutta de cuarto orden.
*
* @param pendulumA {pendulum} - Primer péndulo del sistema
*
* @param pendulumB {pendulum} - Segundo péndulo del sistema
*
* @param t {number} - Tiempo
*
* @param kTheta1 {number} - Parametro de Runge-Kutta para el angulo del primer
* pendulo
*
* @param kTheta2 {number} - Parametro de Runge-Kutta para el angulo del segundo
* pendulo
*
* @param kOmega1 {number} - Parametro de Runge-Kutta para la velocidad angular
* del primer pendulo
*
* @param kOmega2 {number} - Parametro de Runge-Kutta para la velocidad angular
* del primer pendulo
*/
function dTheta1 (pendulumA, pendulumB, t, kTheta1, kTheta2, kOmega1, kOmega2) {
  return pendulumA.angularVelocity+kOmega1;
}

function dTheta2 (pendulumA, pendulumB, t, kTheta1, kTheta2, kOmega1, kOmega2) {
  return pendulumB.angularVelocity+kOmega2;
}

function dOmega1 (pendulumA, pendulumB, t, kTheta1, kTheta2, kOmega1, kOmega2) {
  var m1 = pendulumA.mass;
  var m2 = pendulumB.mass;
  var l1 = pendulumA.length;
  var l2 = pendulumB.length;
  var theta1 = pendulumA.angle+kTheta1;
  var theta2 = pendulumB.angle+kTheta2;
  var omega1 = pendulumA.angularVelocity+kOmega1;
  var omega2 = pendulumB.angularVelocity+kOmega2;

  var dOmega = -(g * (2 * m1 + m2) * Math.sin(theta1) + m2 * g *
  Math.sin(theta1 - 2 * theta2) + 2 * Math.sin(theta1 - theta2) * m2 *
  (omega2 * omega2 * l2 + omega1*omega1 * l1 * Math.cos(theta1 - theta2))) /
  (l1 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2)));

  return dOmega;
}

function dOmega2 (pendulumA, pendulumB, t, kTheta1, kTheta2, kOmega1, kOmega2) {
  var m1 = pendulumA.mass;
  var m2 = pendulumB.mass;
  var l1 = pendulumA.length;
  var l2 = pendulumB.length;
  var theta1 = pendulumA.angle;
  var theta2 = pendulumB.angle;
  var omega1 = pendulumA.angularVelocity;
  var omega2 = pendulumB.angularVelocity;

  var dOmega = (2 * Math.sin(theta1 - theta2) * (omega1 * omega1 * l1 * (m1 +
    m2) + g * (m1 + m2) * Math.cos(theta1) + omega2 * omega2 * l2 * m2 *
    Math.cos(theta1 - theta2))) / (l2 * (2 * m1 + m2 - m2 * Math.cos(2 *
      theta1 - 2 * theta2)));

  return dOmega;
}


/**
* Ecuaciones diferenciales para los pendulos acoplados, para la implementación
* de Runge-Kutta de cuarto orden.
*
* @param pendulumA {pendulum} - Primer péndulo del sistema
*
* @param pendulumB {pendulum} - Segundo péndulo del sistema
*
* @param t {number} - Tiempo
*
* @param h {number} - Avance en el tiempo
*/
function RK4Animatable (pendulumA, pendulumB, h, t) {
  var kThetaA1 = h*dTheta1(pendulumA, pendulumB, t, 0, 0, 0, 0);
  var kOmegaA1 = h*dOmega1(pendulumA, pendulumB, t, 0, 0, 0, 0);
  var kThetaB1 = h*dTheta2(pendulumA, pendulumB, t, 0, 0, 0, 0);
  var kOmegaB1 = h*dOmega2(pendulumA, pendulumB, t, 0, 0, 0, 0);


  var kThetaA2 = h*dTheta1(pendulumA, pendulumB, t +h * 0.5, kThetaA1 * 0.5,
    kThetaB1 * 0.5, kOmegaA1 * 0.5, kOmegaB1 * 0.5);
  var kOmegaA2 = h*dOmega1(pendulumA, pendulumB, t +h * 0.5, kThetaA1 * 0.5,
    kThetaB1 * 0.5, kOmegaA1 * 0.5, kOmegaB1 * 0.5);
  var kThetaB2 = h*dTheta2(pendulumA, pendulumB, t +h * 0.5, kThetaA1 * 0.5,
    kThetaB1 * 0.5, kOmegaA1 * 0.5, kOmegaB1 * 0.5);
  var kOmegaB2 = h*dOmega2(pendulumA, pendulumB, t +h * 0.5, kThetaA1 * 0.5,
    kThetaB1 * 0.5, kOmegaA1 * 0.5, kOmegaB1 * 0.5);


  var kThetaA3 = h*dTheta1(pendulumA, pendulumB, t +h * 0.5, kThetaA2 * 0.5,
    kThetaB2 * 0.5, kOmegaA2 * 0.5, kOmegaB2 * 0.5);
  var kOmegaA3 = h*dOmega1(pendulumA, pendulumB, t +h * 0.5, kThetaA2 * 0.5,
    kThetaB2 * 0.5, kOmegaA2 * 0.5, kOmegaB2 * 0.5);
  var kThetaB3 = h*dTheta2(pendulumA, pendulumB, t +h * 0.5, kThetaA2 * 0.5,
    kThetaB2 * 0.5, kOmegaA2 * 0.5, kOmegaB2 * 0.5);
  var kOmegaB3 = h*dOmega2(pendulumA, pendulumB, t + h * 0.5, kThetaA2 * 0.5,
    kThetaB2 * 0.5, kOmegaA2 * 0.5, kOmegaB2 * 0.5);


  var kThetaA4 = h*dTheta1(pendulumA, pendulumB, t + h, kThetaA3, kThetaB3,
    kOmegaA3, kOmegaB3);
  var kOmegaA4 = h*dOmega1(pendulumA, pendulumB, t + h, kThetaA3, kThetaB3,
    kOmegaA3, kOmegaB3);
  var kThetaB4 = h*dTheta2(pendulumA, pendulumB, t + h, kThetaA3, kThetaB3,
    kOmegaA3, kOmegaB3);
  var kOmegaB4 = h*dOmega2(pendulumA, pendulumB, t + h, kThetaA3, kThetaB3,
    kOmegaA3, kOmegaB3);


  pendulumA.angle += (kThetaA1 + kThetaA3 * 0.5 + kThetaA3 * 0.5 +
    kThetaA4)/6;
  pendulumA.angularVelocity += (kOmegaA1 + kOmegaA3 * 0.5 + kOmegaA3 * 0.5 +
    kOmegaA4)/6;
  pendulumB.anchor = [pendulumA.length * Math.sin(pendulumA.angle),
    pendulumA.length * Math.cos(pendulumA.angle)];
  pendulumB.angle += (kThetaB1 + kThetaB3 * 0.5 + kThetaB3 * 0.5 +
    kThetaB4) / 6;
  pendulumB.angularVelocity += (kOmegaB1 + kOmegaB3 * 0.5 + kOmegaB3 * 0.5 +
    kOmegaB4) / 6;
}
