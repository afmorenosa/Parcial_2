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
function RK4 (pendulumA, pendulumB, h, t, dThetaA, dOmegaA, dThetaB, dOmegaB) {
  var kThetaA1 = h*dThetaA(pendulumA, pendulumB, t, 0, 0, 0, 0);
  var kOmegaA1 = h*dOmegaA(pendulumA, pendulumB, t, 0, 0, 0, 0);
  var kThetaB1 = h*dThetaB(pendulumA, pendulumB, t, 0, 0, 0, 0);
  var kOmegaB1 = h*dOmegaB(pendulumA, pendulumB, t, 0, 0, 0, 0);


  var kThetaA2 = h*dThetaA(pendulumA, pendulumB, t +h * 0.5, kThetaA1 * 0.5,
    kThetaB1 * 0.5, kOmegaA1 * 0.5, kOmegaB1 * 0.5);
  var kOmegaA2 = h*dOmegaA(pendulumA, pendulumB, t +h * 0.5, kThetaA1 * 0.5,
    kThetaB1 * 0.5, kOmegaA1 * 0.5, kOmegaB1 * 0.5);
  var kThetaB2 = h*dThetaB(pendulumA, pendulumB, t +h * 0.5, kThetaA1 * 0.5,
    kThetaB1 * 0.5, kOmegaA1 * 0.5, kOmegaB1 * 0.5);
  var kOmegaB2 = h*dOmegaB(pendulumA, pendulumB, t +h * 0.5, kThetaA1 * 0.5,
    kThetaB1 * 0.5, kOmegaA1 * 0.5, kOmegaB1 * 0.5);


  var kThetaA3 = h*dThetaA(pendulumA, pendulumB, t +h * 0.5, kThetaA2 * 0.5,
    kThetaB2 * 0.5, kOmegaA2 * 0.5, kOmegaB2 * 0.5);
  var kOmegaA3 = h*dOmegaA(pendulumA, pendulumB, t +h * 0.5, kThetaA2 * 0.5,
    kThetaB2 * 0.5, kOmegaA2 * 0.5, kOmegaB2 * 0.5);
  var kThetaB3 = h*dThetaB(pendulumA, pendulumB, t +h * 0.5, kThetaA2 * 0.5,
    kThetaB2 * 0.5, kOmegaA2 * 0.5, kOmegaB2 * 0.5);
  var kOmegaB3 = h*dOmegaB(pendulumA, pendulumB, t + h * 0.5, kThetaA2 * 0.5,
    kThetaB2 * 0.5, kOmegaA2 * 0.5, kOmegaB2 * 0.5);


  var kThetaA4 = h*dThetaA(pendulumA, pendulumB, t + h, kThetaA3, kThetaB3,
    kOmegaA3, kOmegaB3);
  var kOmegaA4 = h*dOmegaA(pendulumA, pendulumB, t + h, kThetaA3, kThetaB3,
    kOmegaA3, kOmegaB3);
  var kThetaB4 = h*dThetaB(pendulumA, pendulumB, t + h, kThetaA3, kThetaB3,
    kOmegaA3, kOmegaB3);
  var kOmegaB4 = h*dOmegaB(pendulumA, pendulumB, t + h, kThetaA3, kThetaB3,
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
