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
* @param angularVelocity {number} - La velocidad angular del pendulo
*
* @param color {text} - Color
*
* @return un pendulo nuevo
*/
var Pendulum = function (mass, anchor, length, angle, angularVelocity, color) {
  this.mass = mass;
  this.anchor = anchor;
  this.length = length;
  this.angle = angle*Math.PI/180;
  this.angularVelocity = angularVelocity;
  this.color = color;


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
    element.context.moveTo(xInitial + element.width/2, yInitial + 10);
    element.context.lineTo(xInitial + xFinal + element.width/2, yInitial +
      yFinal + 10);
    element.context.lineWidth = 5;
    element.context.stroke();

    element.context.beginPath();
    element.context.arc(xInitial + xFinal + element.width/2, yInitial + yFinal + 10,
      20, 0, 2 * Math.PI);
    element.context.fillStyle = color;
    element.context.fill();
    element.context.lineWidth = 5;
    element.context.stroke();
  };

  return this;
};
