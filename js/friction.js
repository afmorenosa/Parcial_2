/**
* Este codigo realiza una simulación de dos pendulos acoplados, uno debajo
* del otro, es posible variarles las masas, longitudes y condiciones iniciales.
*
* Lorena Bucurú Rodriguez; Andŕes Felipe Moreno Sarria
*/
var g = 9.81;  // Gravedad en cm/s
var timeF = 0;  // Tiempo inicial
var b = 200;

/**
* Este objeto corresponde al "canvas" o lienzo en el cual se realizará la
* animación
*/
var friction = {
  element: document.getElementById("friction"),
  width: 1000,
  height: 500,

  init: function () {
    this.element.width = this.width;
    this.element.height = this.height;
    this.context = this.element.getContext("2d");
  },
};

var frictionPhaseSpace = {
  element: document.getElementById("phase"),
  width: 300,
  height: 300,

  init: function () {
    this.element.width = this.width;
    this.element.height = this.height;
    this.context = this.element.getContext("2d");
    this.context.translate(this.width/2, this.height/2);
  },

  phaseDraw: function (pendulumA, pendulumB) {
    this.context.beginPath();
    this.context.fillStyle = pendulumA.color;
    this.context.arc(pendulumA.angle*this.height/2,
      pendulumB.angle*this.height/2, 0.5, 0, 2*Math.PI);
    this.context.fill();
  }
};

var frictionGraphs = {
  graphTheta1: {
    element: document.getElementById("theta-1"),
    width: 1000,
    height: 200,

    init: function () {
      this.element.width = this.width;
      this.element.height = this.height;
      this.context = this.element.getContext("2d");
      this.context.translate(this.width, this.height/2);
    },

    draw: function (pendulum) {
      this.context.beginPath();
      this.context.fillStyle = pendulum.color;
      this.context.arc(0, pendulum.angle*this.height/2, 2, 0, 2*Math.PI);
      this.context.fill();
    },

    step: function () {
      var copy = this.context.getImageData(0,0,this.width, this.height);
      this.context.putImageData(copy, -1, 0);
      this.context.clearRect(-1,-this.height/2, 4, this.height);
    },

    grid: function (time) {
      var sep = 10 * Math.PI/180;
      for (var i = -Math.PI; i <= Math.PI; i += sep) {
        this.context.beginPath();
        if (Math.abs(i) <= 0.1) {
          this.context.fillStyle = "#393939";
        }else {
          this.context.fillStyle = "#BDBDBD";
        }
        this.context.arc(0, i*this.height/2, 1, 0, 2*Math.PI);
        this.context.fill();
      }

      if (time % 5 < 0.1) {
        this.context.beginPath();
        this.context.strokeStyle = "#BDBDBD";
        this.context.moveTo(-1,-this.height/2);
        this.context.lineTo(-1,this.height/1);
        this.context.stroke();
      }
    }
  },
  graphTheta2: {
    element: document.getElementById("theta-2"),
    width: 1000,
    height: 200,

    init: function () {
      this.element.width = this.width;
      this.element.height = this.height;
      this.context = this.element.getContext("2d");
      this.context.translate(this.width, this.height/2);
    },

    draw: function (pendulum) {
      this.context.beginPath();
      this.context.fillStyle = pendulum.color;
      this.context.arc(0, pendulum.angle*this.height/2, 2, 0, 2*Math.PI);
      this.context.fill();
    },

    step: function () {
      var copy = this.context.getImageData(0,0,this.width, this.height);
      this.context.putImageData(copy, -1, 0);
      this.context.clearRect(-1,-this.height/2, 4, this.height);
    },

    grid: function (time) {
      var sep = 10 * Math.PI/180;
      for (var i = -Math.PI; i <= Math.PI; i += sep) {
        this.context.beginPath();
        if (Math.abs(i) <= 0.1) {
          this.context.fillStyle = "#393939";
        }else {
          this.context.fillStyle = "#BDBDBD";
        }
        this.context.arc(0, i*this.height/2, 1, 0, 2*Math.PI);
        this.context.fill();
      }

      if (time % 5 < 0.01) {
        this.context.beginPath();
        this.context.strokeStyle = "#BDBDBD";
        this.context.moveTo(-1,-this.height/2);
        this.context.lineTo(-1,this.height/1);
        this.context.stroke();
      }
    }
  }
};

friction.init();  // Inizcializar el friction
frictionGraphs.graphTheta1.init();
frictionGraphs.graphTheta2.init();
frictionPhaseSpace.init();

// pendulo 1
var pendulum1FN = new Pendulum(1, [0,0], 200, -20, 0, "#3cb0f8");

// pendulo 2
var pendulum2FN = new Pendulum(1, [pendulum1FN.length*
  Math.sin(pendulum1FN.angle), pendulum1FN.length*Math.cos(pendulum1FN.angle)],
  200, 15, 0, "#3cb0f8");

// pendulo 1 con aproximación
var pendulum1FA = new Pendulum(1, [0,0], 200, -20, 0, "#f25353");

// pendulo 2 con aproximación
var pendulum2FA = new Pendulum(1, [pendulum1FA.length*
  Math.sin(pendulum1FA.angle), pendulum1FA.length*Math.cos(pendulum1FA.angle)],
  200, 15, 0, "#f25353");



/**
* Función para actualizar la pantalla
*/
function setFrictionReset () {
  friction.context.clearRect(0, 0, friction.width, friction.height);

  var h = 0.05;

  RK4(pendulum1FN, pendulum2FN, h, timeF, dThetaFN1, dOmegaFN1, dThetaFN2,
    dOmegaFN2);

  RK4(pendulum1FA, pendulum2FA, h, timeF, dThetaFA1, dOmegaFA1, dThetaFA2,
    dOmegaFA2);


  timeF += h;
  pendulum2FN.draw(friction);
  pendulum1FN.draw(friction);
  pendulum2FA.draw(friction);
  pendulum1FA.draw(friction);

  frictionGraphs.graphTheta1.grid(timeF);
  frictionGraphs.graphTheta1.draw(pendulum1FN);
  frictionGraphs.graphTheta1.draw(pendulum1FA);
  frictionGraphs.graphTheta1.step();
  frictionGraphs.graphTheta2.grid(timeF);
  frictionGraphs.graphTheta2.draw(pendulum2FN);
  frictionGraphs.graphTheta2.draw(pendulum2FA);
  frictionGraphs.graphTheta2.step();

  frictionPhaseSpace.phaseDraw(pendulum1FN, pendulum2FN);
  frictionPhaseSpace.phaseDraw(pendulum1FA, pendulum2FA);
}
