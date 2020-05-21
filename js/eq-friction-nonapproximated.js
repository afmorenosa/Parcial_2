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
function dThetaFN1 (pendulumA, pendulumB, t, kTheta1, kTheta2, kOmega1, kOmega2) {
  return pendulumA.angularVelocity+kOmega1;
}

function dThetaFN2 (pendulumA, pendulumB, t, kTheta1, kTheta2, kOmega1, kOmega2) {
  return pendulumB.angularVelocity+kOmega2;
}

function dOmegaFN1 (pendulumA, pendulumB, t, kTheta1, kTheta2, kOmega1, kOmega2) {
  var m1 = pendulumA.mass;
  var m2 = pendulumB.mass;
  var l1 = pendulumA.length;
  var l2 = pendulumB.length;
  var theta1 = pendulumA.angle+kTheta1;
  var theta2 = pendulumB.angle+kTheta2;
  var omega1 = pendulumA.angularVelocity+kOmega1;
  var omega2 = pendulumB.angularVelocity+kOmega2;

  var dOmega = -((l1 ** 2 * l2 * m2 * omega1 ** 2 * Math.cos(theta2 - theta1) +
    l1 * l2 ** 2 * m2 * omega2 ** 2) * Math.sin(theta2 - theta1) + (g * l1 *
    l2 * m2 * Math.sin(theta2) + b * l1 * omega2) * Math.cos(theta2 - theta1) +
    (-g * l1 * l2 * m2 - g * l1 * l2 * m1) * Math.sin(theta1) - b * l2 *
    omega1) / (l1 ** 2 * l2 * m2* Math.cos(theta2 - theta1) ** 2 - l1 ** 2 *
    l2 * m2 - l1 ** 2 * l2 * m1);

  return dOmega;
}

function dOmegaFN2 (pendulumA, pendulumB, t, kTheta1, kTheta2, kOmega1, kOmega2) {
  var m1 = pendulumA.mass;
  var m2 = pendulumB.mass;
  var l1 = pendulumA.length;
  var l2 = pendulumB.length;
  var theta1 = pendulumA.angle;
  var theta2 = pendulumB.angle;
  var omega1 = pendulumA.angularVelocity;
  var omega2 = pendulumB.angularVelocity;

  var dOmega = ((l1 * l2 ** 2 * m2 ** 2 * omega2 ** 2 * Math.cos(theta2 - theta1)
    + (l1 ** 2 * l2 * m2 ** 2 + l1 ** 2 * l2 * m1 * m2) * omega1 ** 2) *
    Math.sin(theta2 - theta1) + ((-g * l1 * l2 * m2 ** 2 - g * l1 * l2 * m1 *
    m2) * Math.sin(theta1) - b * l2 * m2 * omega1) * Math.cos(theta2 - theta1) +
    g * l1 * l2 * m2 ** 2 * Math.sin(theta2) + g * l1 * l2 * m1 * m2 *
    Math.sin(theta2) + (b * l1 * m2 + b * l1 * m1) * omega2) / (l1 * l2 ** 2 *
    m2 ** 2 * Math.cos(theta2 - theta1) ** 2 - l1 * l2 ** 2 * m2 ** 2 - l1 *
    l2 ** 2 * m1 * m2);

  return dOmega;
}
